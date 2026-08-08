import xml.etree.ElementTree as ET
import base64
from io import BytesIO
from PIL import Image

def process_img(img):
    img = img.convert("RGBA")
    datas = img.getdata()
    newData = []
    for r, g, b, a in datas:
        diff = max(r, g, b) - min(r, g, b)
        if diff < 40 and max(r, g, b) > 100:
            # It's a whitish/grayish pixel. Invert its lightness to turn white text black!
            new_val = 255 - max(r, g, b)
            newData.append((new_val, new_val, new_val, a))
        else:
            newData.append((r, g, b, a))
    img.putdata(newData)
    return img

tree = ET.parse('public/Partners/DiceArtFilms.svg')
ET.register_namespace('', "http://www.w3.org/2000/svg")
ET.register_namespace('xlink', "http://www.w3.org/1999/xlink")
root = tree.getroot()

for img_elem in root.findall('.//{http://www.w3.org/2000/svg}image'):
    href = img_elem.attrib.get('{http://www.w3.org/1999/xlink}href')
    if href and href.startswith('data:image/png;base64,'):
        b64 = href.split(',')[1]
        img_data = base64.b64decode(b64)
        img = Image.open(BytesIO(img_data))
        new_img = process_img(img)
        buffered = BytesIO()
        new_img.save(buffered, format="PNG")
        new_b64 = base64.b64encode(buffered.getvalue()).decode('utf-8')
        img_elem.attrib['{http://www.w3.org/1999/xlink}href'] = 'data:image/png;base64,' + new_b64

tree.write('public/Partners/DiceArtFilms.svg')
print("Processed SVG.")
