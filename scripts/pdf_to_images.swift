import Foundation
import Quartz

func convertPDFToImages(pdfURL: URL, outputDir: URL) {
    guard let pdfDocument = PDFDocument(url: pdfURL) else {
        print("Failed to load PDF document.")
        exit(1)
    }

    let pageCount = pdfDocument.pageCount
    print("Found \(pageCount) pages. Converting...")
    
    let fileManager = FileManager.default
    if !fileManager.fileExists(atPath: outputDir.path) {
        try? fileManager.createDirectory(at: outputDir, withIntermediateDirectories: true, attributes: nil)
    }

    for i in 0..<pageCount {
        guard let page = pdfDocument.page(at: i) else { continue }
        let pageRect = page.bounds(for: .mediaBox)
        
        let scale: CGFloat = 2.0
        let targetSize = CGSize(width: pageRect.width * scale, height: pageRect.height * scale)
        let targetRect = NSRect(x: 0, y: 0, width: targetSize.width, height: targetSize.height)
        
        let imageRep = NSBitmapImageRep(
            bitmapDataPlanes: nil,
            pixelsWide: Int(targetSize.width),
            pixelsHigh: Int(targetSize.height),
            bitsPerSample: 8,
            samplesPerPixel: 4,
            hasAlpha: true,
            isPlanar: false,
            colorSpaceName: .calibratedRGB,
            bytesPerRow: 0,
            bitsPerPixel: 0
        )
        
        guard let validImageRep = imageRep else { continue }
        
        NSGraphicsContext.saveGraphicsState()
        let context = NSGraphicsContext(bitmapImageRep: validImageRep)
        NSGraphicsContext.current = context
        
        // Fill white background
        NSColor.white.set()
        targetRect.fill()
        
        // Draw centered and scaled
        context?.cgContext.translateBy(x: 0.0, y: 0.0)
        context?.cgContext.scaleBy(x: scale, y: scale)
        page.draw(with: .mediaBox, to: context!.cgContext)
        
        NSGraphicsContext.restoreGraphicsState()
        
        let properties: [NSBitmapImageRep.PropertyKey: Any] = [.compressionFactor: 0.85]
        guard let imageData = validImageRep.representation(using: .jpeg, properties: properties) else { continue }
        
        let fileName = String(format: "slide_%02d.jpg", i + 1)
        let outputURL = outputDir.appendingPathComponent(fileName)
        
        do {
            try imageData.write(to: outputURL)
            print("Saved \(fileName)")
        } catch {
            print("Failed to save \(fileName): \(error)")
        }
    }
}

let pdfPath = "/Users/saurabhmaurya/Documents/swalpa-private/docs/assets/pdfs/slides.pdf"
let outPath = "/Users/saurabhmaurya/Documents/swalpa-private/docs/assets/img/slides"

let pdfURL = URL(fileURLWithPath: pdfPath)
let outputDir = URL(fileURLWithPath: outPath)

convertPDFToImages(pdfURL: pdfURL, outputDir: outputDir)
