export default class FiltersList {
  element;
 
  constructor({ title = "", list = [] } = {}) {
    this.title = title;
    this.list = list;
    this.render();
    this.addEventListeners();
  }

  render() {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = this.filterTemplate;
    this.element = wrapper.firstElementChild;
  }

  get filterTemplate() {
    return `
    <div class="aside__filter">
      <h2 class="aside__filter-name">${this.title}</h2>
      <div class="aside__filter-items filter" data-element="body">
      ${this.filtersListTemplate}
      </div>
    </div>`;
  }

  get filtersListTemplate() {
    const result = this.list.map(el => {
      return `
      <div class="filter__item">
        <label class="filter__item-text" for="${el.value}">
          <input class="filter__check" type="checkbox" name="filter-check"
              id="${el.value}" ${el.checked ? "checked" : ""} value = ${el.value}>${el.title}
        </label>
      </div>`;
    });

    return result.join("");
  }

  reset() {
    const inputs = document.querySelectorAll(".filter__check");
    inputs.forEach(el => {
      if (el.checked) el.checked = false;
    })
  }

  addEventListeners() {
    this.element.addEventListener("change", this.changeEvent)
  }

  changeEvent = (event) => {
    const eventName = event.target.checked ? "add-filter" : "remove-filter";
    console.log(eventName);

    let myEvent = new CustomEvent(eventName, {
      bubbles: true,
      detail: event.target.value
    });

    this.element.dispatchEvent(myEvent);
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = null;
  }
}