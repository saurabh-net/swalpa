import os
import glob
import textwrap
from PIL import Image, ImageDraw, ImageFont

def create_og_image(title, subtitle, output_path, lesson_num):
    # Dimensions for Open Graph image
    W, H = 1200, 630
    
    # Background color (Dark Slate)
    bg_color = (15, 23, 42)
    img = Image.new('RGB', (W, H), color=bg_color)
    draw = ImageDraw.Draw(img)
    
    # Fonts - using macOS system font to ensure clean rendering
    font_path_bold = '/System/Library/Fonts/Helvetica.ttc'
    if not os.path.exists(font_path_bold):
        font_path_bold = '/Library/Fonts/Arial Bold.ttf'
    
    try:
        title_font = ImageFont.truetype(font_path_bold, 72)
        brand_font = ImageFont.truetype(font_path_bold, 36)
        subtitle_font = ImageFont.truetype(font_path_bold, 42)
    except IOError:
        print(f"Font not found at {font_path_bold}. Using default font.")
        title_font = ImageFont.load_default()
        brand_font = ImageFont.load_default()
        subtitle_font = ImageFont.load_default()
        
    # Draw top accent bar (Vibrant Auto Rickshaw Yellow/Green)
    draw.rectangle([(0, 0), (W, 15)], fill=(234, 179, 8)) # Yellow
    draw.rectangle([(0, 15), (W, 30)], fill=(34, 197, 94)) # Green
    
    # Brand Text (Top Left)
    draw.text((80, 80), "SWALPA.ORG", font=brand_font, fill=(148, 163, 184))
    
    # Wrapping title text
    margin = 80
    offset = 200
    for line in textwrap.wrap(title, width=28):
        # Get exact bounding box for rendering
        bbox = draw.textbbox((0, 0), line, font=title_font)
        draw.text((margin, offset), line, font=title_font, fill=(248, 250, 252))
        offset += (bbox[3] - bbox[1]) + 20
        
    # Draw subtitle (Bottom Left)
    draw.text((80, 520), subtitle, font=subtitle_font, fill=(56, 189, 248))
    
    # Draw lesson number (Bottom Right)
    if lesson_num:
        bbox = draw.textbbox((0, 0), lesson_num, font=title_font)
        draw.text((W - margin - (bbox[2] - bbox[0]), 490), lesson_num, font=title_font, fill=(51, 65, 85))
        
    img.save(output_path, quality=90)
    print(f"Saved: {output_path}")

def main():
    docs_dir = os.path.join(os.path.dirname(__file__), '..', 'docs')
    output_dir = os.path.join(docs_dir, 'assets', 'img', 'social')
    os.makedirs(output_dir, exist_ok=True)
    
    md_files = glob.glob(os.path.join(docs_dir, '[0-9][0-9]_*.md'))
    
    for filepath in md_files:
        filename = os.path.basename(filepath)
        lesson_id = filename[:2]
        
        # Parse title from the first H1 in the markdown
        title = filename.replace('.md', '').replace('_', ' ').title()
        with open(filepath, 'r', encoding='utf-8') as f:
            for line in f:
                if line.startswith('# '):
                    # Clean up emojis and hashes from title
                    title = line.replace('# ', '').strip()
                    break
                    
        subtitle = "Kannada for Bengaluru Survial & Everyday Logistics"
        if lesson_id == "12":
            subtitle = "Sleek presentation slides for quick review"
        elif lesson_id == "00":
            subtitle = "Welcome to the SWALPA Ecosystem"
        
        output_name = f"og_lesson_{lesson_id}.jpg"
        
        create_og_image(
            title=title,
            subtitle=subtitle,
            output_path=os.path.join(output_dir, output_name),
            lesson_num=f"#{lesson_id}"
        )

if __name__ == '__main__':
    main()
