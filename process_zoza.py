from PIL import Image
import numpy as np
import sys

try:
    img = Image.open('/Users/sanjeevn/Downloads/Fundfy/Harsha Sai/Zoza AI.jpeg').convert('RGBA')
    data = np.array(img)

    r, g, b, a = data.T
    # If the background is dark, we need a different threshold. Assuming background is white.
    white_areas = (r > 150) & (g > 150) & (b > 150)
    
    # Make non-white parts black
    data[..., :3][~white_areas.T] = 0 
    
    # Make white parts transparent
    data[..., 3][white_areas.T] = 0
    
    Image.fromarray(data).save('/Users/sanjeevn/Downloads/Fundfy/public/Partners/Zoza_AI_black.png')
    print("Processed Zoza AI logo successfully.")
except Exception as e:
    print("Error:", e)
    sys.exit(1)
