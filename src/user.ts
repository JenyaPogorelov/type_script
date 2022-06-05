import {renderBlock} from './lib.js';
import {UserInfo} from './interfaces.js';

export class User {
  public user: UserInfo
  public favoriteItemsAmount: number;

  constructor(
    user: UserInfo,
    favoriteItemAmount: number = 0
  ) {
    this.user = user
    this.favoriteItemsAmount = favoriteItemAmount;
  }
}

export function renderUserBlock(userName: string, avatarLink: string, favoriteItemsAmount?: number) {
  const favoritesCaption = favoriteItemsAmount > 0 ? favoriteItemsAmount : 'ничего нет';
  const hasFavoriteItems = favoriteItemsAmount > 0 ? true : false;

  renderBlock(
    'user-block',
    `
    <div class="header-container">
      <img class="avatar" src="${avatarLink}" alt="${userName}" />
      <div class="info">
          <p class="name">${userName}</p>
          <p class="fav">
            <i class="heart-icon${hasFavoriteItems ? ' active' : ''}"></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `
  )
}
