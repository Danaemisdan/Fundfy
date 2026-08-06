from PIL import Image

def process_image(path):
    img = Image.open(path).convert("RGBA")
    datas = img.getdata()
    
    newData = []
    for r, g, b, a in datas:
        lum = (r * 0.299 + g * 0.587 + b * 0.114)
        if lum < 20:
            newData.append((r, g, b, 0))
        elif lum < 80:
            alpha = int(((lum - 20) / 60.0) * 255)
            # un-premultiply color if needed, but for black background this is fine
            newData.append((int(r*255/alpha) if alpha > 0 else r, 
                            int(g*255/alpha) if alpha > 0 else g, 
                            int(b*255/alpha) if alpha > 0 else b, 
                            alpha))
        else:
            newData.append((r, g, b, a))
            
    img.putdata(newData)
    img.save(path, "PNG")
    print("Processed", path)

process_image("public/Partners/XOXO Game Studios.png")
process_image("public/Partners/Young Coders.png")
process_image("public/Partners/DiceArtFilms.png")
