import {WhatDoIt} from "./interfaces";
import {parse} from "@typescript-eslint/parser";

export function renderBlock(elementId, html) {
  const element = document.getElementById(elementId)
  element.innerHTML = html
}

export function renderToast(message, action) {
  let messageText = ''

  if (message != null) {
    messageText = `
      <div id="info-block" class="info-block ${message.type}">
        <p>${message.text}</p>
        <button id="toast-main-action">${action?.name || 'Закрыть'}</button>
      </div>
    `
  }

  renderBlock(
    'toast-block',
    messageText
  )

  const button = document.getElementById('toast-main-action')
  if (button != null) {
    button.onclick = function () {
      if (action != null && action.handler != null) {
        action.handler()
      }
      renderToast(null, null)
    }
  }
}

export function setLocalStorage(
  whatDo: WhatDoIt,
  nameStorage: string,
  data?: string | number | object): boolean | string | object | number {
  if (whatDo === 'add' || whatDo === 'edit') {
    if (data) {
      localStorage.setItem(nameStorage, JSON.stringify(data));
    } else {
      localStorage.setItem(nameStorage, '[]');
    }
    return true
  } else if (whatDo === 'get') {
    return JSON.parse(localStorage.getItem(nameStorage))
  } else if (whatDo === 'delete') {
    localStorage.removeItem(nameStorage);
    return true
  } else if (whatDo === 'find') {
    if (JSON.parse(localStorage.getItem(nameStorage)).findIndex(element => isNaN(+element.id) ? element.id === data : +element.id === data) === -1) {
      return false
    } else {
      return true
    }
  } else if (whatDo === 'increment') {
    const data = JSON.parse(localStorage.getItem(nameStorage));
    data.favoriteItemsAmount++;
    localStorage.setItem(nameStorage, JSON.stringify(data))
    // localStorage.setItem(nameStorage, JSON.stringify(+localStorage.getItem(nameStorage) + 1))
    // return true
    // console.log(test);
    return true
  } else if (whatDo === 'decrement') {
    const data = JSON.parse(localStorage.getItem(nameStorage));
    data.favoriteItemsAmount--;
    localStorage.setItem(nameStorage, JSON.stringify(data))
    return true
  } else {
    return false
  }
}
