import {renderBlock} from './lib.js'
// import * as moment from "moment";

const date = new Date();
const splitDate = date.toLocaleDateString().split('.');
let dateYear= splitDate[2];
let dateMonth = splitDate[1];
let dateDay = splitDate[0];
console.log(new Date(+dateYear, +dateMonth + 1, 0).toLocaleDateString())

console.log(dateYear + '-' + dateMonth + '-' + dateDay)
console.log(splitDate.reverse().join('-'))

// console.log(year + '-' + month  + '-' + day);

export function renderSearchFormBlock(inDate = date.toLocaleDateString().split('.').reverse().join('-'), outDate = '2022-06-30') {
  console.log('Date()', new Date().toLocaleDateString());
  // console.log('moment', moment().format('dddd'));

  // console.log(date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate());

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
          <!--<div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>--!>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" value="${inDate}" min="${inDate}" max="2022-06-30" name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" value="${outDate}" min="2021-05-11" max="2021-06-30" name="checkout" />
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
