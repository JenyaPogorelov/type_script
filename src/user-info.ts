import {User} from "./user.js";
import {UserInfo} from './interfaces.js';


export function setUserDate(user: object) {
  localStorage.setItem('user', JSON.stringify(user));
  // console.log(JSON.parse(localStorage.getItem('user')))
}

export function getUserData(user: unknown): UserInfo | string  {
  if (user == null) {
    return user + ''
  }
  if (user instanceof User) {
    // console.log('test')
    return user.user;
  }
}

export function getFavoritesAmount(user: unknown): number | string {
  if (user == null) {
    return user + ''
  }
  if (user instanceof User) {
    // console.log('test')
    return user.favoriteItemsAmount;
  }
}

export function calculateUserInfo() {
  const storageInfo: User = JSON.parse(localStorage.getItem('user'));
  const getUserInfo = new User(storageInfo.user, storageInfo.favoriteItemsAmount);
  const user = getUserData(getUserInfo);
  const favoriteItems = getFavoritesAmount(getUserInfo);
  if (typeof user === "object" && typeof favoriteItems === "number") {
    return new User(user, favoriteItems)
  }
}


