import React, { Component } from 'react';
import './App.css';

function Todo(props) {
	return (
		<li>
			<div className="todo">
				<span className="todo-text">{props.todo.text}</span>
				<button className="delete-btn" onClick={props.onDelete}>X</button>
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
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
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
							<input className="input-todo" type="text" placeholder="Enter Task" value={this.state.value} onChange={this.handleChange} />
						</label>
						<input className="submit-todo" type="submit" value="Submit" />
					</form>
					<div className="todo-list">
						<ul>
							{this.state.todos.map((todo) => <Todo
							onDelete = {() => this.removeTodo(todo.key)}
							todo={todo} />)}
						</ul>
						<button onClick={() => this.removeAll()}>Clear All</button>
					</div>
				</div>
			</div>
    	);
	}
}

export default App;
