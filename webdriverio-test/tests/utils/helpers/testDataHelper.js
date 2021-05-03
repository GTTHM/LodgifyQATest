const loremIpsum = require('lorem-ipsum').loremIpsum;

module.exports.plans = ['starter', 'professional', 'ultimate']

module.exports.planPricingTestData = [
    {
        period: 'yearly',
        rentalDisplays: '50',
        starterPrice: '$64',
        professionalPrice: '$375',
        ultimatePrice: '$525',
    },
    {
        period: 'monthly',
        rentalDisplays: '25',
        starterPrice: '$74',
        professionalPrice: '$315',
        ultimatePrice: '$440',
    },
    {
        period: 'twoYears',
        rentalDisplays: '75',
        starterPrice: '$72',
        professionalPrice: '$492',
        ultimatePrice: '$673',
    },
]

module.exports.currenciesTestData = [
    {
        currency: 'eur',
        sign: '€',
        pre: false,
    },
    {
        currency: 'usd',
        sign: '$',
        pre: true,
    },
    {
        currency: 'gbp',
        sign: '£',
        pre: true,
    },
]

module.exports.sliderPositioningTestData = [
    {
        rentalDisplays: '1',
    },
    {
        rentalDisplays: '25',
    },
    {
        rentalDisplays: '50',
    },
    {
        rentalDisplays: '75',
    },
    {
        rentalDisplays: '100',
    },
]

module.exports.pricePeriodsTestData = [
    {
        period: 'monthly',
        text: 'Monthly',
    },
    {
        period: 'yearly',
        text: 'Yearly up to 30% off',

    },
    {
        period: 'twoYears',
        text: 'Two Years up to 35% off',
    },
]

module.exports.contactUserData = {
    name: 'Ihar Stsepkin Test',
    email: 'automatedTest@test.com',
    phone: '1234567890',
    comment: loremIpsum({
        count: 3,
        units: 'sentences',
    }),
    arrival: '14/05/2021',
    departure: '14/06/2021',
    guests: '1',
}

module.exports.mandatoryFieldsTestData = [
    {
        field: 'name',
        notification: 'Name is mandatory',
    },
    {
        field: 'email',
        notification: 'Email is mandatory',
    },
    {
        field: 'phone',
        notification: 'Phone is mandatory',
    },
    {
        field: 'comment',
        notification: 'Comment is mandatory',
    },
]

module.exports.colors = {
    green: '58,223,53',
    red: '208,2,27',
}

const notValidEmailNotification = 'The email provided is not valid';

module.exports.incorrectEmailsTestData = [
    { 
        email: 'test@.com',
        notification: notValidEmailNotification,
    },
    { 
        email: 'test.logify.com',
        notification: notValidEmailNotification,
    },
    { 
        email: 'test@logify',
        notification: notValidEmailNotification,
    },
]
