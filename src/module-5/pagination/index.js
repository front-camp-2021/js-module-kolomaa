export default class Pagination {
  element;
  start = 0;
  pageIndex = 0;

  constructor({
    totalPages = 10,
    page = 1,
  } = {}) {
    this.totalPages = totalPages;
    this.pageIndex = page - 1;

    this.initialize();
  }

  initialize() {
    this.render();
    this.getSubElements();
    this.addEventListeners();
    this.update();
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

  get template() {
    return `
    <nav class="pagination__content">
    <div class="pagination__prev">
    <a class="page__prev-link" href="#" data-element="nav-prev">
        <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.09959 13L1.07361 7L7.09959 1" stroke="black" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    </a>
    </div>

    <div class= "pagination"
      <ul class="pagination__list" data-element="pagination">

      </ul>
    </div>
      <div class="pagination__next">
      <a class="pagination__next-link" href="#" data-element="nav-next">
          <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.93566 1L7.96164 7L1.93566 13" stroke="black" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round" />
          </svg>
      </a>
  </div>
    </nav>
    `;
  }

  goToPrevPage() {
    if (this.pageIndex - 1 >= 0) {
      this.dispatchEvent(this.pageIndex - 1);
    }
  }

  goToNextPage() {
    if (this.pageIndex + 1 < this.totalPages) {
      this.dispatchEvent(this.pageIndex + 1);
    }
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.template;
    this.element = element.firstElementChild;
  }

  addEventListeners() {
    this.element.addEventListener('pointerdown', event => {
      const navElement = event.target.closest('[data-element^="nav-"]');

      if (navElement) {
        const type = navElement.dataset.element;

        if (type === 'nav-prev') {
          this.goToPrevPage();
        }

        if (type === 'nav-next') {
          this.goToNextPage();
        }
      }
    });
    this.element.addEventListener('pointerdown', event => {
      const pageIndex = parseInt(event.target.dataset.pageIndex, 10);

      if (!isNaN(pageIndex) && this.pageIndex !== pageIndex) {
        this.pageIndex = pageIndex;
        this.dispatchEvent(pageIndex);
      }
    });
    document.addEventListener('page-changed', this.onPageChanged);
  }

  update({
    totalPages = this.totalPages,
    page = this.pageIndex + 1
  } = {}) {
    this.totalPages = totalPages;
    this.pageIndex = page - 1;

    if (this.totalPages < 1) {
      this.subElements.pagination.innerHTML = 'No pagination';
      return;
    }

    this.subElements.pagination.innerHTML = this.getPages();
  }

  getPages() {
    const pages = new Array(this.totalPages).fill(true);
    return pages.map((item, index) => {
      const isActive = index === this.pageIndex ? 'active' : '';
      return `<li class="pagination__item pagination__item--${isActive}"">
        <a class="pagination__link" href="#" data-element="page-link"  data-page-index="${index}">${index + 1}</a>
      </li>`;
    }).join('');
  }

  dispatchEvent(pageIndex) {
    this.element.dispatchEvent(new CustomEvent('page-changed', {
      bubbles: true,
      detail: pageIndex
    }));
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    document.removeEventListener('page-changed', this.onPageChanged);
  }
}
