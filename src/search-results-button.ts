import {renderSearchResultsBlock, renderEmptyOrErrorSearchBlock, SearchFormBlock} from './search-results.js';
import {Place} from "./interfaces";
import {dateToUnixStamp} from './additional-functions.js'

export function renderSearchResult() {
  const button = document.getElementById('search-button');
  const maxPrice = document.getElementById('max-price');
  button.addEventListener('click', (event) => {
    event.preventDefault();
    const dateArrival: string = document.getElementById('check-in-date')["value"];
    const dateDeparture: string = document.getElementById('check-out-date')["value"];
    const maxPriceDay: number = +document.getElementById('max-price')["value"];
    // console.log(maxPrice)
    // @ts-ignore
    if (!maxPrice.value) {
      renderEmptyOrErrorSearchBlock('Введите максимальную цену суток!')
    } else {
      search("59.9386,30.3141", dateToUnixStamp(new Date(dateArrival)), dateToUnixStamp(new Date(dateDeparture)), 100000, (error, data) => {
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

export function search(coordinates: string, checkInDate: number, checkOutDate: number, maxPrice: number, callback) {
  console.log(coordinates)
  console.log(checkInDate)
  console.log(checkOutDate)
  console.log(maxPrice)
  const cityForm: string = document.getElementById('city')["value"];
  const dateArrival: string = document.getElementById('check-in-date')["value"];
  const dateDeparture: string = document.getElementById('check-out-date')["value"];
  const maxPriceDay: number = +document.getElementById('max-price')["value"];
  // let result = SearchFormBlock({city: cityForm, dateArrival: dateArrival, dateDeparture: dateDeparture, maxPriceDay: maxPriceDay})
  // setTimeout(() => {
  //   if ((Math.random() * (1 - 0) + 0).toFixed() === '1') {
  //     const res : Place = [];
  //     console.log(res)
  //   } else {
  //     console.log(new Error())
  //   }
  // }, 1000)
  // let url = `http://localhost:3030/places?` +
  //   `checkInDate=${1623761668832}&` +
  //   `checkOutDate=${1623761668833}&` +
  //   `coordinates=59.9386,30.3141&` +
  //   `maxPrice=100000`
  // return responseToJson(fetch(url))

  console.log('dateArrival', dateToUnixStamp(new Date(dateArrival)))
  console.log('dateDeparture', dateToUnixStamp(new Date(dateDeparture)))

  fetch(
    `http://127.0.0.1:3030/places?coordinates=${coordinates}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&maxPrice=${maxPrice}`,
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
    console.log(JSON.parse(response))
    })
}
