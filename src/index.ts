import {renderSearchFormBlock} from './search-form.js'
import {renderSearchStubBlock} from './search-results.js'
import {renderUserBlock} from './user.js'
import {renderToast} from './lib.js'
import {renderSearchResult} from './search-results-button.js';
import {getFavoritesAmount, getUserData} from "./get-user-info.js";

window.addEventListener('DOMContentLoaded', () => {
  renderUserBlock('Wade Warren', '/img/avatar.png', '0');
  renderSearchFormBlock();
  renderSearchStubBlock();
  renderSearchResult();
  getUserData();
  getFavoritesAmount()
  // renderToast(
  //   {text: 'Это пример уведомления. Используйте его при необходимости', type: 'success'},
  //   {name: 'Понял', handler: () => {console.log('Уведомление закрыто')}}
  // )
})
