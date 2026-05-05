import qrcode
from PIL import Image

def generate_golden_qr():
    url = "https://nexus-id-one.vercel.app/"
    
    # Create QR code instance
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=4,
    )
    qr.add_data(url)
    qr.make(fit=True)

    # Create image
    # Golden color: #FFD700 (255, 215, 0)
    # Dark background: #050505 (5, 5, 5)
    img = qr.make_image(fill_color=(255, 215, 0), back_color=(5, 5, 5)).convert('RGB')
    
    # Save image
    img.save("nexus_id_qr.png")
    print("QR Code generated: nexus_id_qr.png")

if __name__ == "__main__":
    generate_golden_qr()
