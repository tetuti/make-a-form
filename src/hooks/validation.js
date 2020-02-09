/*
This section could be split into seperate files.

This particular approach allows for validating separate
input fields as well as whole forms (via use of the helper).

Furthermore the way useValidation makes use of validators
allows us to reuse validators as well as inline declation of
"one-of" validators, f e:

	const someField = useValidation({
		name: 'field',
		type: 'text',
		validators: [
			value => ...
		]
	})

The major drawbacks of this approach is it does not handle dynamic
forms, i e forms where the number of fields may vary (f e if we add
another set of contact info for related contacts).

See https://itnext.io/how-i-tried-to-validate-react-forms-with-hooks-31634fc5385b

Bonus points for simply creating your own validation.
*/

import { useState } from 'react'

export const validators = {
	NOT_EMPTY: value => (!value ? 'NOT_EMTPY' : null),
	AGE_LIMIT: ageLimit => age =>
		age < ageLimit ? 'DOES_NOT_MEET_AGE_LIMIT' : null,
	VALID_ADDRESS: address =>
		!/[\w\såäö]+\s\d*/i.test(address) ? 'INVALID_ADDRESS' : null,
	MIN_LENGTH: minLength => value =>
		value.length < minLength ? 'MIN_LENGTH' : null,
	MAX_LENGTH: maxLength => value =>
		value.length > maxLength ? 'MAX_LENGTH' : null
}

export const formHelper = fields => ({
	isValid: fields.every(field => field.isValid),
	getValues: fields.reduce(
		(acc, { name, value }) => ({ ...acc, ...{ [name]: value } }),
		{}
	)
})

export default function useValidation({
	name,
	type,
	initialValue = '',
	validators = []
}) {
	/* 
	Declare state for value and errors and initialize them
	to initialValue and possible error for initialValue.
	
	Pessimistic error handling allows us to ignore wheter
	the value has been touched or not.
	*/
	const [value, setValue] = useState(initialValue)
	const [errors, setErrors] = useState(validate(initialValue))

	const isValid = errors.filter(error => !!error).length === 0

	function preprocess(value) {
		switch (type) {
			case 'number':
				return parseFloat(value)
			default:
				return value
		}
	}

	function validate(value) {
		return validators.map(validator => validator(value))
	}

	function onChange(e) {
		const value = preprocess(e.target.value)
		const errors = validate(value)
		setValue(value)
		setErrors(errors)
	}

	return {
		name,
		value,
		type,
		onChange,
		errors: errors.filter(error => !!error),
		isValid
	}
}
