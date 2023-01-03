class SearchView {
  _parentElement = document.querySelector('.search');

  getQuery() {
    const query = this._parentElement.elements.search.value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentElement.elements.search.value = '';
  }

  addHandleSearch(handler) {
    this._parentElement.addEventListener('submit', e => {
      e.preventDefault();
      handler();
    });
  }
}
export default new SearchView();
