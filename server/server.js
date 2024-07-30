// ------------------------------------
// TAKE 4
// ------------------------------------
const express = require('express')
const cors = require('cors')
const uuid = require('uuid')
const fs = require('fs')
const app = express()

app.use(express.json())
app.use(cors())

const FILE_PATH = 'data.json'

const readFS = () => JSON.parse(fs.readFileSync(FILE_PATH))
const writeFS = (json) => fs.writeFileSync(FILE_PATH, JSON.stringify(json), 'utf-8', () => {})
let data = readFS()

const createTodo = (text) => ({ text: text, checked: false, id: uuid.v4() })
const updateTodo = (todo, array = data) => array.map((item) => (item.id == todo.id ? todo : item))
const findTodo = (id, array = data) => {
	const todo = array.filter((item) => item.id == id)
	return todo.length === 0 ? {} : todo[0]
}
const deleteTodo = (id, array = data) => array.filter((item) => item.id != id)

app.get('/todos', (_request, response) => {
	response.status(200).send(data)
})

app.post('/todos', (request, response) => {
	if (!request.body.text) {
		response.status(400).send('Invaild text sent')
	}
	const todo = createTodo(request.body.text)
	console.log(data)
	data.push(todo)
	writeFS(data)
	response.status(201).send(data)
})

app.get('/todos/:id', (request, response) => {
	const todo = findTodo(request.params.id)
	response.status(200).send(todo)
})

app.put('/todos/:id', (request, response) => {
	console.log(request.body.todo)
	if (!request.body.todo) {
		response.status(401).send('invaild todo sent')
	}
	data = updateTodo(request.body.todo)
	writeFS(data)
	response.status(200).send(request.body.todo)
})

app.delete('/todos/:id', (request, response) => {
	const todo = findTodo(request.params.id)
	data = deleteTodo(request.params.id)
	writeFS(data)
	response.status(200).send(todo)
})
app.listen(8000)

// ------------------------------------
// TAKE 3
// ------------------------------------
// const express = require('express')
// const cors = require('cors')
// const fs = require('fs')
// const uuid = require('uuid')
// const app = express()
// app.use(express.json())
// app.use(cors())
// const FILE_NAME = 'data.json'

// const readFS = () => JSON.parse(fs.readFileSync(FILE_NAME))
// const writeFS = (json) => fs.writeFile(FILE_NAME, JSON.stringify(json), 'utf-8', () => {})
// let data = readFS()

// const createTodo = (text) => ({ text: text, checked: false, id: uuid.v4() })
// const updateTodo = (todo) => data.map((t) => (t.id == todo.id ? todo : t))
// const deleteTodo = (id) => data.filter((t) => t.id != id)
// const getTodoById = (id) => data.filter((t) => t.id == id)

// app
// 	.route('/todos')
// 	.get((_request, response) => {
// 		response.status(200).send(data)
// 	})
// 	.post((req, res) => {
// 		if (!req.body.text) {
// 			res.status(400).send('no text sent')
// 		}
// 		const todo = createTodo(req.body.text)
// 		data.push(todo)
// 		writeFS(data)
// 		res.status(201).send(data)
// 	})

// app
// 	.route('/todos/:id')
// 	.get((req, res) => {
// 		if (!req.params.id) {
// 			res.status(400).send('no id sent')
// 		}
// 		const todo = getTodoById(req.params.id)
// 		if (!todo.length) {
// 			res.status(400).send('todo not found')
// 		}
// 		res.status(200).send(todo[0])
// 	})
// 	.put((req, res) => {
// 		if (!req.body.todo) {
// 			res.status(401).send('no todo sent')
// 		}
// 		const data = updateTodo(req.body.todo)
// 		writeFS(data)
// 		res.status(201).send(req.body.todo)
// 	})
// 	.delete((req, res) => {
// 		const id = req.params.id
// 		const todo = getTodoById(id)
// 		data = deleteTodo(id)
// 		writeFS(data)
// 		res.status(201).send(todo)
// 	})

