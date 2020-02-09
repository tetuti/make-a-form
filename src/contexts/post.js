/* 
By creating a post context that can be shared between
the form component and the post result we can avoid excessive
prop drilling.

Bonus points for this approach, however it could also be 
achieved by simply hoisting the "post state" to a component
holding both the form and the post result
*/
import React, { useReducer, createContext } from 'react'
import { sleep } from '../utils'

const initialState = {
	data: null
}

function reducer(state, action) {
	const { payload, type } = action
	switch (type) {
		case 'SET_DATA':
			return { ...state, data: payload }
		default:
			return state
	}
}

function dispatchMiddleware(dispatch) {
	return async action => {
		const { type, payload } = action
		switch (type) {
			case 'SET_DATA':
				await sleep(500)
				dispatch({ type, payload })
				break
			default:
				dispatch(action)
		}
	}
}

const PostContext = createContext(initialState)

const PostProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState)
	return (
		<PostContext.Provider
			value={{ state, dispatch: dispatchMiddleware(dispatch) }}
		>
			{children}
		</PostContext.Provider>
	)
}

export { PostContext, PostProvider }
