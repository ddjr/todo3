import { useEffect, useMemo, useState } from 'react'
import './App.css'
import Filters from './components/Filters'
import Todo from './components/Todo'
import TodoInput from './components/TodoInput'
import { fetchTodos } from './endpoints'

export default function App() {
	const [todos, setTodos] = useState([])
	const [filter, setFilter] = useState('all')
	const filteredTodos = useMemo(() => {
		switch (filter) {
			case 'active':
				return todos.filter((t) => !t.checked)
			case 'complete':
				return todos.filter((t) => t.checked)
			default:
				return todos
		}
	}, [todos, filter])

	useEffect(() => {
		fetchTodos()
			.then((todos) => setTodos(todos))
			.catch((error) => console.error({ error }))
	}, [])

	return (
		<div className='app'>
			<TodoInput setTodos={setTodos} todos={todos} />
			{filteredTodos.map((todo) => (
				<Todo todo={todo} key={todo.id} setTodos={setTodos} todos={todos} />
			))}
			<Filters filter={filter} setFilter={setFilter} />
		</div>
	)
}
