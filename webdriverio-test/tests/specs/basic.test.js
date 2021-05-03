const { urls } = require("../utils/helpers/commonHelper")

describe('Lodgify contact page', () => {
    it('should have the right title', () => {
        browser.url(urls.contact)
        expect(browser).toHaveTitle('Contact');
    })
})
