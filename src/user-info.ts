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
  if (user instanceof User) {
    return user.user;
  }
  if ((typeof user === 'object' || typeof user === 'symbol') && user != null) {
    return user.toString();
  }
  return user + ''
}

export function getFavoritesAmount(user: unknown): number | string {
  if (user instanceof User) {
    return user.favoriteItemsAmount;
  }
  if ((typeof user === 'object' || typeof user === 'symbol') && user != null) {
    return user.toString();
  }
  return user + ''
}

export function calculateUserInfo() {
  const userItem = localStorage.getItem('user');
  if (userItem != null) {
    const storageInfo: User = JSON.parse(userItem);
    const getUserInfo = new User(storageInfo.user, storageInfo.favoriteItemsAmount);
    const user = getUserData(getUserInfo);
    const favoriteItems = getFavoritesAmount(getUserInfo);
    if (typeof user === "object" && typeof favoriteItems === "number") {
      return new User(user, favoriteItems)
    }
  }
}


