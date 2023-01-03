import View from './View';
import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerCkick(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    //   1page and other
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupNextBtn(curPage);
    }
    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupPrewBtn(curPage);
    }
    // Other page
    if (curPage < numPages && curPage !== 1) {
      return [
        this._generateMarkupPrewBtn(curPage),
        this._generateMarkupNextBtn(curPage),
      ];
    }
    // 1 and NO other
    return '';
  }

  _generateMarkupPrewBtn(curPage) {
    return `
    <button data-goto="${
      curPage - 1
    }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
    </button>`;
  }

  _generateMarkupNextBtn(curPage) {
    return `
      <button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
  }
}

export default new PaginationView();
