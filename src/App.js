import React from 'react'
import Form from './components/Form'
import PostResult from './components/post-result'
import { PostProvider } from './contexts/post'

function App() {
	return (
		<PostProvider>
			<div className="App">
				<Form />
				<PostResult />
			</div>
		</PostProvider>
	)
}

export default App
