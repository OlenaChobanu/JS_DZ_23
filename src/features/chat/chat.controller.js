import ChatModel from "./chat.model";

export default class ChatController {
    #view = null;
    #model = null;

    constructor(view){
        this.#model = new ChatModel(this)
        this.#view = view;

        this.getUsers();
    }

    getUsers(){
        this.#model.getUsers().then((r) => this.#view.renderUser(r));
    }
}  