import React, { Component } from 'react';
import './App.css';

function Todo (props) {
	return (
		<li>
			<div className="todo">
				<span className="todo-text">{props.todo.text}</span>
				<div className="action-btns">
					<button className="edit-btn" onClick={props.onEdit}>Edit</button>
					<button className="delete-btn" onClick={props.onDelete}>Delete</button>
				</div>
			</div>
		</li>
	);
}

class App extends Component {
	constructor() {
		super()
		this.state = {
			todos: [],
			value: '',
			newText: '',
		};

		//this.handleTodoListChange = this.handleTodoListChange.bind(this);

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.input = React.createRef();
	}

	handleChange(event) {
		this.setState({value: event.target.value});
		//console.log("change :" + this.state.todos);
	}

	handleTodoListChange(key, event) {
		var todos = this.state.todos.slice();
		const index = todos.findIndex((todo) => todo.key === key);
		todos[index]['text'] = event.target.value;
		this.setState({todos: todos});
		//console.log('value: ' + this.state.newText);
	}

	addTodo() {
		//console.log(this.state.value);
		if (this.state.value !== "") {
			var newTodo = {
				text: this.state.value,
				key: Date.now(),
				edit: false,
			}

			this.setState({
				todos: [...this.state.todos, newTodo],
			})
		}
	}
	
	handleSubmit(event) {
		this.addTodo();
		//console.log(this.state.todos);
		this.setState({ value: '', });
		event.preventDefault();
	}

	handleTodoListSubmit(key, event){
		
		this.toggleEdit(key);
		event.preventDefault();
	}

	toggleEdit(key) {
		/*const todoIndex = this.state.todos.findIndex(todo => todo.key === key);
		const updatedTodo = { ...this.state.todos[todoIndex], edit: !this.state.todos[todoIndex].edit};
		this.setState({
			todos: [...this.state.todos.slice(0, todoIndex), updatedTodo, ...this.state.todos.slice(todoIndex + 1),],
		});*/
		this.setState({
			todos: this.state.todos.map(todo => {
				if (todo.key === key) {
					todo = {...todo, edit: !todo.edit};
				}
				return todo;
			})
		})
	}

	removeAll() {
		this.setState({
			todos: []
		})
	}

	removeTodo(key) {
		this.setState({
			todos: this.state.todos.filter((todo) => todo.key !== key)
		})
	}

	render() {
    	return (
			<div className="App">
				<h1>React TODO App</h1>
				<div className="todo-page">
					<form className="add-form" onSubmit={this.handleSubmit}>
						<input className="input-todo" type="text" name="newTodo" placeholder="Enter New Task" 
						value={this.state.value} onChange={this.handleChange} />
						<button className="submit-todo" type="submit">Add</button>
					</form>
					<div className="todo-list">
						<ul>
							{this.state.todos.map((todo) => {
								if (!todo.edit) {
									return <Todo todo={todo} key={todo.key}
									onDelete={() => this.removeTodo(todo.key)}
									onEdit={() => this.toggleEdit(todo.key)} />
								} else {
									return (
										<div key={todo.key}>
											<form
											 className="edit-todo" 
											 onSubmit={this.handleTodoListSubmit.bind(this, todo.key)}>
												<input className="update-todo" 
												onChange={this.handleTodoListChange.bind(this, todo.key)} 
												value={todo.text}/>
												<button className="submit-todo" type="button" 
												onClick={() => this.toggleEdit(todo.key)}>Save</button>
											</form>
										</div>
									);
								}
							})}
						</ul>
					</div>
				</div>
				<button className="clear-btn" onClick={() => this.removeAll()}>Clear All</button>
			</div>
    	);
	}
}

export default App;
