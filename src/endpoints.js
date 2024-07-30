import axios from 'axios'
const BASE_URL = 'http://localhost:8000'
const GET_TODOS_URL = BASE_URL + '/todos'
const CREATE_TODOS_URL = BASE_URL + '/todos'
const UPDATE_TODO_URL = (id) => BASE_URL + '/todos/' + id
const DELETE_TODO_URL = (id) => BASE_URL + '/todos/' + id

const fetchTodos = async () => {
	const response = await axios.get(GET_TODOS_URL)
	return response.data
}

const createTodo = async (text) => {
	const response = await axios.post(CREATE_TODOS_URL, { text: text })
	return response.data
}
const updateTodo = async (todo) => {
	const url = UPDATE_TODO_URL(todo.id)
	const response = await axios.put(url, { todo: todo })
	return response.data
}

const deleteTodo = async (id) => {
	const response = await axios.delete(DELETE_TODO_URL(id))
	return response.data
}

export { createTodo, fetchTodos, updateTodo, deleteTodo }
