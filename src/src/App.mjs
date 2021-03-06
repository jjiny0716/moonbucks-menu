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
            <h1 class="text-center font-bold">π λ¬Έλ²μ€ λ©λ΄ κ΄λ¦¬</h1>
          </a>
          <nav class="d-flex justify-center flex-wrap">
            <a href="/espresso" data-category-name="espresso" class="cafe-category-name btn bg-white shadow mx-1" data-component-name="RouterLink" data-key="1">β μμ€νλ μ</a>
            <a href="/frappuccino" data-category-name="frappuccino" class="cafe-category-name btn bg-white shadow mx-1" data-component-name="RouterLink" data-key="2">π₯€ νλΌνΈμΉλΈ</a>
            <a href="/blended" data-category-name="blended" class="cafe-category-name btn bg-white shadow mx-1" data-component-name="RouterLink" data-key="3">πΉ λΈλ λλ</a>
            <a href="/teavana" data-category-name="teavana" class="cafe-category-name btn bg-white shadow mx-1" data-component-name="RouterLink" data-key="4">π« ν°λ°λ</a>
            <a href="/desert" data-category-name="desert" class="cafe-category-name btn bg-white shadow mx-1" data-component-name="RouterLink" data-key="5">π° λμ νΈ</a>
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
