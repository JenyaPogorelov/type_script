import {renderSearchResultsBlock, renderEmptyOrErrorSearchBlock} from './search-results.js';

export function renderSearchResult() {
  const button = document.getElementById('search-button');
  const maxPrice = document.getElementById('max-price');
  button.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(maxPrice)
    // @ts-ignore
    if (!maxPrice.value) {
      renderEmptyOrErrorSearchBlock('Введите максимальную цену суток!')
    } else {
      renderSearchResultsBlock()
    }
  })
}
