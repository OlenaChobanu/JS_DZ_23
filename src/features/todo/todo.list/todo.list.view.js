import * as $ from 'jquery';
import './todo.list.css';
import TodoEditView from "../todo.edit/todo.edit.view";

export default class TodoListView {
        #todos = [];
        #currentId = null;
        #editView = null;
        #editContainer = null;

        #options = null;
        constructor() {
            this.#editView = new TodoEditView();
        }

    renderTodos(todos) {
        this.#todos = todos;
        this.renderEditEl();
        return todos.map(this.createTodoEl).join('');
    }

    renderEditEl(){
        this.#editContainer = document.querySelector(".edit-todo-cont")
        this.#editContainer.innerHTML = this.#editView.createEditEl()
    }

    createTodoEl(todo) {
        return `
            <ul id="${todo.id}" class="single-todo">
                <button type="button" class="btn-delete" name="delete">x</button>
                <li>title: ${todo.title}</li>
                <li>body: ${todo.body}</li>
                <li>isComplete: ${todo.isComplete}</li>
                <button type="button" class="btn btn-complete" name="complete">Complete</button>
            </ul>
            `;
    }
  
    initListener(options){
        $('.todos-cont').on('click', (e) => this.onTodoClick(e, options));
    }

    onTodoClick = (e, options) => {
        this.#options = options;
        if ($(e.target).hasClass('single-todo')) {
            this.#currentId = e.target.id;
            $('.single-todo').removeClass('single-todo-active');
            $(e.target).addClass('single-todo-active');
        } else  {
            this.#currentId = e.target.closest('.single-todo').id;
            $('.single-todo').removeClass('single-todo-active');
            $(e.target).parent('.single-todo').addClass('single-todo-active');
        }

        if(e.target.classList.contains('btn-delete')) {
            this.onTodoDelete(this.#options, this.#currentId);
        } else if(e.target.classList.contains('btn-complete')) {
            this.onTodoComplete(this.#options, this.#todos, this.#currentId); 
        } else {
            this.#editView.initListener(this.#options, this.#todos, this.#currentId);
            $('.edit-todo').removeClass('hidden');
        } 
    }

    onTodoDelete = (options) => {
        $('.edit-todo').addClass('hidden');
        options.onDelete(this.#currentId);
    }

    onTodoComplete = (options, todos, id) => {
        $('.edit-todo').addClass('hidden');
        const completedTodo = todos.find(element => element.id == id);
        completedTodo.isComplete = 'true';
        options.onEdit(id, completedTodo);
    }
}