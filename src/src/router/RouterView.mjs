import Component from '../core/Component.mjs';
import { router } from './index.mjs';
import Menu from '../pages/Menu.mjs';

export default class RouterView extends Component {
  setup() {
    router.addUpdateListener(this.updateCategory.bind(this));
    this.state = {
      currentCategory: router.route(),
    }
  }

  template() {
    const { currentCategory } = this.state;
    return `
    <div class=${currentCategory} data-component-name=${currentCategory} data-key="${currentCategory}" ></div>
    `;
  }

  generateChildComponent(name, key) {
    let { currentCategory } = this.state;
    currentCategory = currentCategory.toLowerCase();
    if (name === "Espresso") {
      return new Menu(this.target.querySelector(`[data-key="${key}"]`), () => {
        return {
          title: "☕ 에스프레소 메뉴 관리",
          category: currentCategory,
        };
      });
    }
    else if (name === "Frappuccino") {
      return new Menu(this.target.querySelector(`[data-key="${key}"]`), () => {
        return {
          title: "🥤 프라푸치노 메뉴 관리",
          category: currentCategory,
        };
      });
    }
    else if (name === "Blended") {
      return new Menu(this.target.querySelector(`[data-key="${key}"]`), () => {
        return {
          title: "🍹 블렌디드 메뉴 관리",
          category: currentCategory,
        };
      });
    }
    else if (name === "Teavana") {
      return new Menu(this.target.querySelector(`[data-key="${key}"]`), () => {
        return {
          title: "🫖 티바나 메뉴 관리",
          category: currentCategory,
        };
      });
    }
    else if (name === "Desert") {
      return new Menu(this.target.querySelector(`[data-key="${key}"]`), () => {
        return {
          title: "🍰 디저트 메뉴 관리",
          category: currentCategory,
        };
      });
    }
  }

  updateCategory() {
    this.setState({ currentCategory: router.route() });
  }
}