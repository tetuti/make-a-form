# Make-a-form

_To run this example implementaiton run `npm install` followed by `npm start`_

_Further information about this example can be found in commented code_

## Instructions

Make an app with the following components:

-   Form
-   Post result

### Form

A form with three fields, `Name`, `Age` and `Address`.

Each field should be validated by the following rules:

`Name`

-   Should be longer than 3 characters
-   Must not be empty

`Age`

-   Must be 18 or above
-   Must not be empty

`Address`

-   Should look like an street address (f e Somestreet 123)
-   Must not be empty

Each field should present all errors related to the above rules.

Errors should only be shown once the user has attempted to submit

The form must be valid in order for the user to be able to submit.

### Post result

The result of the post (some JSON-like representation of the post data) should be displayed by a separate component.

The `Post result`-component must be a separate component from `Form`-component and must not be a child of the `Form`-component.

**Bonus points**

-   Use your own validation.
-   Keep it DRY.
