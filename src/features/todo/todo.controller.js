import TodoModel from "./todo.model";

export default class TodoController {
    #view = null;
    #model = null;

    constructor(view){
        this.#model = new TodoModel(this);
        this.#view = view;
        this.getTodos();
    }

    getTodos(){
        this.#model.getTodos().then((r) => this.#view.renderTodos(r,  {
            onCreate: this.onCreateTodo,
            onDelete: this.onDeleteTodo,
            onEdit: this.onEditTodo,
        }));
    }

    onCreateTodo = (todo) => {
        this.#model.createTodo(todo).then(r => this.getTodos());
    }

    onDeleteTodo = (id) => {
        this.#model.deleteTodo(id).then(r => this.getTodos());
    }

    onEditTodo = (id, todo) => {
        this.#model.editTodo(id, todo).then(r => this.getTodos());
    }
}