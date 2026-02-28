import os
import sys
from pdf2image import convert_from_path

def convert_pdf_to_images(pdf_path, output_dir):
    print(f"Converting {pdf_path} to images in {output_dir}...")
    try:
        images = convert_from_path(pdf_path, dpi=200) # Slightly lower DPI for web
    except Exception as e:
        print(f"Error: {e}")
        print("Note: pdf2image requires 'poppler' to be installed (brew install poppler)")
        sys.exit(1)
        
    os.makedirs(output_dir, exist_ok=True)
    
    for i, image in enumerate(images):
        output_path = os.path.join(output_dir, f"slide_{i+1:02d}.jpg")
        # Save as optimized JPEG for faster loading
        image.save(output_path, "JPEG", quality=85)
        print(f"Saved {output_path}")

if __name__ == "__main__":
    pdf_path = "/Users/saurabhmaurya/Documents/swalpa-private/docs/assets/pdfs/slides.pdf"
    output_dir = "/Users/saurabhmaurya/Documents/swalpa-private/docs/assets/img/slides"
    convert_pdf_to_images(pdf_path, output_dir)
