import { debounce } from '../../module-1/debounce/index.js';

export default class Search {
    constructor() {

        this.initialize();
    }

    initialize() {
        this.render();
        this.getSubElements();
        this.addEventListeners();
    }

    
  initialize() {
    this.render();
    this.getSubElements();
    this.addEventListeners();
  }

  get template() {
    return `
      <form class="search-box">
        <input id="search-input" class="search-box__input" type="text" placeholder="Search" data-element="search">
      </form>
    `;
  }

  render() {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = this.template;
    this.element = wrapper.firstElementChild;
  }

  getSubElements() {
    const result = {};
    const elements = this.element.querySelectorAll('[data-element]');

    for (const subElement of elements) {
      const name = subElement.dataset.element;
      result[name] = subElement;
    }

    this.subElements = result;
  }

  dispatchEvent(searchString) {
    this.element.dispatchEvent(new CustomEvent('search-filter', {
      bubbles: true,
      detail: searchString
    }));
  }

  addEventListeners() {
    this.subElements.search.addEventListener('input', this.onKeyUp);
  }

  clear() {
    this.element.reset();
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    this.element = null;
    this.subElements = {};
  }
}
