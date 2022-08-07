import {renderToast} from "./lib.js";
import {FormDate, Place, SearchFormData} from "./interfaces.js";
import {dateToUnixStamp, timeOut} from "./additional-functions.js";
import {FlatRentSdk, addDays, cloneDate} from "./flat-rent-sdk.js";
import {SearchFormBlock} from "./search-results";
import {search} from "./search-results-button";

export function booking() {
  const blockResult = document.getElementsByClassName('result');
  for (let i = 0; blockResult.length > i; i++) {
    let blockResultIndex = blockResult[i]
    // @ts-ignore
    const resultContainer = blockResult[i].querySelector(".result-container");
    const checkInDate = document.getElementById('check-in-date');
    const checkOutDate = document.getElementById('check-out-date');
    // @ts-ignore
    const buttonForm = blockResult[i].querySelector('button');
    if (resultContainer != null && checkInDate != null && checkOutDate != null && buttonForm != null) {
      let favID: number | string = resultContainer.id;
      !isNaN(+favID) ? favID = +favID : '';
      const dateArrival: string = checkInDate["value"];
      const dateDeparture: string = checkOutDate["value"];
      const selectProviders = document.querySelectorAll('input[name="provider"]');
      buttonForm
        .addEventListener('click', (event) => {
          timeOut('stop');
          selectProviders.forEach(element => {
            const target = event.target;
            if (target != null) {
              if (!isNaN(+target['name'])) {
                const resultBooking = bookPlace(favID, {dateArrival: dateArrival, dateDeparture: dateDeparture}, 'homy')
                  .then((response) => {
                    console.log(response);
                    if (response['id']) {
                      const data = response;
                      renderToast(
                        {text: `Отель забранирован на ${dateArrival}`, type: 'success'},
                        {
                          name: 'Понял', handler: () => {
                            console.log('Уведомление закрыто')
                          }
                        }
                      )
                    } else {
                      renderToast(
                        {text: `Ошибка бронирования`, type: 'error'},
                        {
                          name: 'Понял', handler: () => {
                            console.log('Уведомление закрыто')
                          }
                        }
                      )
                    }
                  })
              }
              if (isNaN(+target['name'])) {
                const resultBooking = bookPlace(favID, {dateArrival: dateArrival, dateDeparture: dateDeparture}, 'flat-rent')
                  .then((result) => {
                    console.log(result);
                    renderToast(
                      {text: `Отель забранирован на ${dateArrival}`, type: 'success'},
                      {
                        name: 'Понял', handler: () => {
                          console.log('Уведомление закрыто')
                        }
                      }
                    )
                  })
              }
            }

          })
        })
    }
  }
}

export function bookPlace(id: number | string, formData: FormDate, provider: string): Promise<string> | any {
  const dateArrival: number = dateToUnixStamp(new Date(formData.dateArrival));
  const dateDeparture: number = dateToUnixStamp(new Date(formData.dateDeparture));
  if (provider === 'homy') {
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
  if (provider === 'flat-rent') {
    const sdk = new FlatRentSdk();
    // console.log('id', id);
    // console.log('dateArrival', dateArrival);
    // console.log('dateDeparture', dateDeparture);
    // console.log('addDays', addDays(cloneDate(new Date(formData.dateArrival)), 0));
    return sdk.book(id, addDays(cloneDate(new Date(formData.dateArrival)), 0), addDays(cloneDate(new Date(formData.dateDeparture)), 0))
      .then((result) => {
        return result
      })
      .catch(error => {
        return error.message;
      });
  }


}