// app.listen(8000)
// ------------------------------------
// TAKE 2
// ------------------------------------

// const express = require('express')
// const cors = require('cors')
// const fs = require('fs')
// const uuid = require('uuid')
// const app = express()
// app.use(express.json())
// app.use(cors())

// // FILE SYSTEM
// const getData = () => JSON.parse(fs.readFileSync('data.json'))
// const writeDataToFile = () =>
// 	fs.writeFile('data.json', JSON.stringify(data), 'utf-8', (error) => {
// 		console.log('wrote to fs')
// 	})

// // CRUD TODOS
// const createTodo = (text) => ({ text: text, checked: false, id: uuid.v4() })
// const replaceTodo = (todo) => data.map((t) => (t.id == todo.id ? todo : t))
// const deleteTodo = (id) => data.filter((t) => t.id != id)
// const findTodoById = (id) => data.filter((t) => t.id == id)

// // INIT DATA
// let data = getData()

// app
// 	.route('/todos')
// 	.get((_request, response) => {
// 		response.status(200).send(data)
// 	})
// 	.post((request, response) => {
// 		if (!request.body.text) {
// 			response.status(400).send('no text sent')
// 		}
// 		const todo = createTodo(request.body.text)
// 		data.push(todo)
// 		writeDataToFile()
// 		response.status(201).send(data)
// 	})

// app
// 	.route('/todos/:id')
// 	.get((request, response) => {
// 		let todo = findTodoById(request.params.id)
// 		if (!todo.length) {
// 			response.status(400).send('could not find')
// 		}
// 		response.status(200).send(todo[0])
// 	})
// 	.put((request, response) => {
// 		if (!request.body.todo) {
// 			response.status(400).send('no todo sent')
// 		}
// 		data = replaceTodo(request.body.todo)
// 		writeDataToFile()
// 		response.status(201).send(request.body.todo)
// 	})
// 	.delete((request, response) => {
// 		const todo = findTodoById(request.params.id)
// 		data = deleteTodo(request.params.id)
// 		console.log(request.params.id)
// 		console.log(data)
// 		writeDataToFile()
// 		response.status(201).send(todo)
// 	})

// app.listen(8000)

// ------------------------------------
// TAKE 1
// ------------------------------------
// const express = require('express')
// const app = express()
// const cors = require('cors')
// const fs = require('fs')
// const uuid = require('uuid')

// app.use(express.json())
// app.use(cors())

// const getData = () => JSON.parse(fs.readFileSync('data.json'))
// let data = getData()
// const writeDataToFile = () =>
// 	fs.writeFile('data.json', JSON.stringify(data), 'utf-8', () =>
// 		console.log('Data written to file')
// 	)
// const createTodo = (text) => ({ text: text, checked: false, id: uuid.v4() })
// const replaceTodo = (todo) => data.map((oldTodo) => (oldTodo.id == todo.id ? todo : oldTodo))
// const deleteTodo = (id) => data.filter((todo) => todo.id != id)

// app.get('/todos', (_request, response) => {
// 	console.log('GET /todos')
// 	response.status(200).send(data)
// })

// app.post('/todos', (request, response) => {
// 	if (!request.body.text) {
// 		response.status(400).send('no text sent')
// 	}
// 	const todo = createTodo(request.body.text)
// 	data.todos.push(todo)
// 	writeDataToFile()
// 	response.status(201).send(todo)
// })

// app.put('/todos/:id', (request, response) => {
// 	if (!request.body.todo) {
// 		response.status(400).send('no todo sent')
// 	}
// 	data = replaceTodo(request.body.todo)
// 	writeDataToFile()
// 	response.status(201).send(request.body.todo)
// })

// app.delete('/todos/:id', (request, response) => {
// 	if (!request.params.id) {
// 		response.status(400).send('no id sent')
// 	}
// 	data = deleteTodo(request.params.id)
// 	writeDataToFile()
// 	response.status(201).send('success')
// })

// console.log('listening on port 8000')
// app.listen(8000)
