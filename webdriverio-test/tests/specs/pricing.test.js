const { urls } = require("../utils/helpers/commonHelper")
const {
    currenciesTestData,
    planPricingTestData,
    plans,
    pricePeriodsTestData,
    sliderPositioningTestData,
} = require("../utils/helpers/testDataHelper")
const Pricing = require("../utils/pageObjects/pricing")

const pricing = new Pricing()

describe('Lodgify pricing page', () => {
    beforeEach(() => {
        browser.url(urls.pricing)
    })

    planPricingTestData.forEach((testData) => {
        it(`should have correct plans pricing for ${testData.rentalDisplays} rentals displays and ${testData.period} period `, () => {
            pricing.selectCurrency(testData.currency)
            pricing.setPricePeriod(testData.period)
            pricing.setNumberOfRentals(testData.rentalDisplays)
            plans.forEach((plan) => {
                const price = pricing.getPricingForPlan(plan)
                expect(price).toBe(testData[`${plan}Price`])
            })
        })
    })

    currenciesTestData.forEach((testData) => {
        it(`should have correct plans currency for ${testData.currency}`, () => {
            pricing.selectCurrency(testData.currency)
            plans.forEach((plan) => {
                const currency = pricing.getPlanCurrency(plan, testData.isPre)
                expect(currency).toBe(testData.sign)
            })
        })
    })
    
    sliderPositioningTestData.forEach((testData) => {
        it(`should position slider correctly for ${testData.rentalDisplays} rentals displays`, () => {
            pricing.setNumberOfRentals(testData.rentalDisplays)
            const sliderLocation = pricing.getSliderLocation()
            const tickLabelSizeAndLocation = pricing.getTickLabelSizeAndLocationForRentals(testData.rentalDisplays)
            expect(sliderLocation.x).toBeGreaterThanOrEqual(tickLabelSizeAndLocation.x)
            expect(sliderLocation.x).toBeLessThanOrEqual(tickLabelSizeAndLocation.x + tickLabelSizeAndLocation.width)
        })
    })

    pricePeriodsTestData.forEach((testData) => {
        it(`should display ${testData.period} price period as active`, () => {
            pricing.setPricePeriod(testData.period)
            expect(pricing.getActivePricePeriodText()).toBe(testData.text)
        })
    })

    it('should not set more than 100 number of rentals', () => {
        pricing.setNumberOfRentals('200')
        expect(pricing.getNumberOfRentals()).toBe('100')
    })
})
