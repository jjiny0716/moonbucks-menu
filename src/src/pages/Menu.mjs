import Component from "../core/Component.mjs";
import MenuClient from '../clients/MenuClient.mjs';
import ItemAppender from "../components/ItemAppender.mjs";
import Items from "../components/items.mjs";

export default class Menu extends Component {
  setup() {
    this.menuClient = new MenuClient();
    this.state = {
      items: [],
    };
    this.loadItems();
  }

  async loadItems() {
    const { category } = this.props;
    const items = await this.menuClient.getMenuByCetegory(category);
    this.setState({ items });
  }

  template() {
    const { title, category } = this.props;
    const { items } = this.state;
    return `
    <main class="mt-10 d-flex justify-center">
      <div class="wrapper bg-white p-10">
        <div class="heading d-flex justify-between">
          <h2 class="mt-1">${title}</h2>
          <span class="mr-2 mt-4 menu-count">총 ${items.length}개</span>
        </div>
        <form id="${category}-menu-form" data-component-name="ItemAppender" data-key="1"></form>
        <ul id="${category}-menu-list" class="mt-3 pl-0" data-component-name="Items" data-key="2"></ul>
      </div>
    </main>
    `;
  }

  generateChildComponent(name) {
    const { editItem, removeItem, toggleItemSoldOut, addItem } = this;
    const { category } = this.props;
    if (name === "Items") {
      return new Items(this.target.querySelector(`#${category}-menu-list`), () => {
        const { items } = this.state;
        return {
          items,
          editItem: editItem.bind(this),
          removeItem: removeItem.bind(this),
          toggleItemSoldOut: toggleItemSoldOut.bind(this),
        };
      });
    } else if (name === "ItemAppender") {
      return new ItemAppender(this.target.querySelector(`#${category}-menu-form`), () => {
        return {
          category,
          addItem: addItem.bind(this),
        };
      });
    }
  }

  async addItem(newItemName) {
    if (!newItemName) {
      alert("값을 입력해주세요");
      return;
    }

    const { category } = this.props;
    const { items } = this.state;
    if (items.find(({name}) => name === newItemName)) {
      alert("이미 있는 메뉴입니다!");
      return;
    }
    const item = await this.menuClient.storeMenu(newItemName, category);

    items.push(item);
    this.setState({ items });
  }

  async editItem(index) {
    const { category } = this.props;
    const { items } = this.state;
    const newName = prompt("메뉴명을 수정하세요", items[index].name);
    const updatedItem = await this.menuClient.editMenuName(newName, category, items[index].id);
    items[index] = updatedItem;
    this.setState({ items });
  }

  removeItem(index) {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    const { category } = this.props;
    const { items } = this.state;
    const { id: menuId } = items.splice(index, 1)[0];
    this.setState({ items });
    this.menuClient.removeItem(category, menuId);
  }

  async toggleItemSoldOut(index) {
    const { category } = this.props;
    const { items } = this.state;
    const updatedItem = await this.menuClient.toggleItemSoldOut(category, items[index].id);
    items[index] = updatedItem;
    this.setState({ items });
  }
}
