from PIL import Image
img = Image.open('public/Partners/Zoza.jpg').convert('RGBA')
datas = img.getdata()
newData = []
for r, g, b, a in datas:
    if r > 180 and g > 180 and b > 180:
        newData.append((255, 255, 255, 0))
    else:
        newData.append((r, g, b, a))
img.putdata(newData)
img.save('public/Partners/Zoza.png', 'PNG')
print("Processed Zoza.")
