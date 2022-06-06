import {renderSearchResultsBlock, renderEmptyOrErrorSearchBlock, SearchFormBlock} from './search-results.js';

export function renderSearchResult() {
  const button = document.getElementById('search-button');
  const maxPrice = document.getElementById('max-price');
  button.addEventListener('click', (e) => {
    e.preventDefault();
    // console.log(maxPrice)
    // @ts-ignore
    if (!maxPrice.value) {
      renderEmptyOrErrorSearchBlock('Введите максимальную цену суток!')
    } else {
      search()
      renderSearchResultsBlock()
    }
  })
}

export function search() {

  const cityForm: string = document.getElementById('city')["value"];
  const dateArrival: string = document.getElementById('check-in-date')["value"];
  const dateDeparture: string = document.getElementById('check-out-date')["value"];
  const maxPriceDay: number = +document.getElementById('max-price')["value"];

  SearchFormBlock({city: cityForm, dateArrival: dateArrival, dateDeparture: dateDeparture, maxPriceDay: maxPriceDay});
}
