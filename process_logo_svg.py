import base64
from PIL import Image
import io
import re

with open('public/Partners/logo.svg', 'r') as f:
    content = f.read()

match = re.search(r'base64,([^"]+)', content)
if match:
    b64_data = match.group(1)
    img_data = base64.b64decode(b64_data)
    img = Image.open(io.BytesIO(img_data)).convert('RGBA')
    
    datas = img.getdata()
    newData = []
    for r, g, b, a in datas:
        # Black background -> transparent
        if r < 40 and g < 40 and b < 40:
            newData.append((0, 0, 0, 0))
        # White text -> black
        elif r > 200 and g > 200 and b > 200:
            newData.append((0, 0, 0, a))
        else:
            newData.append((r, g, b, a))
            
    img.putdata(newData)
    img.save('public/Partners/logo.png', 'PNG')
    print("Success")
else:
    print("Base64 not found")
