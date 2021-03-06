const { urls } = require("../utils/helpers/commonHelper")
const { contactUserData, mandatoryFieldsTestData, colors, incorrectEmailsTestData, allFormFields } = require("../utils/helpers/testDataHelper")
const Contact = require("../utils/pageObjects/contact")

const contact = new Contact()

describe('Lodgify contact page', () => {
    beforeEach(() => {
        browser.url(urls.contact)
    })

    it('should send request if data is correct', () => {
        contact.fillFormWithData(contactUserData)
        contact.submitForm()
        contact.waitForMessageDisplayed('success')
        expect(contact.getMessageText()).toBe("Your request has been sent successfully.")
    })

    allFormFields.forEach((testData) => {
        it(`should make borders of filled ${testData.field} field green`, () => {
            if (testData.field === 'datePicker') {
                contact.fillFormElementWithText('arrival', contactUserData.arrival)
                contact.fillFormElementWithText('departure', contactUserData.departure)
            } else {
                contact.fillFormElementWithText(testData.field, contactUserData[testData.field])
            }
            contact.waitForElementCssProperty(testData.field, 'border-color', colors.green)
            expect(contact.getFormElementCssProperty(testData.field, 'border-color')).toMatch(colors.green)
        })
    })

    mandatoryFieldsTestData.forEach((testData) => {
        it(`should show notification if mandatory ${testData.field} field is left empty`, () => {
            contact.fillFormWithData({
                ...contactUserData,
                [testData.field]: '',
            })
            contact.waitForNotificationDisplayed()
            expect(contact.getNotificationText()).toBe(testData.notification)
            expect(contact.getFormElementCssProperty(testData.field, 'border-color')).toMatch(colors.red)
            expect(contact.isSubmitEnabled()).toBeFalsy()
        })
    })

    it('should not show notification if dates field is left empty', () => {
        contact.fillFormWithData(contactUserData)
        contact.clearDates()
        expect(contact.getFormElementValue('arrival')).toBe('')
        expect(contact.getFormElementValue('departure')).toBe('')
        expect(contact.isNotificationDisplayed()).toBeFalsy()
        expect(contact.isSubmitEnabled()).toBeTruthy()
    })

    it('should not show notification if guests field is left empty', () => {
        contact.fillFormWithData({
            ...contactUserData,
            guests: '',
        })
        expect(contact.isNotificationDisplayed()).toBeFalsy()
    })

    incorrectEmailsTestData.forEach((testData) => {
        it(`should validate ${testData.email} email correctly`, () => {
            contact.fillFormElementWithText('email', testData.email)
            contact.waitForNotificationDisplayed()
            expect(contact.getNotificationText()).toBe(testData.notification)
        })
    })
})
