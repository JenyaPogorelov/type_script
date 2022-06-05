import {User} from "./user.js";


export function setUserDate(user: object) {
  localStorage.setItem('user', JSON.stringify(user));
  // console.log(JSON.parse(localStorage.getItem('user')))
}

export function getUserData(user: unknown) {
  if (user == null) {
    return user + ''
  }
  return user;
}

export function getFavoritesAmount(favoritesAmount: unknown) {
  return favoritesAmount
}

export function calculateUserInfo() {
  const storageInfo: User = JSON.parse(localStorage.getItem('user'));
  const user = getUserData(storageInfo.user)
  const favoriteItems = getFavoritesAmount(storageInfo.favoriteItemsAmount)
  console.log(user)
  console.log(favoriteItems)
  // const userInfo: object = new User(user, favoriteItems)
  // console.log(getUserData(userInfo.user))
  // console.log(getFavoritesAmount(userInfo.favoriteItemsAmount))
}


