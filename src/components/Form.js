/*
The form should only be "submittable" if valid.

Bonus points for candidates who stick to DRY and manage
to map some kind of validated values to validated input
components rather than declaring each validated input
separately. 
*/

import React, { useState, useContext } from 'react'
import ValidatedInput from './layout/validated-input'
import useValidation, { validators, formHelper } from '../hooks/validation'
import { capitalize } from '../utils'
import { PostContext } from '../contexts/post'

export default function Form() {
	const {
		NOT_EMPTY,
		MAX_LENGTH,
		MIN_LENGTH,
		AGE_LIMIT,
		VALID_ADDRESS
	} = validators

	const name = useValidation({
		name: 'name',
		type: 'text',
		validators: [NOT_EMPTY, MIN_LENGTH(4), MAX_LENGTH(32)]
	})

	const age = useValidation({
		name: 'age',
		type: 'number',
		validators: [NOT_EMPTY, AGE_LIMIT(18)]
	})

	const address = useValidation({
		name: 'address',
		type: 'text',
		validators: [NOT_EMPTY, VALID_ADDRESS]
	})

	const { getValues, isValid } = formHelper([name, age, address])

	const [isSubmitting, setIsSubmitting] = useState(false)

	const { dispatch } = useContext(PostContext)

	function handleSubmit(e) {
		e.preventDefault()
		setIsSubmitting(true)
		if (isValid) {
			dispatch({ type: 'SET_DATA', payload: getValues })
		}
	}

	return (
		<section className="container form">
			<header className="header">
				<h1>Such form</h1>
			</header>
			<form>
				{[name, age, address].map(field => (
					<ValidatedInput
						{...field}
						key={field.name}
						label={capitalize(field.name)}
						showErrors={isSubmitting}
					/>
				))}
				<div className="field">
					<button onClick={handleSubmit}>SUBMIT</button>
				</div>
			</form>
		</section>
	)
}
