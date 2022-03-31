import Component from "../core/Component.mjs";

export default class ItemAppender extends Component {
  template() {
    return `
    <div class="d-flex w-100">
      <label for="espresso-menu-name" class="input-label" hidden> 에스프레소 메뉴 이름 </label>
      <input
        type="text"
        id="espresso-menu-name"
        name="espressoMenuName"
        class="input-field"
        placeholder="에스프레소 메뉴 이름"
        autocomplete="off"
      />
      <button type="button" name="submit" id="espresso-menu-submit-button" class="input-submit bg-green-600 ml-2">확인</button>
    </div>
    `;
  }

  setEvents() {
    const { addItem } = this.props;
    const inputField = this.target.querySelector("#espresso-menu-name");

    this.addEventListener("submit", "#espresso-menu-form", (e) => {
      e.preventDefault();
    });
    this.addEventListener("keydown", "#espresso-menu-name", (e) => {
      if (e.key !== "Enter") return;
      addItem(inputField.value);
      inputField.value = "";
    });
    this.addEventListener("click", "#espresso-menu-submit-button", () => {
      addItem(inputField.value);
      inputField.value = "";
    });
  }

  afterMount() {
    this.target.querySelector("#espresso-menu-name").focus();
  }
}
