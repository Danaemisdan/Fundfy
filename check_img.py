from PIL import Image
import numpy as np

img = Image.open('/Users/sanjeevn/Downloads/Fundfy/public/Partners/Zoza AI.jpeg').convert('RGB')
data = np.array(img)
# print top-left pixel color to check background
print("Top-left pixel (background):", data[0,0])

# print center pixel
print("Center pixel:", data[img.height//2, img.width//2])
