"""Generate pre-rendered read-aloud audio for a study guide, in both voices.

Produces one MP3 per reading unit, in <out>/male/NNN.mp3 and
<out>/female/NNN.mp3, matching how theme.js's read-aloud engine builds its
audio URLs (<data-audio-dir>/<gender>/<NNN>.mp3, NNN = 1-based queue index,
zero-padded to 3 digits). Requires: pip install edge-tts

--- How to run it for a guide ---

1. Extract the guide's exact spoken-text queue, in order. The read-aloud
   engine leaves a debug hook for this: load the *live* guide page (the
   normalization in speakableText() must match, so don't retype the text by
   hand) in headless Chrome and run:

     window.__ttsDebug.queue.map(el => window.__ttsDebug.speakableText(el.textContent.trim()))

   Save that JSON array to a file, e.g. texts.json.

2. Run this script:

     python3 tools/generate_guide_audio.py \
       --texts texts.json \
       --out "Anatomy Exam 3/anatomy-exam-3-study-guide-audio"

   Safe to re-run / interrupt and resume: existing files are skipped, so a
   partial run just picks up where it left off.

--- Swapping voices ---

Change MALE_VOICE / FEMALE_VOICE below. List everything available with:
  edge-tts --list-voices
As of writing, the two "Multilingual" voices (Andrew, Ava) are Microsoft's
newest, most natural-sounding neural models -- prefer those over the older
same-name voices unless a specific guide calls for something else.

--- Why edge-tts ---

Free, no API key (calls the same Microsoft neural-TTS service Edge's "Read
aloud" feature uses), and far more natural than macOS's `say` voices even
at Premium quality -- Safari also doesn't reliably expose Premium/Enhanced
system voices to the Web Speech API, which is what pre-rendering sidesteps
in the first place. Needs network access to *generate* audio; the output
MP3s are static files afterward and need nothing at runtime.
"""

import argparse
import asyncio
import json
import os
import sys

import edge_tts

MALE_VOICE = "en-US-AndrewMultilingualNeural"
FEMALE_VOICE = "en-US-AvaMultilingualNeural"

# How many files to synthesize concurrently. edge-tts tolerates moderate
# concurrency fine; keep this modest to avoid tripping any rate limiting.
CONCURRENCY = 6


async def generate_one(sem, voice, text, path):
    if os.path.exists(path) or not text.strip():
        return
    async with sem:
        for attempt in range(3):
            try:
                communicate = edge_tts.Communicate(text, voice)
                # A dropped/flaky connection can otherwise hang this call
                # forever instead of raising -- a bounded timeout turns that
                # into a normal retry instead of a stuck background process.
                await asyncio.wait_for(communicate.save(path), timeout=25)
                return
            except Exception as e:
                if attempt == 2:
                    print(f"FAILED {path}: {e}", file=sys.stderr)
                else:
                    await asyncio.sleep(2)


async def generate_all(texts, out_dir):
    sem = asyncio.Semaphore(CONCURRENCY)
    total = len(texts) * 2
    done = 0

    for gender, voice in (("male", MALE_VOICE), ("female", FEMALE_VOICE)):
        gender_dir = os.path.join(out_dir, gender)
        os.makedirs(gender_dir, exist_ok=True)
        tasks = []
        for i, text in enumerate(texts):
            num = str(i + 1).zfill(3)
            path = os.path.join(gender_dir, f"{num}.mp3")
            tasks.append(generate_one(sem, voice, text, path))

        # Run in chunks so progress logging stays meaningful instead of one
        # silent asyncio.gather over everything.
        chunk_size = 25
        for start in range(0, len(tasks), chunk_size):
            await asyncio.gather(*tasks[start:start + chunk_size])
            done += min(chunk_size, len(tasks) - start)
            print(f"{gender}: {min(start + chunk_size, len(tasks))}/{len(tasks)} done", flush=True)

    print("ALL DONE")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--texts", required=True, help="Path to a JSON array of strings, in queue order")
    parser.add_argument("--out", required=True, help="Output directory (gets male/ and female/ subfolders)")
    args = parser.parse_args()

    with open(args.texts, encoding="utf-8") as f:
        texts = json.load(f)

    os.makedirs(args.out, exist_ok=True)
    asyncio.run(generate_all(texts, args.out))


if __name__ == "__main__":
    main()
