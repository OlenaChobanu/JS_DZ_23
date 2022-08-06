import "./header.css";

export class HeaderView {
  #menu = [
    {
      title: "Main",
      link: "main",
    },
    {
      title: "Users",
      link: "users",
    },
    {
      title: "Chat",
      link: "chat",
    },
  ];

  #options = null;
  constructor(options) {
    this.#options = options;
  }

  createHeaderElement() {
    return {
      element: `
        <div class="header-container">
            ${this.createMenu()}
        </div>
        `,
      cb: this.setListener,
    };
  }

  createMenu() {
    return `
    <ul class="menu-container">
        ${this.#menu.map(this.createMenuItem).join("")}
    </ul>
    `;
  }

  setListener = () => {
    document.querySelector('.menu-container').addEventListener("click", (e) => this.onMenuItemClick(e));
  };

  createMenuItem(item) {
    return `<li class="menu-item" name="${item.link}"><a>${item.title}</a></li>`;
  }

  onMenuItemClick(e) {
    const item = e.target.closest(".menu-item");
    this.#options.cb(item.getAttribute("name"));
    console.log(item.getAttribute("name"))
  }
}