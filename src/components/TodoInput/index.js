import React, { useState } from 'react'
import './index.css'
import { createTodo } from '../../endpoints'

function TodoInput({ todos, setTodos }) {
	const [text, setText] = useState('')

	const handleClick = (event) => {
		if (event.key !== 'Enter' || text === '') return
		createTodo(text).then((response) => {
			setTodos(response)
		})
		setTodos([...todos, { text: text, checked: false, id: Math.floor(Math.random * 1_000_000) }])
		setText('')
	}

	return (
		<input
			type='text'
			className='text-input'
			placeholder='next todo...'
			value={text}
			onChange={(e) => setText(e.target.value)}
			onKeyUp={(e) => handleClick(e)}
		/>
	)
}

export default TodoInput
