import React, { useContext } from 'react'
import { PostContext } from '../contexts/post'

export default function PostResult() {
	const { state } = useContext(PostContext)
	const { data } = state

	return (
		<section className="container post">
			{data ? (
				<em>{JSON.stringify(data)}</em>
			) : (
				<div className="error">
					<em>no data</em>
				</div>
			)}
		</section>
	)
}
