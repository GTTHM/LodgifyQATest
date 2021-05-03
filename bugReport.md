Usually I'm performing something like this in Jira or similar, but I would try to store found defects here.

# Contacts

## Defect-1

### Incorrect pricing is shown for 50 rentals displays and yearly period

#### Description:

Pricing for 50 rentals displays and yearly period is incorrect for ultimate plan. I would recommend checking other periods and rental displays number in case there might be an issue with price calculation.

#### Steps to reproduce:

1. Open pricing page
2. Set price period to yearly option
3. Set number of rentals to 50
4. Check pricing for ultimate plan

Expected result: Ultimate plan pricing should be $525
Actual result: Ultimate plan pricing is $518

# Pricing

## Defect-2 

### Impossible to send request via automation on Lodgify contact page 

#### Description:

reCAPTCHA low score(0.7) blocks automation execution. I would recommend disabling this feature for an automation environment or investigate more on how to deal with this. It's manually reproducible, not always.

#### Steps to reproduce:

Manual: 
1. Open contact page
2. Fill the form with all required data(name, phone, email, comment)
3. Open network tab in dev-tools
4. Submit the form

Automation: 
1. Execute Lodgify contact page should send request if data is correct test

Expected result: Request is sent with status code 200, "Your request has been sent successfully." notification is shown
Actual result: Request is failed, "Error" notification is shown.

## Defect-3

### Notification is not shown if mandatory phone field is left empty

#### Description

Phone field should be mandatory, but notification isn't shown if it is left empty, also form might be sent without filling phone field at all.

#### Steps to reproduce:

1. Open contact page
2. Fill the form with all required data(name, phone, email, comment)
3. Remove phone data
4. Submit form

Expected result: Notification should be shown after step 3, request should fail
Actual result: Notification wasn't shown, request passed

## Defect-4 

### Phone field border-color styles are displayed incorrectly

#### Description:

After filling any field with appropriate data borders of the corresponding field should become green. For some reason green border is not displayed for phone field, css property is correct.

#### Steps to reproduce:

1. Open contact page
2. Fill phone field with appropriate data and click outside

Expected result: Green border for phone field is displayed
Actual result: Green border for phone field is not displayed

## Defect-5

### Date picker not valides data correctly after clearing it

#### Description:

X button works correctly supposing date picker fields not mandatory, but if user opens data picker after filling it with some data, clears it and clicks outside, "Dates are not valid" notification would be shown.

#### Steps to reproduce:

1. Open contact page
2. Fill Arrival and Departure fields with appropriate data
3. Reopen date picker(click on dates)
4. Click X button and click outside

Expected result: No notification is shown
Actual result: Dates are not valid

# Recommendations

1. I would suggest to not make comment field mandatory
2. I would highly recommend to make date picker fields mandatory

