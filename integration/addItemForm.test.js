describe('AddItemForm', () => {
    it('visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://localhost:6006/iframe.html?id=first-example--add-item&viewMode=story');
        const image = await page.screenshot();

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
});