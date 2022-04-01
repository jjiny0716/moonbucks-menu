import Component from "./core/Component.mjs";
import Menu from "./pages/Menu.mjs";

export default class App extends Component {
  setup() {
    this.state = {
      selectedMenuName: "espresso",
    };
  }

  template() {
    const { selectedMenuName } = this.state;
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
            <button data-category-name="dessert" class="cafe-category-name btn bg-white shadow mx-1">🍰 디저트</button>
          </nav>
        </header>
        <div class=${selectedMenuName} data-component-name=${selectedMenuName} data-key="${selectedMenuName}" ></div>
      </div>
    </div>
    `;
  }

  generateChildComponent(name, key) {
    const { selectedMenuName } = this.state;
    if (name === "espresso") {
      return new Menu(this.target.querySelector(`[data-key="${key}"]`), () => {
        return {
          title: "☕ 에스프레소 메뉴 관리",
          englishMenuName: selectedMenuName,
        };
      });
    }
    else if (name === "frappuccino") {
      return new Menu(this.target.querySelector(`[data-key="${key}"]`), () => {
        return {
          title: "🥤 프라푸치노 메뉴 관리",
          englishMenuName: selectedMenuName,
        };
      });
    }
    else if (name === "blended") {
      return new Menu(this.target.querySelector(`[data-key="${key}"]`), () => {
        return {
          title: "🍹 블렌디드 메뉴 관리",
          englishMenuName: selectedMenuName,
        };
      });
    }
    else if (name === "teavana") {
      return new Menu(this.target.querySelector(`[data-key="${key}"]`), () => {
        return {
          title: "🫖 티바나 메뉴 관리",
          englishMenuName: selectedMenuName,
        };
      });
    }
    else if (name === "dessert") {
      return new Menu(this.target.querySelector(`[data-key="${key}"]`), () => {
        return {
          title: "🍰 디저트 메뉴 관리",
          englishMenuName: selectedMenuName,
        };
      });
    }
  }

  setEvents() {
    this.addEventListener("click", ".cafe-category-name", (e) => {
      const selectedMenuName = e.target.dataset.categoryName;
      this.setState({ selectedMenuName });
    })
  }
}
