const { chromium } = require('playwright-chromium');
const { expect } = require('chai');


const mockData = {
    "d953e5fb-a585-4d6b-92d3-ee90697398a0": {
        "author": "J.K.Rowling",
        "title": "Harry Potter and the Philosopher's Stone"
    },
    "d953e5fb-a585-4d6b-92d3-ee90697398a1": {
        "author": "Svetlin Nakov",
        "title": "C# Fundamentals"
    }
}



describe('E2E tests', async function () {
    this.timeout(6000);

    let browser;
    let context;
    let page;

    before(async () => {
        browser = await chromium.launch();
    });

    after(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        context = await browser.newContext();
        page = await context.newPage();
    });

    afterEach(async () => {
        await page.close();
    });

    it('loads all books', async () => {
        await page.route('**/jsonstore/collections/books', route => route.fulfill({
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mockData)
        }));
        await page.goto('http://127.0.0.1:5500/02.Book-Library/index.html');

        await page.click('text=LOAD ALL BOOKS');
        await page.waitForSelector('text=Harry Potter');
        const rowsData = await page.$$eval('tbody tr', rows => rows.map(r => r.textContent));
        
        expect(rowsData.length).to.equal(2);
        expect(rowsData[0]).to.contains('Harry Potter');
        expect(rowsData[0]).to.contains('J.K.Rowling');
        expect(rowsData[1]).to.contains('C# Fundamentals');
        expect(rowsData[1]).to.contains('Svetlin Nakov');

    });

    it('create a book', async () => {
        await page.goto('http://127.0.0.1:5500/02.Book-Library/index.html');

        await page.fill('input[name="title"]', 'Title');
        await page.fill('input[name="author"]', 'Author');
        const [request] = await Promise.all([
            page.waitForRequest(request => request.method() === 'POST'),
            page.click('text=Submit')
        ])

        const data = JSON.parse(request.postData());
        expect(data).to.eql({ title: 'Title', author: 'Author' });
        expect(data.title).to.equal('Title');
        expect(data.author).to.equal('Author');
    });

});