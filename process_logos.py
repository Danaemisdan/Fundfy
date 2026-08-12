from PIL import Image
import numpy as np

def process_zoza():
    img = Image.open('/Users/sanjeevn/Downloads/Fundfy/Harsha Sai/Zoza AI.jpeg').convert('L')
    data = np.array(img)
    
    # data contains values 0-255 (0 is bg, 255 is text)
    # We want RGBA where RGB is all 0 (black text), and A is the 'data' (so 0 is transparent bg, 255 is opaque text)
    
    out_data = np.zeros((data.shape[0], data.shape[1], 4), dtype=np.uint8)
    out_data[..., 3] = data # Alpha channel = luminance of original
    
    # Save as PNG
    out = Image.fromarray(out_data, 'RGBA')
    
    # Crop to bounding box to remove excess padding
    bbox = out.getbbox()
    if bbox:
        out = out.crop(bbox)
        
    out.save('/Users/sanjeevn/Downloads/Fundfy/public/Partners/Zoza_AI_processed.png')
    print("Zoza AI processed and saved.")

if __name__ == '__main__':
    process_zoza()
