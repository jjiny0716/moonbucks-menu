import Component from "./core/Component.mjs";
import ItemAppender from "./components/ItemAppender.mjs";
import Items from "./components/items.mjs";

export default class App extends Component {
  setup() {
    this.state = {
      items: ["아메리카노"],
    };
  }

  template() {
    const { items } = this.state;
    return `
    <div class="d-flex justify-center mt-5 w-100">
      <div class="w-100">
        <header class="my-4">
          <a href="/" class="text-black">
            <h1 class="text-center font-bold">🌝 문벅스 메뉴 관리</h1>
          </a>
          <nav class="d-flex justify-center flex-wrap">
            <button data-category-name="espresso" class="cafe-category-name btn bg-white shadow mx-1">☕ 에스프레소</button>
            <button data-category-name="frappuccino" class="cafe-category-name btn bg-white shadow mx-1">🥤 프라푸치노</button>
            <button data-category-name="blended" class="cafe-category-name btn bg-white shadow mx-1">🍹 블렌디드</button>
            <button data-category-name="teavana" class="cafe-category-name btn bg-white shadow mx-1">🫖 티바나</button>
            <button data-category-name="desert" class="cafe-category-name btn bg-white shadow mx-1">🍰 디저트</button>
          </nav>
        </header>
        <main class="mt-10 d-flex justify-center">
          <div class="wrapper bg-white p-10">
            <div class="heading d-flex justify-between">
              <h2 class="mt-1">☕ 에스프레소 메뉴 관리</h2>
              <span class="mr-2 mt-4 menu-count">총 ${items.length}개</span>
            </div>
            <form id="espresso-menu-form" data-component-name="ItemAppender" data-key="1"></form>
            <ul id="espresso-menu-list" class="mt-3 pl-0" data-component-name="Items" data-key="2"></ul>
          </div>
        </main>
      </div>
    </div>
    `;
  }

  generateChildComponent(name) {
    const { addItem, editItem, removeItem } = this;
    const { items } = this.state;
    if (name === "Items") {
      return new Items(this.target.querySelector("#espresso-menu-list"), () => {
        return {
          items,
          editItem: editItem.bind(this),
          removeItem: removeItem.bind(this),
        };
      });
    } else if (name === "ItemAppender") {
      return new ItemAppender(this.target.querySelector("#espresso-menu-form"), () => {
        return {
          addItem: addItem.bind(this),
        };
      });
    }
  }

  addItem(newItemName) {
    if (!newItemName) {
      alert("값을 입력해주세요");
      return;
    }

    const { items } = this.state;
    items.push(newItemName);
    this.setState({ items });
  }

  editItem(index) {
    const { items } = this.state;
    const newName = prompt("메뉴명을 수정하세요", items[index]);
    items[index] = newName;
    this.setState({ items });
  }

  removeItem(index) {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    const { items } = this.state;
    items.splice(index, 1);
    this.setState({ items });
  }
}
