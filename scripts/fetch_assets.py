"""Download free Unsplash food imagery used as illustrative mood photography."""
from pathlib import Path
import urllib.request

ROOT = Path(__file__).resolve().parents[1] / 'public' / 'assets'
IMAGES = {
    'hero': 'photo-1512621776951-a57141f2eefd',
    'pasta': 'photo-1473093295043-cdd812d0e601',
    'rice': 'photo-1512058564366-18510be2db19',
    'salad': 'photo-1547592180-85f173990554',
    'salmon': 'photo-1467003909585-2f8a72700288',
    'pancakes': 'photo-1528207776546-365bb710ee93',
    'mushroom-soup': 'photo-1771089278772-7ad0d9c03f2f',
    'miso': 'photo-1763470260582-894ae15f43bb',
    'eggs': 'photo-1759216280514-a4d6465d770a',
    'chicken': 'photo-1609183480237-ccbb2d7c5772',
    'shrimp': 'photo-1628919350249-eb45d8829629',
    'hummus': 'photo-1673960854897-749f9d9ebafc',
    'bruschetta': 'photo-1761315412730-a6f67208b78d',
}

def main():
    ROOT.mkdir(parents=True, exist_ok=True)
    for name, photo in IMAGES.items():
        path = ROOT / f'{name}.jpg'
        if path.exists():
            continue
        url = f'https://images.unsplash.com/{photo}?auto=format&fit=crop&w=1400&q=85'
        request = urllib.request.Request(url, headers={'User-Agent': 'ShiweiKitchen/1.0'})
        with urllib.request.urlopen(request, timeout=35) as response:
            if not response.headers.get('Content-Type', '').startswith('image/'):
                raise ValueError('Expected an image')
            path.write_bytes(response.read(5_000_000))
        print(f'Saved {name}.jpg ({path.stat().st_size} bytes)')

if __name__ == '__main__':
    main()
