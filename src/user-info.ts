export function setUserDate(user: object) {
  localStorage.setItem('user', JSON.stringify(user));
  console.log(JSON.parse(localStorage.getItem('user')))
}

import {User} from "./user.js";

export function getUserData(user: unknown) {
  // console.log(new User('Name', 'Avatar',))
  // setUserDate({userName: 'Name', avatarUrl: 'Avatar'})
  // // localStorage.setItem('user', JSON.stringify(userN));
  // console.log(JSON.parse(localStorage.getItem('user')))
}

export function getFavoritesAmount() {
  // localStorage.setItem('favoritesAmount', '5');
  console.log(JSON.parse(localStorage.getItem('favoritesAmount')))
}


