import Component from "../core/Component.mjs";
import ItemAppender from "../components/ItemAppender.mjs";
import Items from "../components/items.mjs";

export default class Menu extends Component {
  setup() {
    const { englishMenuName } = this.props;
    const items = JSON.parse(localStorage.getItem(`${englishMenuName}-menu-items`)) ?? [] 
    this.state = {
      items,
    };
  }

  template() {
    const { title, englishMenuName } = this.props;
    const { items } = this.state;
    return `
    <main class="mt-10 d-flex justify-center">
      <div class="wrapper bg-white p-10">
        <div class="heading d-flex justify-between">
          <h2 class="mt-1">${title}</h2>
          <span class="mr-2 mt-4 menu-count">총 ${items.length}개</span>
        </div>
        <form id="${englishMenuName}-menu-form" data-component-name="ItemAppender" data-key="1"></form>
        <ul id="${englishMenuName}-menu-list" class="mt-3 pl-0" data-component-name="Items" data-key="2"></ul>
      </div>
    </main>
    `;
  }

  generateChildComponent(name) {
    const { editItem, removeItem, toggleItemSoldOut, addItem } = this;
    const { englishMenuName } = this.props;
    const { items } = this.state;
    if (name === "Items") {
      return new Items(this.target.querySelector(`#${englishMenuName}-menu-list`), () => {
        return {
          items,
          editItem: editItem.bind(this),
          removeItem: removeItem.bind(this),
          toggleItemSoldOut: toggleItemSoldOut.bind(this),
        };
      });
    } else if (name === "ItemAppender") {
      return new ItemAppender(this.target.querySelector(`#${englishMenuName}-menu-form`), () => {
        return {
          englishMenuName,
          addItem: addItem.bind(this),
        };
      });
    }
  }

  afterUpdate() {
    const { englishMenuName } = this.props;
    const { items } = this.state
    localStorage.setItem(`${englishMenuName}-menu-items`, JSON.stringify(items));
  }

  addItem(newItemName) {
    if (!newItemName) {
      alert("값을 입력해주세요");
      return;
    }

    const { items } = this.state;
    items.push({ name: newItemName, soldOut: false});
    this.setState({ items });
  }

  editItem(index) {
    const { items } = this.state;
    const newName = prompt("메뉴명을 수정하세요", items[index].name);
    items[index].name = newName;
    this.setState({ items });
  }

  removeItem(index) {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    const { items } = this.state;
    items.splice(index, 1);
    this.setState({ items });
  }

  toggleItemSoldOut(index) {
    const { items } = this.state;
    items[index].soldOut = !items[index].soldOut;
    this.setState({ items });
  }
}
