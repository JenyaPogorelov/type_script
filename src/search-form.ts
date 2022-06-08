import {renderBlock} from './lib.js'
// import * as moment from "moment";

const date = new Date();
const splitDate: string[]  = date.toLocaleDateString().split('.').reverse();
const dateYear: string = splitDate[0];
const dateMonth: string = splitDate[1];
const dateDay: string = splitDate[2];
const inDateTransform: string = splitDate.join('-');
const outDateTransform: string = new Date(+dateYear, +dateMonth - 1, +dateDay + 2).toLocaleDateString().split('.').reverse().join('-');
const maxOutDate: string = new Date(+dateYear, +dateMonth + 1, 0).toLocaleDateString().split('.').reverse().join('-');



export function renderSearchFormBlock(inDate: string = inDateTransform, outDate:string = outDateTransform) {
  // console.log('Date()', new Date().toLocaleDateString());
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
