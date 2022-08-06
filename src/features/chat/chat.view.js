import * as $ from 'jquery';
import ChatController from "./chat.controller";
import "./chat.css";

export default class ChatView {
  constructor() {
    new ChatController(this);
  }

  createChatView() {
    return `
    <div class="chat-container">
    <div class="chat-users-container">users</div>
    <div class="chat-content-container">
      <div class="chat-message-container">messages</div>
      <div class="chat-action-container">
        <input type="text" class="chat-input">
        <button class="chat-send">Send msg</button>
      </div>
    </div>
  </div>
      `;
  }
  
  renderUser =(users) => {
    $(".chat-users-container").html(this.createUsers(users));
    this.setListeners();
  }

  createUsers(users) {
    return users.map(this.createUserEl).join("");
  }

  createUserEl(u) {
    return `
        <div class="chat-user">
            ${u.name}
        </div>
    `;
  }

  setListeners() {
    document.querySelector(".chat-users-container").addEventListener("click", this.onUserClick);
    document.querySelector(".chat-send").addEventListener("click", this.onSend);
  }
  
  onUserClick = () => {};
  onSend = () => {};
}
