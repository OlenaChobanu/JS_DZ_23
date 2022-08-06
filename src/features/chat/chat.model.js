export default class ChatModel {
  #controller = null;
  
  #user = [
    {
      id: 1,
      name: "Vasya",
    },
    {
      id: 1,
      name: "Bob",
    },
    {
      id: 1,
      name: "Ivan",
    },
  ];

  constructor(controller) {
    this.#controller = controller;
  }

  getUsers() {
    return Promise.resolve(this.#user);
  }
}