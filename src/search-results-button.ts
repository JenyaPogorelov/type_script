import {renderSearchResultsBlock, renderEmptyOrErrorSearchBlock, SearchFormBlock} from './search-results.js';
import {SearchFormData} from "./interfaces.js";
import {dateToUnixStamp, timeOut} from './additional-functions.js';

// @ts-ignore
import {FlatRentSdk, addDays, cloneDate} from "./flat-rent-sdk.js";


export function renderSearchResult() {
  const button = document.getElementById('search-button');
  const maxPrice = document.getElementById('max-price');
  const today = new Date()
  const sdk = new FlatRentSdk()
  button.addEventListener('click', (event) => {
    event.preventDefault();
    // sdk.get('bvep12')
    //   .then((flat) => {
    //     console.log('flat by id', flat)
    //   })
    const cityForm: string = document.getElementById('city')["value"];
    const dateArrival: string = document.getElementById('check-in-date')["value"];
    const dateDeparture: string = document.getElementById('check-out-date')["value"];
    const maxPriceDay: number = +document.getElementById('max-price')["value"];
    if (!maxPrice['value']) {
      renderEmptyOrErrorSearchBlock('Введите максимальную цену суток!');
    } else if (maxPrice['value'] <= 0) {
      renderEmptyOrErrorSearchBlock('Цена должна быть больше ноля');
    } else if (isNaN(+maxPrice['value'])) {
      renderEmptyOrErrorSearchBlock('Цена должна быть числовой');
    } else {
      sdk.search({
        city: 'Санкт-Петербург',
        checkInDate: cloneDate(today),
        checkOutDate: addDays(cloneDate(today), 1)
      })
        .then((result) => {
          SearchFormBlock(result);
          // console.log('search for one night', result)
        })
      // timeOut('run');
      // search(
      //   "59.9386,30.3141",
      //   {city: cityForm, dateArrival: dateArrival, dateDeparture: dateDeparture, maxPriceDay: maxPriceDay},
      //   (error) => {
      //     if (error) {
      //       console.log(error)
      //     } else {
      //       console.log('Все ОК')
      //     }
      //   })
    }
  })
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
