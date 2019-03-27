import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

var buttons = [
	{
		name: 'Clear Screen',
		classes: 'button clear',
		type: 'revision',
		value: 'Clear',
		key: ' '
	},
	{
		name: 'Delete Last Digit',
		classes: 'button del',
		type: 'revision',
		value: 'Del',
		key: '\b'
	},
	{
		name: 'Number 0',
		classes: 'button num0',
		type: 'number',
		value: '0',
		key: '0'
	},
	{
		name: 'Number 1',
		classes: 'button num1',
		type: 'number',
		value: '1',
		key: '1'
	},
	{
		name: 'Number 2',
		classes: 'button num2',
		type: 'number',
		value: '2',
		key: '2'
	},
	{
		name: 'Number 3',
		classes: 'button num3',
		type: 'number',
		value: '3',
		key: '3'
	},
	{
		name: 'Number 4',
		classes: 'button num4',
		type: 'number',
		value: '4',
		key: '4'
	},
	{
		name: 'Number 5',
		classes: 'button num5',
		type: 'number',
		value: '5',
		key: '5'
	},
	{
		name: 'Number 6',
		classes: 'button num6',
		type: 'number',
		value: '6',
		key: '6'
	},
	{
		name: 'Number 7',
		classes: 'button num7',
		type: 'number',
		value: '7',
		key: '7'
	},
	{
		name: 'Number 8',
		classes: 'button num8',
		type: 'number',
		value: '8',
		key: '8'
	},
	{
		name: 'Number 9',
		classes: 'button num9',
		type: 'number',
		value: '9',
		key: '9'
	},
	{
		name: 'Decimal',
		classes: 'button dec',
		type: 'number',
		value: '.',
		key: '.'
	},
	{
		name: 'Division',
		classes: 'button operator div',
		type: 'operator',
		value: '/',
		key: 'd'
	},
	{
		name: 'Multiplication',
		classes: 'button operator mul',
		type: 'operator',
		value: '*',
		key: 'f'
	},
	{
		name: 'Substraction',
		classes: 'button operator sub',
		type: 'operator',
		value: '-',
		key: 's'
	},
	{
		name: 'Addition',
		classes: 'button operator add',
		type: 'operator',
		value: '+',
		key: 'a'
	},
	{
		name: 'Equal',
		classes: 'button equ equ',
		type: 'equality',
		value: '=',
		key: '\n'
	}
]

function Page() {
	return(
		<div className='wrapper'>
			<header>
				<App />
			</header>
			<section>
				<Calculator />
			</section>
		</div>
	)
}

class Screen extends React.Component {
	render() {
		return(
			<div className='screen'>
				{this.props.value}
			</div>
		)
	}
}

class Button extends React.Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(event) {
		this.props.handleClick(event.target);
	}

	render() {
		return(
			<div className={this.props.classes} 
				data-type={this.props.dataType}
				onClick={this.handleClick} >
				{this.props.value}
			</div>
		)
	}
}

class ButtonPad extends React.Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(button) {
		switch(button.getAttribute('data-type')) {
			case 'number' :
				this.props.onNumberClick(button.innerHTML);
			break;

			case 'operator' :
				this.props.onOperatorClick(button.innerHTML);
			break;

			case 'revision' :
			 this.props.onRevisionClick(button.innerHTML);
			break;

			case 'equality' :
				this.props.onCalculateClick();
			break;

			default :
				console.log(button);
			break;
		}
	}
	render() {
		let btns = [];
		buttons.map((button)=> {
			btns.push(<Button classes={button.classes} 
				value={button.value}
				dataType={button.type}
				handleClick={this.handleClick} 
				key={button.key} />)
			return null;
		});
		return(
			<div className="button-pad">
				{btns}
			</div>
		)
	}
}

class Calculator extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			result: '0',
			value: '0',
			operator: '+',
			isShowingResult: false,
		}

		this.handleNumberClick = this.handleNumberClick.bind(this);
		this.handleOperatorClick = this.handleOperatorClick.bind(this);
		this.handleRevisionClick = this.handleRevisionClick.bind(this);
		this.handleCalculateClick = this.handleCalculateClick.bind(this);
	}

	handleNumberClick(value) {
		this.setState(function(state, props) {
			if(state.isShowingResult === true) {
				let newState = {result: state.value, value: value, isShowingResult: false}
				if(value === '.')
					newState.value = '0.';
				if(state.value === Infinity) {
					newState.result = '0';
				}
				return newState;
			}
			let prevValue = state.value;
			if(value === '.' && prevValue.indexOf('.') === -1) {
				return {value: prevValue + value}
			}
			if(prevValue === '0') {
				prevValue = '';
			}
			return {value: (prevValue + value)}
		})
	}

	handleOperatorClick(operator) {
		this.setState((state, props)=> {
			if(state.isShowingResult === true) {
				return{operator}
			}
			let newResult = calculation.perform(state.result, state.value, state.operator)
			return {
				result: newResult,
				value: newResult,
				operator: operator,
				isShowingResult: true
			}
		});		
	}

	handleRevisionClick(extent) {
		if(extent === 'Del') {
			this.setState((state, props)=>{
				let newValue = state.value;
				if(newValue === Infinity) {
					newValue = '0';
				}
				newValue = newValue.slice(0, state.value.length-1)
				if(newValue === '') {
					newValue = '0';
				}
				return {value: newValue}
			})
		} else if (extent === 'Clear') {
			this.setState({
				result: '0',
				value: '0'
			})
		}
	}

	handleCalculateClick() {
		this.setState((state, props)=>{
			let newResult = calculation.perform(state.result, state.value, state.operator)
			return {
				result: 0,
				value: newResult,
				operator: '+',
				isShowingResult: true
			}
		})

	}

	render() {
		return(
			<div className='calculator'>
				<Screen value={this.state.value} />
				<ButtonPad 
					onNumberClick={this.handleNumberClick}
					onOperatorClick={this.handleOperatorClick}
					onRevisionClick={this.handleRevisionClick}
					onCalculateClick={this.handleCalculateClick} />
			</div>
		)
	}
}

var calculation = {
	'+': function(operand1, operand2) {
		operand1 = parseFloat(operand1);
		operand2 = parseFloat(operand2);
		return operand1 + operand2;
	},

	'-': function(operand1, operand2) {
		operand1 = parseFloat(operand1);
		operand2 = parseFloat(operand2);
		return operand1 - operand2;
	},

	'/': function(operand1, operand2) {
		operand1 = parseFloat(operand1);
		operand2 = parseFloat(operand2);
		return operand1 / operand2;
	},

	'*': function(operand1, operand2) {
		operand1 = parseFloat(operand1);
		operand2 = parseFloat(operand2);
		return operand1 * operand2;
	},

	perform: function(operand1, operand2, operator) {
		return this[operator](operand1, operand2)
	}
}

ReactDOM.render(<Page />, document.getElementById('root'));

window.onkeydown = function(event) {
	let d=document.getElementByClassName('num9')
	console.log(d)
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
