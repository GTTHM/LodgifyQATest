class Pricing {
    locators = {
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
            price: '.plan-price',
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

    setNumberOfRentals(rentals) {
        const input = $(this.locators.numberOfRentals.input)
        // required due to incorrect work of wdio input.setValue
        browser.waitUntil(() => {
            input.scrollIntoView(false)
            return input.isEnabled()
        },
        {
            timeoutMsg: 'Rental number input is not clickable',
        })

        browser.execute((input, rentals) => {
            input.value = rentals
        }, $(this.locators.numberOfRentals.input), rentals)

        input.click()

        browser.keys('Enter')
    }

    getNumberOfRentals() {
        return $(this.locators.numberOfRentals.input).getValue()
    }

    getSliderLocation() {
        return $(this.locators.numberOfRentals.slider).getLocation()
    }

    getTickLabelSizeAndLocationForRentals(rentalsNumber) {
        const tickLabel = $$(this.locators.numberOfRentals.tickLabels).find((tickLabel) => {
            return tickLabel.getText() === rentalsNumber
        })

        if (!tickLabel) {
            throw new Error(`Tick label for ${rentalsNumber} rentals is missing`)
        }

        return {
            ...tickLabel.getLocation(),
            ...tickLabel.getSize(),
        }
    }

    getPlanCurrency(plan, isPre) {
        const plansLocator = this.locators.plans
        return isPre 
            ? $(plansLocator[plan].container).$(plansLocator.currency.pre).getText()
            : $(plansLocator[plan].container).$(plansLocator.currency.post).getText()
    }

    getPricingForPlan(plan) {
        return $(this.locators.plans[plan].container).$(this.locators.plans.price).getText()
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
