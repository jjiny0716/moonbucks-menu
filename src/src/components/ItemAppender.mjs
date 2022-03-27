import Component from '../core/Component.mjs';

export default class ItemAppender extends Component {
  markup() {
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
    `
  }

  setEvents() {
    const { addItem } = this.props;
    const inputField = this.target.querySelector("#espresso-menu-name");

    this.addEventListener("keydown", "#espresso-menu-name", (e) => {
      if (e.key !== "Enter") return;
      // e.preventDefault()가 위로 올라가면 키 입력이 안된다!
      e.preventDefault();
      addItem(inputField.value);
    })
    this.addEventListener("click", "#espresso-menu-submit-button", () => addItem(inputField.value))
  }

  afterMount() {
    this.target.querySelector("#espresso-menu-name").focus();
  }
}