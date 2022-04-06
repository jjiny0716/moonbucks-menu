import Component from '../core/Component.mjs';
import { router } from './index.mjs';

export default class RouterLink extends Component {
  template() {
    return this.target.innerHTML;
  }

  setEvents() {
    this.addEventListener("click", "a", (e) => {
      e.preventDefault();
      const target = e.target.closest("a");
      router.push(target.getAttribute("href"));
    })
  }
}