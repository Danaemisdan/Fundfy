from PIL import Image

def process_logos():
    # 1. AWS
    img = Image.open('public/Partners/AWS.webp').convert('RGBA')
    datas = img.getdata()
    newData = []
    for r, g, b, a in datas:
        if r > 230 and g > 230 and b > 230:
            newData.append((255, 255, 255, 0))
        else:
            newData.append((r, g, b, a))
    img.putdata(newData)
    img.save('public/Partners/AWS.png', 'PNG')

    # 2. XOXO
    img = Image.open('public/Partners/XOXO Game Studios.png').convert('RGBA')
    datas = img.getdata()
    newData = []
    for r, g, b, a in datas:
        if r < 40 and g < 40 and b < 40:
            newData.append((0, 0, 0, 0))
        elif r > 200 and g > 200 and b > 200:
            newData.append((0, 0, 0, a))
        else:
            val = 255 - max(r,g,b)
            newData.append((val, val, val, a))
    img.putdata(newData)
    img.save('public/Partners/XOXO.png', 'PNG')

    # 3. Young Coders
    img = Image.open('public/Partners/Young Coders.png').convert('RGBA')
    datas = img.getdata()
    newData = []
    for r, g, b, a in datas:
        if r < 40 and g < 40 and b < 40:
            newData.append((0, 0, 0, 0))
        elif r > 200 and g > 200 and b > 200:
            newData.append((0, 0, 0, a))
        else:
            if r > g + 50 and r > b + 50:
                newData.append((r, g, b, a))
            else:
                val = 255 - max(r,g,b)
                newData.append((val, val, val, a))
    img.putdata(newData)
    img.save('public/Partners/Young.png', 'PNG')

    # 4. Zoza
    img = Image.open('public/Partners/Zoza.jpg').convert('RGBA')
    datas = img.getdata()
    newData = []
    for r, g, b, a in datas:
        diff = max(r, g, b) - min(r, g, b)
        if diff < 30 and 40 < max(r, g, b) < 240:
            newData.append((255, 255, 255, 0))
        else:
            newData.append((r, g, b, a))
    img.putdata(newData)
    img.save('public/Partners/Zoza.png', 'PNG')

process_logos()
print("All logos processed.")
