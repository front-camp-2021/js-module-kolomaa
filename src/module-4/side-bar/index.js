import FiltersList from '../filters-list/index.js';

export default class SideBar {
  element;
  objectOfFilters;

  constructor (categoriesFilter = [], brandFilter = []) {
    this.categoriesFilter = categoriesFilter;
    this.brandFilter = brandFilter;

    this.render();
    this.createObjectOfFilters();
    this.insertFiltersToSideBar();
    this.addEventListeners();
  }

  createObjectOfFilters() {
    const categoryList = new FiltersList({
      title: 'Category',
      list: this.categoriesFilter
    });

    const brandList = new FiltersList({
      title: 'Brand',
      list: this.brandFilter
    });

    this.objectOfFilters = {
      categoryList, 
      brandList,
    };
  }

  addEventListeners() {
    const clearFilters = this.element.querySelector(".aside__btn");
    clearFilters.addEventListener('pointerdown', () => {
      Object.keys(this.objectOfFilters).forEach((el) => {
        const element = this.objectOfFilters[el];
        element.render();
      });

      this.element.dispatchEvent(new CustomEvent('clear-filters', {
        bubbles: true
      }));
    });
  }
  
  get sideBarTemplate() {
    return `
    <aside class="aside">
      <div class="aside__wrapper">
        <div class="aside__filters">

        </div>
      </div>
      <button class="aside__btn">CLEAR ALL FILTERS</button>
    </aside>`;
  }

  insertFiltersToSideBar() {
    const filter = this.element.querySelector('.aside__filters');

    Object.keys(this.objectOfFilters).forEach((el) => {
      const {element} = this.objectOfFilters[el];

      if (element) {
        filter.append(element);
      }
    });
  }


  render() {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = this.sideBarTemplate;
    this.element = wrapper.firstElementChild;
  }

  addEventListeners() {

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




