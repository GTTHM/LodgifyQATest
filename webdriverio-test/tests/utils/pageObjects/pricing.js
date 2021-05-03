const locators = {
    numberOfRentals: {
        input: '#scroll-prop-plan',
        slider: '.min-slider-handle',
        tickLabels: '.slider-tick-label',
    },
    plans: {
        starter: {
            container: '.price-card-starter',
        },
        professional: {
            container: '[data-role=pro]',
        },
        ultimate: {
            container: '[data-role=ultimate]',
        },
        price: '.total-sum',
        currency: {
            pre: '.plan-price .currency-symbol-pre',
            post: '.plan-price .currency-symbol-post'
        },
    },
    pricePeriods: {
        monthly: '[data-price-period="1"]',
        yearly: '[data-price-period="2"]',
        twoYears: '[data-price-period="3"]',
        active: '.price-period-buttons-2 .active',
    },
    currencySelect: '.price-currency-select',
}

class Pricing {
    locators = locators;

    setNumberOfRentals(rentals) {
        const input = $(this.locators.numberOfRentals.input)
        // required due to incorrect work of wdio input.setValue
        browser.waitUntil(() => {
            input.scrollIntoView(false)
            return input.isClickable();
        },
        {
            timeoutMsg: 'Rental number input is not clickable',
        })
        input.click();
        browser.keys(['Shift', 'ArrowLeft']);
        browser.keys(rentals);
    }

    getNumberOfRentals() {
        return $(this.locators.numberOfRentals.input).getValue()
    }

    getSliderLocation() {
        return $(this.locators.numberOfRentals.slider).getLocation()
    }

    getTickLabelSizeAndLocationForRentals(rentalsNumber) {
        const tickLabel = $$(this.locators.numberOfRentals.tickLabels).filter((tickLabel) => {
            return tickLabel.getText() === rentalsNumber
        })[0]

        if (!tickLabel) {
            throw new Error(`Tick label for ${rentalsNumber} rentals is missing`)
        }

        return {
            ...tickLabel.getLocation(),
            ...tickLabel.getSize(),
        }
    }

    getPlanCurrency(plan) {
        const plansLocator = this.locators.plans
        const preCurrency = $(plansLocator[plan].container).$(plansLocator.currency.pre).getText()
        const postCurrency = $(plansLocator[plan].container).$(plansLocator.currency.post).getText()
        return preCurrency 
            ? { pre: true, value: preCurrency}
            : { pre: false, value: postCurrency}
    }

    getPricingForPlan(plan) {
        const price = $(this.locators.plans[plan].container).$(this.locators.plans.price).getText()
        const currency = this.getPlanCurrency(plan);
        return currency.pre 
            ? `${currency.value}${price}`
            : `${price}${currency.value}`
    }

    selectCurrency(currency) {
        $(this.locators.currencySelect).selectByAttribute('value', currency)
    }

    getActivePricePeriodText() {
        return $(this.locators.pricePeriods.active).getText().replace(/\s{2,}/g, ' ')
    }

    setPricePeriod(period) {
        const pricePeriod = $(this.locators.pricePeriods[period])
        pricePeriod.scrollIntoView(false)
        pricePeriod.click()
    }
}

module.exports = Pricing
