import * as $ from 'jquery';
import './todo.header.css';

export default class TodoHeaderView {
    #options = null;

    constructor() {}

    renderHeader(container) {
      container.html(this.createHeaderEl());
    }

    createHeaderEl() {
        return `
            <input placeholder="todo title" id="title" type="text">
            <input placeholder="todo body" id="body" type="text">
            <button type="button" class="btn btn-add-todo">Add Todo</button>
            `;
    }

    initListener(options){
      $('.btn-add-todo').on('click', () => this.onTodoCreate(options));
    }

    onTodoCreate = (options) => {
        this.#options = options;

        const title = $('#title').val();
        const body = $('#body').val();

        if (title === '' || body === ''){
          alert('Enter info');
          return;
        } else {
          $('.edit-todo').addClass('hidden');
          this.#options.onCreate({title, body});
          $('#title').val('');
          $('#body').val('');
          return;
        }
    }
}