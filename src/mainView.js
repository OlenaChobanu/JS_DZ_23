import * as $ from 'jquery';
import ChatView from "./features/chat/chat.view";
import MainViewTodo from "./features/todo/todo.main.view";
import { HeaderView } from "./layout/header/header.view";
import "./style.css";

export default class MainView {
  #mainContainer = null;
  #headerView = null;

  #contentContainer = null;

  #todoView = null;
  #chatView = null;

  #mainLink = "main";

  #LINK_NAVIGATION = {
    main: null,
    users: null,
    chat: null,
  };

  constructor(cont) {
    this.#mainContainer = cont;
    
    this.#headerView = new HeaderView({
      cb: this.onContentChange,
    });
    this.renderMainView();

    this.#headerView.createHeaderElement().cb();
    this.#contentContainer = $(".content-container");

    this.init(this.#mainLink);
    this.renderContent(this.#mainLink);
  }

  renderMainView() {
    this.#mainContainer.innerHTML = `
        <div class="main-container">
        ${this.#headerView.createHeaderElement().element}
            <div class="content-container"></div>
            <div class="footer">
                This is footer
            </div>
        </div>
    `;
  }

  renderContent(link) {
    this.#contentContainer.html(this.#LINK_NAVIGATION[link]());
  }

  init(link){
    if(link == 'main'){
      this.#todoView = new MainViewTodo();
      this.#LINK_NAVIGATION.main = this.#todoView.createTodoView;
    }

    if(link == 'chat'){
      this.#chatView = new ChatView();
      this.#LINK_NAVIGATION.chat = this.#chatView.createChatView;
    }
  }

  onContentChange = (link) => {
    this.init(link);
    this.renderContent(link);

  }
}