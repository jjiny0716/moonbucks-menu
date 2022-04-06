import Component from "./core/Component.mjs";
import RouterView from './router/RouterView.mjs';
import RouterLink from './router/RouterLink.mjs';

export default class App extends Component {
  setup() {
    this.baseURL = location.pathname.replace(/^\/?/, '/').replace(/\/$/, '');
  }

  template() {
    return `
    <div class="d-flex justify-center mt-5 w-100">
      <div class="w-100">
        <header class="my-4">
          <a href="/" class="text-black">
            <h1 class="text-center font-bold">🌝 문벅스 메뉴 관리</h1>
          </a>
          <nav class="d-flex justify-center flex-wrap">
            <a href="/espresso" data-category-name="espresso" class="cafe-category-name btn bg-white shadow mx-1" data-component-name="RouterLink" data-key="1">☕ 에스프레소</a>
            <a href="/frappuccino" data-category-name="frappuccino" class="cafe-category-name btn bg-white shadow mx-1" data-component-name="RouterLink" data-key="2">🥤 프라푸치노</a>
            <a href="/blended" data-category-name="blended" class="cafe-category-name btn bg-white shadow mx-1" data-component-name="RouterLink" data-key="3">🍹 블렌디드</a>
            <a href="/teavana" data-category-name="teavana" class="cafe-category-name btn bg-white shadow mx-1" data-component-name="RouterLink" data-key="4">🫖 티바나</a>
            <a href="/desert" data-category-name="desert" class="cafe-category-name btn bg-white shadow mx-1" data-component-name="RouterLink" data-key="5">🍰 디저트</a>
          </nav>
        </header>
        <div data-component-name="RouterView" data-key="RouterView" ></div>
      </div>
    </div>
    `;
  }

  generateChildComponent(name, key) {
    if (name === "RouterView") {
      return new RouterView(document.querySelector('[data-component-name="RouterView"]'));
    }
    else if (name === "RouterLink") {
      return new RouterLink(document.querySelector(`[data-key="${key}"]`));
    }
  }
}
