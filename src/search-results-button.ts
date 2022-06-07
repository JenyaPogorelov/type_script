import {renderSearchResultsBlock, renderEmptyOrErrorSearchBlock, SearchFormBlock} from './search-results.js';
import {Place} from "./interfaces";

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
      search((error, data) => {
        if (error) {
          console.log(error)
        } else {
          console.log(data)
        }
      })
      renderSearchResultsBlock()
    }
  })
}

export function search(callback) {
  const cityForm: string = document.getElementById('city')["value"];
  const dateArrival: string = document.getElementById('check-in-date')["value"];
  const dateDeparture: string = document.getElementById('check-out-date')["value"];
  const maxPriceDay: number = +document.getElementById('max-price')["value"];
  // console.log((Math.random() * (1 - 0) + 0).toFixed());
  let result = SearchFormBlock({city: cityForm, dateArrival: dateArrival, dateDeparture: dateDeparture, maxPriceDay: maxPriceDay})
  setTimeout(() => {
    if ((Math.random() * (1 - 0) + 0).toFixed() === '1') {
      const res : Place = [];
      console.log(res)
    } else {
      console.log(new Error())
    }
  }, 1000)
}
