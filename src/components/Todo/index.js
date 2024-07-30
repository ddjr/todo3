import React, { useState, useCallback } from 'react'
import './index.css'
import { updateTodo } from '../../endpoints'

function Todo({ todo, todos, setTodos }) {
	const [editText, setEditText] = useState(false)
	const [currentText, setCurrentText] = useState(todo.text)
	const toggleChecked = () => {
		updateTodo({ ...todo, checked: !todo.checked })
		setTodos(
			todos.map((item) => {
				if (item.id === todo.id) {
					return { ...item, checked: !item.checked }
				}
				return item
			})
		)
	}
	const handleUpdateText = useCallback(() => {
		setEditText(false)
		updateTodo({ ...todo, text: currentText })
		setTodos(
			todos.map((t) => {
				if (t.id === todo.id) {
					return { ...t, text: currentText }
				}
				return t
			})
		)
	}, [currentText, todo, todos, setTodos])
	return (
		<div className='todo'>
			<input type='checkbox' onChange={toggleChecked} checked={todo.checked} />
			{editText ? (
				<input
					autoFocus
					onBlur={handleUpdateText}
					value={currentText}
					onChange={(e) => setCurrentText(e.target.value)}
					onKeyUp={(e) => e.key === 'Enter' && handleUpdateText()}
				/>
			) : (
				<div className={`${todo.checked ? 'checked' : ''}`} onDoubleClick={() => setEditText(true)}>
					{currentText}
				</div>
			)}
		</div>
	)
}

export default Todo
