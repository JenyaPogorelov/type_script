import {renderBlock} from './lib.js'
// import * as moment from "moment";

const date = new Date();
const splitDate: string[]  = date.toLocaleDateString().split('.').reverse();
const dateYear: string | undefined = splitDate[0];
const dateMonth: string | undefined = splitDate[1];
const dateDay: string | undefined = splitDate[2];
const inDateTransform: string = splitDate.join('-');
let outDateTransform: string;
let maxOutDate: string
if (dateYear != undefined && dateMonth != undefined && dateDay != undefined) {
  outDateTransform = new Date(+dateYear, +dateMonth - 1, +dateDay + 2).toLocaleDateString().split('.').reverse().join('-');
  maxOutDate = new Date(+dateYear, +dateMonth + 1, 0).toLocaleDateString().split('.').reverse().join('-');
}



// TODO Сделать так чтобы из поля <input type="hidden" disabled value="59.9386,30.3141" /> которое ниже бралось его значение сейчас оно вписано вручную
export function renderSearchFormBlock(inDate: string = inDateTransform, outDate:string = outDateTransform) {
  renderBlock(
    'search-form-block',
    `
    <form>
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" value="${inDate}" min="${inDate}" max="${maxOutDate}" name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" value="${outDate}" min="${outDate}" max="${maxOutDate}" name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          <div>
            <div><button id="search-button">Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  )
}
