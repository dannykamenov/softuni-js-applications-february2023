const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

let browser, page; 

describe('E2E tests', async function () {
    this.timeout(6000);


    before(async () => { browser = await chromium.launch(); });
    after(async () => { await browser.close(); });
    beforeEach(async () => { page = await browser.newPage(); });
    afterEach(async () => { await page.close(); });


    it('loads static page', async () => {
        await page.goto('http://127.0.0.1:5500/01.%20Accordion/index.html');
        const content = await page.content();
        expect(content).to.contains('Scalable Vector Graphics');
    });
    it('toggles content', async () => {
        await page.goto('http://127.0.0.1:5500/01.%20Accordion/index.html')
        await page.click('text=More');
        const content = await page.textContent('#main');
        expect(content).to.contain('Scalable Vector Graphics');
        expect(content).to.contain('Open standard');
        expect(content).to.contain('Unix');
        expect(content).to.contain('ALGOL');
    });
    it('hides content', async () => {
        await page.goto('http://127.0.0.1:5500/01.%20Accordion/index.html')
        await page.click('text=More');
        await page.waitForSelector('.accordion p');
        let visible = await page.isVisible('.accordion p');
        expect(visible).to.be.true;
        await page.click('text=Less');
        visible = await page.isVisible('.accordion p');
        expect(visible).to.be.false;
    });

});