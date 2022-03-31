import Component from "../core/Component.mjs";

export default class Items extends Component {
  template() {
    const { items } = this.props;
    return `
    ${items.map((item, index) => `
    <li class="menu-list-item d-flex items-center py-2" data-index="${index}">
      <span class="w-100 pl-2 menu-name">${item}</span>
      <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button">수정</button>
      <button type="button" class="bg-gray-50 text-gray-500 text-sm menu-remove-button">삭제</button>
    </li>
    `).join("")}
    `;
  }

  setEvents() {
    const { editItem, removeItem } = this.props;
    this.addEventListener("click", ".menu-edit-button", (e) => {editItem(Number(e.target.closest("[data-index]").dataset.index))});
    this.addEventListener("click", ".menu-remove-button", (e) => {removeItem(Number(e.target.closest("[data-index]").dataset.index))});
  }
}
