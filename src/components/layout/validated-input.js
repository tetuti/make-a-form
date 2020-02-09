/*
Each set of label, input and error message should be rendered
by a singular component. 

The component should be a "controlled component", i e
the component should recieve all information related to its
"validation state", value and a onChange handler as props.

Any stateful behaviour related to rendering specific logic,
f e toggle some kind of blur behaviour is ok.

Deduct points for not using a singular component.
*/

import React from 'react'

export default function ValidatedInput({
	label,
	type,
	value,
	onChange,
	name,
	errors,
	showErrors,
	isValid
}) {
	const inputProps = { type, value, onChange, name }
	return (
		<div className="field">
			<label>
				<strong>{label}</strong>
			</label>
			<br />
			<input
				{...inputProps}
				className={showErrors ? (isValid ? 'valid' : 'invalid') : ''}
			/>
			<br />
			{showErrors &&
				!isValid &&
				errors.map(error => (
					<div className="error" key={error}>
						<em>{error}</em>
					</div>
				))}
		</div>
	)
}
