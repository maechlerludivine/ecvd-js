"use strict";
if(localStorage.length == 0){
	localStorage.setItem('todos','[]');
}

var savedTextContent = null;
var keypressEventTrigger = false;
var todos = JSON.parse(localStorage.todos);
var input = document.querySelector('.new-todo');
var ul = document.querySelector('.todo-list');
var li = null;
var span = null;
var button = null;

function addItem(textContent){
	todos.push(textContent);
	localStorage.todos = JSON.stringify(todos);
}

function editableItem(textContent){
	for(var i = 0; i < todos.length; i++){
		if(savedTextContent == todos[i]){
			todos.splice(i,1,textContent);
			localStorage.todos = JSON.stringify(todos);
		}
	}
}

function removeItem(textContent){
	for(var i = 0; i < todos.length; i++){
		if(textContent == todos[i]){
			todos.splice(i,1);
			localStorage.todos = JSON.stringify(todos);
		}
	}
}

function checkValue(textContent){
	var error = false;
	for(var i = 0; i <= todos.length; i++){
		if(textContent == todos[i] || textContent == ''){
			error = true;
		}
	}
	return error;
}

function addEvents(li, span, button){
	span.addEventListener('dblclick', function (){
		button.style.display = 'none';
		span.contentEditable = true;
		span.focus();
		savedTextContent = span.textContent;
	}, false);

	span.addEventListener('keypress', function (e){
		if(e.keyCode == 13 && !checkValue(span.textContent)){
			keypressEventTrigger = true;
			span.contentEditable = false;
			button.style.display = 'block';
			editableItem(span.textContent);
		} else if(e.keyCode == 13 && checkValue(span.textContent)){
			keypressEventTrigger = true;
			span.contentEditable = false;
			button.style.display = 'block';
			span.textContent = savedTextContent;
		}
	}, false);

	span.addEventListener('blur', function (){
		if(!keypressEventTrigger){
			if(!checkValue(span.textContent)){
				span.contentEditable = false;
				button.style.display = 'block';
				editableItem(span.textContent);
			} else{
				span.contentEditable = false;
				button.style.display = 'block';
				span.textContent = savedTextContent;
			}
		} else{
			keypressEventTrigger = false;
		}
	}, false);
	
	button.addEventListener('click', function (){
		ul.removeChild(li);
		removeItem(span.textContent);
	}, false);
}

if(todos.length != 0){
	for(var i = 0; i < todos.length; i++){
		li = document.createElement('li');
		span = document.createElement('span');
		button = document.createElement('button');

		span.textContent = todos[i];
		addEvents(li, span, button);

		ul.appendChild(li);
		li.appendChild(span);
		li.appendChild(button);
	}
}

input.addEventListener('keypress', function (e){
	if(e.keyCode == 13 && !checkValue(input.value)){
		li = document.createElement('li');
		span = document.createElement('span');
		button = document.createElement('button');

		span.textContent = input.value;
		addEvents(li, span, button);

		ul.appendChild(li);
		li.appendChild(span);
		li.appendChild(button);

		input.value = '';
		addItem(span.textContent);
	}
}, false);