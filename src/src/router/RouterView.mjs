import Component from '../core/Component.mjs';
import { router } from './index.mjs';
import Menu from '../pages/Menu.mjs';

export default class RouterView extends Component {
  setup() {
    this.state = {
      currentCategory: router.route,
    }
  }

  template() {
    const { route } = router; 
    if (!route) return `
      <p>페이지를 찾을 수 없습니다.</p>
    `

    return `
    <div data-component-name=${route} data-key="${route}" ></div>
    `;
  }

  generateChildComponent(name, key) {
    if (name === "Espresso") {
      return new Menu(this.target.querySelector(`[data-key="${key}"]`), () => {
        return {
          title: "☕ 에스프레소 메뉴 관리",
          category: "espresso",
        };
      });
    }
    else if (name === "Frappuccino") {
      return new Menu(this.target.querySelector(`[data-key="${key}"]`), () => {
        return {
          title: "🥤 프라푸치노 메뉴 관리",
          category: "frappuccino",
        };
      });
    }
    else if (name === "Blended") {
      return new Menu(this.target.querySelector(`[data-key="${key}"]`), () => {
        return {
          title: "🍹 블렌디드 메뉴 관리",
          category: "blended",
        };
      });
    }
    else if (name === "Teavana") {
      return new Menu(this.target.querySelector(`[data-key="${key}"]`), () => {
        return {
          title: "🫖 티바나 메뉴 관리",
          category: "teavana",
        };
      });
    }
    else if (name === "Desert") {
      return new Menu(this.target.querySelector(`[data-key="${key}"]`), () => {
        return {
          title: "🍰 디저트 메뉴 관리",
          category: "desert",
        };
      });
    }
  }
}