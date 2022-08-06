import TodoHeaderView from "./todo.header/todo.header.view";
import TodoController from "./todo.controller";
import TodoListView from "./todo.list/todo.list.view";
import '../todo/todo.main.css';
import $ from 'jquery';

export default class MainViewTodo {
    // #options = null;
    // #todos = [];

    #headerContainer = null;
    #listContainer = null;
    
    #listView = null;
    #headerView = null;

    constructor(){
        new TodoController(this);

        this.createTodoView();

        this.#headerView = new TodoHeaderView();
        this.#listView = new TodoListView();
    }
   
    createTodoView() {
      return `
              <div class="wrapper">
                  <div class="header"></div>
                  <div class="todos-container">
                      <div class="todos-cont"></div>
                      <div class="edit-todo-cont"></div>
                  </div>
              </div>`;
    }

    renderTodos =(todos, options) => {
		this.initContainers();

		this.renderHeader();
		this.renderTodoList(todos);

		this.initListeners(options)
    }

    initContainers(){
		this.#headerContainer = $(".header");
		this.#listContainer = $(".todos-cont");
    }

    renderHeader(){
        this.#headerView.renderHeader(this.#headerContainer);
    }

    renderTodoList(todos){
		this.#listContainer.html(this.#listView.renderTodos(todos));
		this.ifTodoCompleted(todos);
    }
    
    initListeners(options){
		this.#headerView.initListener(options);
		this.#listView.initListener(options);
    }

    ifTodoCompleted(todos) {
		let currentData = getCurrentDate(); 

		function getCurrentDate() {
			let current = new Date();
			let year = current.getFullYear();
			let month = current.getMonth() + 1;
			if (month < 10) month = '0' + month;
			let date = current.getDate();
			if (date < 10) date = '0' + date;
			return date +'.'+ month +'.'+ year;
      }

		todos.forEach(e => {
			e.isComplete === true ? (
				$(`#${e.id}`).addClass('completed-todo'), 
				$(`#${e.id}`).append(`<li>completeDate: ${currentData}</li>`),
				$(`#${e.id}`).children('.btn-complete').addClass('hidden')) 
				: $(`#${e.id}`).addClass('')})
  }
}