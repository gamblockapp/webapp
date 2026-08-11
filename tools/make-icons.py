"""
Regenerates every icon in `public/` from one description of the mark.

The mark is the app's, not a web variant: two bars, the second held back to 45%
opacity — a *value* relationship, not a height one, so both bars are the same
size. Geometry is the identity bundle's `SonarMark n=1`, a 160-unit box with
28x120 bars at x=40 and x=92, corner radius 14. Ground and bar colours are
sampled from `mobile/assets/icon.png` so the favicon in a browser tab and the
icon on the home screen are the same object.

Run: python3 tools/make-icons.py     (needs Pillow; no network, no other deps)
"""

from PIL import Image, ImageDraw

BOX = 160.0                 # the mark's own coordinate space
BARS = [(40, 1.0), (92, 0.45)]
BAR_W, BAR_Y, BAR_H, BAR_R = 28, 20, 120, 14
MARK_FRACTION = 0.68        # of the tile, which satisfies the clear-space rule
GROUND = (20, 21, 19)       # #141513
BAR = (127, 179, 162)       # #7FB3A2

# 4x, then downsample: the rounded ends are small and Pillow does not antialias
# a rounded rectangle on its own.
SS = 4


def render(size: int) -> Image.Image:
    big = size * SS
    img = Image.new("RGBA", (big, big), GROUND + (255,))
    scale = (big * MARK_FRACTION) / BOX
    offset = (big - BOX * scale) / 2

    # Each bar composites with its own alpha. Blending whole layers in sequence
    # instead is wrong in a way that looks plausible: the second blend fades the
    # *first* bar toward the ground as well, so the pair comes out near-matching
    # and the held-back bar stops reading as held back.
    for x, opacity in BARS:
        layer = Image.new("RGBA", (big, big), (0, 0, 0, 0))
        ImageDraw.Draw(layer).rounded_rectangle(
            [
                offset + x * scale,
                offset + BAR_Y * scale,
                offset + (x + BAR_W) * scale,
                offset + (BAR_Y + BAR_H) * scale,
            ],
            radius=BAR_R * scale,
            fill=BAR + (round(255 * opacity),),
        )
        img = Image.alpha_composite(img, layer)

    return img.convert("RGB").resize((size, size), Image.LANCZOS)


for name, size in [
    ("favicon.png", 48),
    ("favicon-96.png", 96),
    ("apple-touch-icon.png", 180),
    ("og-icon.png", 1024),
]:
    render(size).save(f"public/{name}")
    print(f"  public/{name}  {size}x{size}")
