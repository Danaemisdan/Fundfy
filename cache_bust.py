from PIL import Image, ImageDraw
import os

files = {
    'AWS.png': 'AWS_v2.png',
    'XOXO.png': 'XOXO_v2.png',
    'Young.png': 'Young_v2.png',
    'DiceArtFilms.png': 'DiceArtFilms_v2.png'
}

for old, new in files.items():
    path = 'public/Partners/' + old
    if os.path.exists(path):
        img = Image.open(path).convert('RGBA')
        datas = img.getdata()
        newData = []
        for r, g, b, a in datas:
            if a == 0:
                newData.append((255, 255, 255, 0))
            else:
                newData.append((r, g, b, a))
        img.putdata(newData)
        img.save('public/Partners/' + new, 'PNG')

# Zoza
img = Image.open('public/Partners/Zoza.jpg').convert('RGBA')
bbox = (126, 86, 903, 863)
zoza_cropped = img.crop(bbox)
mask = Image.new('L', zoza_cropped.size, 0)
draw = ImageDraw.Draw(mask)
draw.ellipse((0, 0) + zoza_cropped.size, fill=255)
zoza_cropped.putalpha(mask)

datas = zoza_cropped.getdata()
newData = []
for r, g, b, a in datas:
    if a == 0:
        newData.append((255, 255, 255, 0))
    else:
        newData.append((r, g, b, a))
zoza_cropped.putdata(newData)
zoza_cropped.save('public/Partners/Zoza_v2.png', 'PNG')

print("All logos fixed for WebKit and cache busted.")
