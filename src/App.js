import React, { Component } from 'react';
import './App.css';

function Todo(props) {
	return (
		<li>{props.todo.text}</li>
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
				id: Date.now(),
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

	render() {
    	return (
			<div className="App">
				<div className="header">
					<h1>React TODO App</h1>
					<form onSubmit={this.handleSubmit}>
						<label>
							Name:
							<input type="text" value={this.state.value} onChange={this.handleChange} />
						</label>
						<input type="submit" value="Submit" />
					</form>
					<div className="todo-list">
						<ul>
							{this.state.todos.map((todo) => <Todo todo={todo} />)}
						</ul>
					</div>
				</div>
			</div>
    	);
	}
}

export default App;
