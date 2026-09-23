"""
Generate responsive, compressed variants of the Mareluna photographs.

Originals live in `public/assets/photos/` and are never modified.
Derivatives are written to `public/assets/photos/opt/` as

    <id>-<width>.webp   and   <id>-1024.jpg   (fallback)

Run after adding or replacing a photo:

    python scripts/optimize-images.py

Requires Pillow:  pip install Pillow
"""

from pathlib import Path
from PIL import Image, ImageOps

WIDTHS = (640, 1024, 1400)
FALLBACK_WIDTH = 1024
SRC = Path(__file__).resolve().parent.parent / "public" / "assets" / "photos"
OUT = SRC / "opt"


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    total_in = total_out = 0

    for path in sorted(SRC.glob("*.jpg")):
        stem = path.stem
        total_in += path.stat().st_size
        with Image.open(path) as im:
            im = ImageOps.exif_transpose(im).convert("RGB")
            for width in WIDTHS:
                if width > im.width:
                    continue
                height = round(im.height * width / im.width)
                resized = im.resize((width, height), Image.LANCZOS)
                webp = OUT / f"{stem}-{width}.webp"
                resized.save(webp, "WEBP", quality=78, method=6)
                total_out += webp.stat().st_size
                if width == FALLBACK_WIDTH:
                    jpg = OUT / f"{stem}-{width}.jpg"
                    resized.save(jpg, "JPEG", quality=80, optimize=True, progressive=True)
                    total_out += jpg.stat().st_size
        print(f"{stem:20} {path.stat().st_size // 1024:>5} KB  ->  variants")

    print(f"\noriginals {total_in / 1_048_576:.1f} MB  ->  variants {total_out / 1_048_576:.1f} MB")


if __name__ == "__main__":
    main()
