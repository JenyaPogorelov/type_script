import {renderSearchResultsBlock, renderEmptyOrErrorSearchBlock, SearchFormBlock} from './search-results.js';
import {SearchFormData} from "./interfaces.js";
import {dateToUnixStamp, timeOut} from './additional-functions.js';

// @ts-ignore
import {FlatRentSdk, addDays, cloneDate} from "./flat-rent-sdk.js";


export function renderSearchResult() {
  const button = document.getElementById('search-button');
  const maxPrice = document.getElementById('max-price');
  const city = document.getElementById('city');
  const checkInDate = document.getElementById('check-in-date');
  const checkOutDate = document.getElementById('check-out-date');
  if (button != null && city != null && checkInDate != null && checkOutDate != null && maxPrice != null) {
    const today = new Date()
    const sdk = new FlatRentSdk()
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const cityForm: string = city["value"];
      const dateArrival: string = checkInDate["value"];
      const dateDeparture: string = checkOutDate["value"];
      const maxPriceDay: number = +maxPrice["value"];
      const selectProviders = document.querySelectorAll('input[name="provider"]');
      const isBlock = document.querySelector('.results-list');
      isBlock ? isBlock.innerHTML = '' : ''
      // console.log(isBlock);
      // console.log(selectProviders)
      if (!maxPrice['value']) {
        renderEmptyOrErrorSearchBlock('Введите максимальную цену суток!');
      } else if (maxPrice['value'] <= 0) {
        renderEmptyOrErrorSearchBlock('Цена должна быть больше ноля');
      } else if (isNaN(+maxPrice['value'])) {
        renderEmptyOrErrorSearchBlock('Цена должна быть числовой');
      } else {
        timeOut('run');
        selectProviders.forEach(element => {
          if (element['checked'] && element['value'] === 'homy') {
            search(
              "59.9386,30.3141",
              {city: cityForm, dateArrival: dateArrival, dateDeparture: dateDeparture, maxPriceDay: maxPriceDay},
              (error) => {
                if (error) {
                  console.log(error)
                } else {
                  console.log('Все ОК')
                }
              })
          }
          if (element['checked'] && element['value'] === 'flat-rent') {
            sdk.search({
              city: 'Санкт-Петербург',
              checkInDate: addDays(cloneDate(new Date(dateArrival)), 0),
              checkOutDate: addDays(cloneDate(new Date(dateDeparture)), 0)
            })
              .then((result) => {
                SearchFormBlock(result);
              })
          }
        })
      }
    })
  }

}

// export function search(coordinates: string, checkInDate: number, checkOutDate: number, maxPrice: number, callback) {
export function search(coordinates: string, formData: SearchFormData, callback) {
  const dateArrival = dateToUnixStamp(new Date(formData.dateArrival))
  const dateDeparture = dateToUnixStamp(new Date(formData.dateDeparture))
  fetch(
    `http://127.0.0.1:3030/places?` +
    `coordinates=${coordinates}&` +
    `checkInDate=${dateArrival}&` +
    `checkOutDate=${dateDeparture}&` +
    `maxPrice=${formData.maxPriceDay}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    }
  )
    .then((response) => {
      return response.text()
    }).then((response) => {
    SearchFormBlock(JSON.parse(response))
  })
}
