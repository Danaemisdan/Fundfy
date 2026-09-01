const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // Use deviceScaleFactor 2 for retina quality
    await page.setViewport({ width: 1920, height: 1080 * 5, deviceScaleFactor: 2 });
    
    await page.goto('http://localhost:5173/pdf-presentation-new', { waitUntil: 'networkidle0' });
    await page.evaluate(() => sessionStorage.setItem('hasSeenSplash', 'true'));
    await page.goto('http://localhost:5173/pdf-presentation-new', { waitUntil: 'networkidle0' });
    
    await new Promise(r => setTimeout(r, 2000));
    
    console.log("Taking full page screenshot...");
    await page.screenshot({ path: 'temp_presentation.jpg', fullPage: true, type: 'jpeg', quality: 95 });
    
    console.log("Generating rasterized PDF...");
    const pdfPage = await browser.newPage();
    
    const base64Img = fs.readFileSync('temp_presentation.jpg').toString('base64');
    
    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body, html { margin: 0; padding: 0; width: 1920px; }
                .page { width: 1920px; height: 1080px; overflow: hidden; position: relative; page-break-after: always; }
                .page img { position: absolute; left: 0; width: 1920px; }
                .p1 img { top: 0px; }
                .p2 img { top: -1080px; }
                .p3 img { top: -2160px; }
                .p4 img { top: -3240px; }
                .p5 img { top: -4320px; }
            </style>
        </head>
        <body>
            <div class="page p1"><img src="data:image/jpeg;base64,${base64Img}" /></div>
            <div class="page p2"><img src="data:image/jpeg;base64,${base64Img}" /></div>
            <div class="page p3"><img src="data:image/jpeg;base64,${base64Img}" /></div>
            <div class="page p4"><img src="data:image/jpeg;base64,${base64Img}" /></div>
            <div class="page p5"><img src="data:image/jpeg;base64,${base64Img}" /></div>
        </body>
        </html>
    `;
    
    await pdfPage.setContent(html);
    await pdfPage.pdf({
        path: 'GlobalTalentHunt2026_Presentation_new.pdf',
        width: '1920px',
        height: '1080px',
        printBackground: true
    });
    
    fs.unlinkSync('temp_presentation.jpg');
    await browser.close();
    console.log("PDF generated successfully");
})();
