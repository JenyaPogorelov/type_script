import {renderSearchFormBlock} from './search-form.js'
import {renderSearchStubBlock} from './search-results.js'
import {renderUserBlock, User} from './user.js'
import {renderSearchResult} from './search-results-button.js';
import {calculateUserInfo, setUserDate} from "./user-info.js";
import {HomyProvider} from "./store/providers/Homy/provider.js";
import {SearchFilter} from "./store/domain/search-filter.js";
import {Place} from "./store/domain/place.js";

const homy = new HomyProvider();
// const flatRant = new FlatRentProvider();

const filter: SearchFilter = {
  city: '59.9386,30.3141',
  checkInDate: 1657584000,
  checkOutDate: 1657756800,
  priceLimit: 280000,
}

function sortByPrice(one: Place, two: Place) {
  if (one.priceLimit > two.priceLimit) {
    return 1;
  } else if (one.priceLimit < two.priceLimit) {
    return -1;
  } else  {
    return 0;
  }
}

Promise.all([
  homy.find(filter)
]).then((results) => {
  console.log(results);
  const allResult: Place[] = [].concat(results[0]);
  console.log(allResult);
  allResult.sort(sortByPrice);
  return allResult;
}).then((resp) => {
  console.log(resp);
})
window.addEventListener('DOMContentLoaded', () => {
  //Это временно для получения инфи, ну как бы из БД.
  const userInfoDB = new User({userName: 'Wade Warren', avatarUrl: '/img/avatar.png'}, 0);
  setUserDate(userInfoDB);
  //-------------------------------------------------
  const userInfo = calculateUserInfo()
  renderUserBlock(userInfo.user.userName, userInfo.user.avatarUrl, userInfo.favoriteItemsAmount);
  renderSearchFormBlock();
  renderSearchStubBlock();
  renderSearchResult();
  // renderToast(
  //   {text: 'Это пример уведомления. Используйте его при необходимости', type: 'success'},
  //   {name: 'Понял', handler: () => {console.log('Уведомление закрыто')}}
  // )
})
