import {renderSearchResultsBlock, renderEmptyOrErrorSearchBlock} from "./search-results.js";

export function renderSearchResult() {
  let button = document.getElementById('search-button');
  let maxPrice = document.getElementById('max-price');
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
