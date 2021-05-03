const { getRandomNumberBetween } = require("../helpers/commonHelper")

const locators = {
    form: {
        name: '[name="name"]',
        phone: '[name="phone"]',
        email: '[name="email"]',
        comment: '[placeholder="Comment"]',
        arrival: '[placeholder="Arrival"]',
        departure: '[placeholder="Departure"]',
        datePicker: '.DateRangePickerInput__withBorder',
        clearDatesButton: '[aria-label="Clear Dates"]',
        guests: '[placeholder="Guests"]',
        submit: '[type="submit"]',
        notification: '.red.pointing.below.label',
    },
    messages: {
        message: '.message',
        success: '.success',
        error: '.error',
    },
    header: '.content .header',
}

class Contact {
    locators = locators

    clearDates() {
        $(this.locators.form.clearDatesButton).click()
    }

    getFormElementValue(elementName) {
        return $(this.locators.form[elementName]).getValue()
    }

    getFormElementCssProperty(elementName, cssProperty) {
        return $(this.locators.form[elementName]).getCSSProperty(cssProperty).value
    }

    fillFormElementWithText(elementName, text) {
        const element = $(this.locators.form[elementName])
        element.click()
        element.setValue(text)
        $(this.locators.header).click()
    }

    fillFormWithData(data) {
        this.fillFormElementWithText('name', data.name)
        this.fillFormElementWithText('phone', data.phone)
        this.fillFormElementWithText('email', data.email)
        this.fillFormElementWithText('comment', data.comment)
        this.fillFormElementWithText('arrival', data.arrival)
        this.fillFormElementWithText('departure', data.departure)
        this.fillFormElementWithText('guests', data.guests)
    }

    isSubmitEnabled() {
        return $(this.locators.form.submit).isEnabled()
    }

    submitForm() {
        $(this.locators.form.submit).click()
    }

    waitForMessageDisplayed(messageType) {
        browser.waitUntil(() => {
            return $(this.locators.messages[messageType]).isDisplayed()
        }, {
            timeoutMsg: `${messageType} message was not displayed`,
        })
    }

    isNotificationDisplayed() {
        return $(this.locators.form.notification).isDisplayed()
    }

    waitForNotificationDisplayed() {
        browser.waitUntil(() => {
            return this.isNotificationDisplayed()
        }, {
            timeoutMsg: "Notification was not displayed",
        })
    }

    getNotificationText() {
        const html = $(this.locators.form.notification).getHTML()
        return html.match(/>.*</)[0].replace(/>|</g, '')
    }

    getMessageText() {
        return $(this.locators.messages.message).getText()
    }
}

module.exports = Contact
