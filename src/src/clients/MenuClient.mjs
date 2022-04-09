export default class MenuClient {
  #BASE_URL;
  constructor() {
    this.#BASE_URL = "http://localhost:3000";
  }

  async request(url, method, body) {
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });
      if (!response.ok) {
        if (response.status === 400) throw new Error("올바르지 않은 입력입니다."); 
        throw new Error("오류가 발생했습니다.");
      }
      return response;
    } catch(e) {
      alert(e.message);
    }
  }

  async storeMenu(menuName, category) {
    const requestURL = `${this.#BASE_URL}/api/category/${category}/menu`;
    const response = await this.request(requestURL, "POST", JSON.stringify({ name: menuName })).then((response) => response.json());
    return response;
  }

  async getMenuByCetegory(category) {
    const requestURL = `${this.#BASE_URL}/api/category/${category}/menu`;
    const response = await this.request(requestURL, "GET").then((response) => response.json());
    return response;
  }

  async editMenuName(menuName, category, menuId) {
    const requestURL = `${this.#BASE_URL}/api/category/${category}/menu/${menuId}`;
    const response = await this.request(requestURL, "PUT", JSON.stringify({ name: menuName })).then((response) => response.json());
    return response;
  }

  async toggleItemSoldOut(category, menuId) {
    const requestURL = `${this.#BASE_URL}/api/category/${category}/menu/${menuId}/soldout`;
    const response = await this.request(requestURL, "PUT").then((response) => response.json());
    return response;
  }

  async removeItem(category, menuId) {
    const requestURL = `${this.#BASE_URL}/api/category/${category}/menu/${menuId}`;
    await this.request(requestURL, "DELETE");
  }
}
