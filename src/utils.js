export const capitalize = string =>
	`${string[0].toUpperCase()}${string.substring(1)}`

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
