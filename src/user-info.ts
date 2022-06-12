import {User} from "./user.js";
import {UserInfo, WhatDoIt} from './interfaces.js';
import {setLocalStorage} from "./lib.js";

export function setUserDate(user: object) {
  if (!setLocalStorage('get', 'user')) {
    setLocalStorage("add", 'user', user)
    setLocalStorage('add', 'favoriteItems');
  }
}

export function getUserData(user: unknown): UserInfo | string {
  if (user === null) {
    return user + ''
  }
  if (user instanceof User) {
    return user.user;
  }
  return user.toString()
}

export function getFavoritesAmount(user: unknown): number | string {
  if (user === null) {
    return user + ''
  }
  if (user instanceof User) {
    return user.favoriteItemsAmount;
  }
  return user.toString()
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


