import {renderSearchFormBlock} from './search-form.js'
import {renderSearchStubBlock} from './search-results.js'
import {renderUserBlock, User} from './user.js'
// import {renderToast} from './lib.js'
import {renderSearchResult} from './search-results-button.js';
import {calculateUserInfo, setUserDate} from "./user-info.js";

window.addEventListener('DOMContentLoaded', () => {
  //Это временно для получения инфи, ну как бы из БД.
  const userInfoDB = new User({userName: 'Wade Warren', avatarUrl: '/img/avatar.png'}, 0);
  setUserDate(userInfoDB);
  //-------------------------------------------------
  // const userInfo = calculateUserInfo()
  renderUserBlock(userInfoDB.user.userName, userInfoDB.user.avatarUrl, userInfoDB.favoriteItemsAmount);
  renderSearchFormBlock();
  renderSearchStubBlock();
  renderSearchResult();

  // getFavoritesAmount()
  // renderToast(
  //   {text: 'Это пример уведомления. Используйте его при необходимости', type: 'success'},
  //   {name: 'Понял', handler: () => {console.log('Уведомление закрыто')}}
  // )
})
