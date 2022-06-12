import {renderToast} from "./lib.js";
import {FormDate, Place, SearchFormData} from "./interfaces.js";
import {dateToUnixStamp} from "./additional-functions.js";

export function booking() {
  const blockResult = document.getElementsByClassName('result');
  for (let i = 0; blockResult.length > i; i++) {
    const buttonForm = blockResult[i].querySelector('button');
    const favID: number = +blockResult[i].querySelector('.result-container').id;
    const dateArrival: string = document.getElementById('check-in-date')["value"];
    const dateDeparture: string = document.getElementById('check-out-date')["value"];
    buttonForm
      .addEventListener('click', (event) => {
        const resultBooking = bookPlace(favID, {dateArrival: dateArrival, dateDeparture: dateDeparture})
        resultBooking.then((response) => {
          // console.log(response['id'])
          // console.log(JSON.parse(response))
          if (response['id']) {
            const data = response;
            renderToast(
              {text: `Отель забранирован на ${dateArrival}`, type: 'success'},
              {name: 'Понял', handler: () => {console.log('Уведомление закрыто')}}
            )
          } else {
            renderToast(
              {text: `Ошибка бронирования`, type: 'error'},
              {name: 'Понял', handler: () => {console.log('Уведомление закрыто')}}
            )
          }
          // renderToast(
          //   {text: 'Это пример уведомления. Используйте его при необходимости', type: 'success'},
          //   {name: 'Понял', handler: () => {console.log('Уведомление закрыто')}}
          // )
        })
      })
  }
}

export function bookPlace(id: number, formData: FormDate): Promise<string> {
  const dateArrival = dateToUnixStamp(new Date(formData.dateArrival))
  const dateDeparture = dateToUnixStamp(new Date(formData.dateDeparture))
  return fetch(
    `http://127.0.0.1:3030/places/${id}?` +
    `checkInDate=${dateArrival}&` +
    `checkOutDate=${dateDeparture}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    }
  )
    .then((response) => {
      return response.text()
    })
    .then((response) => {
      return JSON.parse(response)
    })
    .catch(error => alert(error.message));
}
