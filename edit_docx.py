from docx import Document

doc = Document('WhatsApp_Promos1.docx')

replaced = False

for p in doc.paragraphs:
    if "AI Innovation Contest" in p.text:
        print("Found matching paragraph:")
        print(p.text.encode('utf-8'))
        # Using exact substring replacement to be safe with unicode characters
        p.text = p.text.replace("AI Innovation Contest", "AI Innovation Program")
        p.text = p.text.replace("Compete for a massive 🏆 ₹𝟱𝟬 𝗟𝗔𝗞𝗛𝗦 prize pool", "Gain access to up to 🏆 ₹𝟱𝟬 𝗟𝗔𝗞𝗛𝗦 in grants & funding")
        replaced = True

doc.save('WhatsApp_Promos1_updated.docx')

if replaced:
    print("Successfully replaced text.")
else:
    print("Text not found.")
