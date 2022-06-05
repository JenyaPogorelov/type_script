import {renderSearchFormBlock} from './search-form.js'
import {renderSearchStubBlock} from './search-results.js'
import {renderUserBlock, User} from './user.js'
// import {renderToast} from './lib.js'
import {renderSearchResult} from './search-results-button.js';
import {getFavoritesAmount, getUserData, setUserDate} from "./user-info.js";

window.addEventListener('DOMContentLoaded', () => {
  const userInfo = new User({userName: 'Wade Warren', avatarUrl: '/img/avatar.png'}, 0);
  setUserDate(userInfo);
  renderUserBlock(userInfo.user.userName, userInfo.user.avatarUrl, userInfo.favoriteItemsAmount);
  renderSearchFormBlock();
  renderSearchStubBlock();
  renderSearchResult();
  // getUserData();
  // getFavoritesAmount()
  // renderToast(
  //   {text: 'Это пример уведомления. Используйте его при необходимости', type: 'success'},
  //   {name: 'Понял', handler: () => {console.log('Уведомление закрыто')}}
  // )
})
