import React, { Component } from 'react';
import './App.css';

function Todo (props) {
	return (
		<li>
			<div className="todo">
				<span className="todo-text">{props.todo.text}</span>
				<button onClick={props.onEdit}>Edit</button>
				<button className="delete-btn" onClick={props.onDelete}>Delete</button>
			</div>
		</li>
	);
}

function TodoEdit(props) {
	return (
		<li>
			<input type="text" placeholder="enter new task"/>
			<button onClick={props.updateTodo}>Save</button>
			<button onClick={props.onCancel}>Cancel</button>
		</li>
	);
}

class App extends Component {
	constructor() {
		super()
		this.state = {
			todos: [],
			value: '',
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.input = React.createRef();
	}

	handleChange(event) {
		this.setState({value: event.target.value});
		//console.log("change :" + this.state.todos);
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
				<div className="App-header">
					<h1>React TODO App</h1>
					<form onSubmit={this.handleSubmit}>
						<label>
							<input className="input-todo" type="text" placeholder="Enter Task" 
							value={this.state.value} onChange={this.handleChange} />
						</label>
						<input className="submit-todo" type="submit" value="Submit" />
					</form>
					<div className="todo-list">
						<ul>
							{this.state.todos.map((todo) => {
								if (!todo.edit) {
									return <Todo todo={todo} 
									onDelete={() => this.removeTodo(todo.key)}
									onEdit={() => this.toggleEdit(todo.key)} />
								} else {
									return (
										<TodoEdit todo={todo} 
										onCancel={() => this.toggleEdit(todo.key)}
										onSave={() => this.updateTodo(todo.key)}/>
									);
								}
							})}
						</ul>
						<button onClick={() => this.removeAll()}>Clear All</button>
					</div>
				</div>
			</div>
    	);
	}
}

export default App;
