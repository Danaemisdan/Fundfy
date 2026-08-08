from PIL import Image, ImageDraw

def fix_zoza():
    img = Image.open('public/Partners/Zoza.jpg').convert('RGBA')
    bbox = (126, 86, 903, 863)
    zoza_cropped = img.crop(bbox)
    
    mask = Image.new('L', zoza_cropped.size, 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0) + zoza_cropped.size, fill=255)
    
    zoza_cropped.putalpha(mask)
    zoza_cropped.save('public/Partners/Zoza.png', 'PNG')

def fix_dice():
    img = Image.open('public/Partners/DiceArtFilms.png').convert('RGBA')
    datas = img.getdata()
    newData = []
    for r, g, b, a in datas:
        if r < 40 and g < 40 and b < 40:
            newData.append((0, 0, 0, 0))
        elif r > 200 and g > 200 and b > 200:
            newData.append((0, 0, 0, a))
        else:
            newData.append((r, g, b, a))
            
    img.putdata(newData)
    img.save('public/Partners/DiceArtFilms.png', 'PNG')

fix_zoza()
fix_dice()
print("Successfully fixed Zoza and DiceArtFilms")
