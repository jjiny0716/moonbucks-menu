import Component from "../core/Component.mjs";

export default class ItemAppender extends Component {
  template() {
    return `
    <div class="d-flex w-100">
      <label for="menu-name" class="input-label" hidden>메뉴 이름</label>
      <input
        type="text"
        id="menu-name"
        name="MenuName"
        class="input-field"
        placeholder="메뉴 이름"
        autocomplete="off"
      />
      <button type="button" name="submit" id="menu-submit-button" class="input-submit bg-green-600 ml-2">확인</button>
    </div>
    `;
  }

  setEvents() {
    const { englishMenuName, addItem } = this.props;
    const inputField = this.target.querySelector("#menu-name");

    this.addEventListener("submit", `#${englishMenuName}-menu-form`, (e) => {
      e.preventDefault();
    });
    this.addEventListener("keydown", "#menu-name", (e) => {
      if (e.key !== "Enter") return;
      addItem(inputField.value);
      inputField.value = "";
    });
    this.addEventListener("click", "#menu-submit-button", () => {
      addItem(inputField.value);
      inputField.value = "";
    });
  }

  afterMount() {
    this.target.querySelector("#menu-name").focus();
  }
}
