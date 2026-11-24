"""Generate simple store-quality screenshots for the PWA manifest."""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "screenshots"
OUT.mkdir(parents=True, exist_ok=True)

FONT_CANDIDATES = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    "/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf",
]


def load_font(size: int, bold: bool = True):
    candidates = FONT_CANDIDATES if bold else list(reversed(FONT_CANDIDATES))
    for path in candidates:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


BG = "#04140f"
PANEL = "#0b2c21"
EMERALD = "#34d399"
TEXT = "#eafff5"
MUTED = "#a7c9ba"
GOLD = "#fbbf24"


def base(width: int, height: int):
    img = Image.new("RGB", (width, height), BG)
    draw = ImageDraw.Draw(img)
    draw.rectangle((0, 0, width, 10), fill=EMERALD)
    return img, draw


def mobile():
    w, h = 390, 844
    img, draw = base(w, h)
    draw.rounded_rectangle((20, 28, 370, 92), radius=18, fill=PANEL, outline=EMERALD, width=2)
    draw.text((40, 48), "iMasjid", font=load_font(30), fill=TEXT)
    draw.text((268, 56), "komuniti", font=load_font(14), fill=EMERALD)

    draw.text((24, 130), "Masjid berdekatan.", font=load_font(30), fill=TEXT)
    draw.text((24, 172), "Ilmu berterusan.", font=load_font(30), fill=EMERALD)
    draw.text((24, 214), "Komuniti bersatu.", font=load_font(30), fill=TEXT)
    draw.text(
        (24, 270),
        "Cari masjid, ikut kuliah dan\nringkasnya hubungi kariah.",
        font=load_font(16, bold=False),
        fill=MUTED,
        spacing=8,
    )

    draw.rounded_rectangle((24, 350, 366, 424), radius=20, fill=EMERALD)
    draw.text((70, 374), "Pasang Aplikasi iMasjid", font=load_font(20), fill=BG)
    draw.rounded_rectangle((24, 442, 366, 506), radius=20, outline=EMERALD, width=3)
    draw.text((70, 462), "Buka Terus (Web View)", font=load_font(19), fill=TEXT)

    cards = [
        ("Cari Masjid", "500 m – 10 km"),
        ("Kuliah & Program", "Minggu ini"),
        ("Penceramah", "Tauliah disahkan"),
        ("Hub Kariah", "Niaga & sosial"),
    ]
    y = 560
    for i, (title, sub) in enumerate(cards):
        x = 24 if i % 2 == 0 else 200
        if i == 2:
            y += 150
        draw.rounded_rectangle((x, y, x + 166, y + 132), radius=16, fill=PANEL, outline=EMERALD, width=2)
        draw.text((x + 16, y + 24), title, font=load_font(16), fill=TEXT)
        draw.text((x + 16, y + 62), sub, font=load_font(13, bold=False), fill=MUTED)

    draw.text((24, h - 40), "Tanpa App Store  •  Offline sedia", font=load_font(14), fill=GOLD)
    img.save(OUT / "home-mobile.png")


def desktop():
    w, h = 1280, 720
    img, draw = base(w, h)
    draw.rounded_rectangle((40, 32, 1240, 104), radius=20, fill=PANEL, outline=EMERALD, width=2)
    draw.text((72, 54), "iMasjid", font=load_font(36), fill=TEXT)
    draw.text((1100, 64), "komuniti", font=load_font(18), fill=EMERALD)

    draw.text((72, 160), "Masjid berdekatan. Ilmu berterusan.", font=load_font(44), fill=TEXT)
    draw.text((72, 222), "Komuniti bersatu — terus dari skrin utama.", font=load_font(34), fill=EMERALD)
    draw.text(
        (72, 300),
        "Cari masjid dan surau, semak kuliah, penceramah bertauliah\n"
        "serta perkembangan kariah. Tiada pendaftaran untuk melayari.",
        font=load_font(21, bold=False),
        fill=MUTED,
        spacing=10,
    )

    draw.rounded_rectangle((72, 410, 470, 492), radius=22, fill=EMERALD)
    draw.text((128, 436), "Pasang Aplikasi iMasjid", font=load_font(23), fill=BG)
    draw.rounded_rectangle((500, 410, 850, 492), radius=22, outline=EMERALD, width=3)
    draw.text((548, 436), "Buka Terus (Web View)", font=load_font(22), fill=TEXT)

    features = [
        ("PENCARIAN", "Masjid & surau\n500 m – 10 km"),
        ("KULIAH", "Program &\n pengumuman"),
        ("PENCERAMAH", "Tauliah JAWI,\nJAIS, JAKIM"),
        ("KARIAH", "Niaga, sosial\n& sukarelawan"),
    ]
    x0 = 72
    for i, (label, body) in enumerate(features):
        x = x0 + i * 288
        draw.rounded_rectangle((x, 552, x + 264, 680), radius=18, fill=PANEL, outline=EMERALD, width=2)
        draw.text((x + 20, 572), label, font=load_font(16), fill=EMERALD)
        draw.text((x + 20, 608), body, font=load_font(17, bold=False), fill=TEXT, spacing=6)

    img.save(OUT / "home-desktop.png")


if __name__ == "__main__":
    mobile()
    desktop()
    print(f"Screenshots written to {OUT}")
