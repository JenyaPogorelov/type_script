import {setLocalStorage} from "./lib.js";
import {calculateUserInfo} from "./user-info.js";
import {renderUserBlock} from "./user.js";

export function dateToUnixStamp(date: Date): number {
  return +date.getTime() / 1000
}

export function addListener() {
  let stor: object[] = []
  const blockResult = document.getElementsByClassName('result');
  for (let i = 0; blockResult.length > i; i++) {
    const buttonForm = blockResult[i].querySelector('.favorites');
    const favID = blockResult[i].querySelector('.result-container').id;
    const favName = blockResult[i].querySelector('.name').innerHTML;
    const favURL = blockResult[i].querySelector('.result-img')['src'];
    const favoriteInfo: object = {id: favID, name: favName, url: favURL};

    buttonForm
      .addEventListener('click', (event) => {
        const blockFavorite = blockResult[i].querySelector('div.favorites');
        if (!blockFavorite.classList.contains('active')) {
          setLocalStorage('increment', 'user');
          stor.push(favoriteInfo)
          console.log(stor);
        } else {
          setLocalStorage('decrement', 'user');
          stor = stor.filter(item => item['id'] !== favID);
          console.log(stor);
        }
        blockFavorite.classList.toggle('active');
        setLocalStorage('add', 'favoriteItems', stor)
        const userInfo = calculateUserInfo()
        renderUserBlock(userInfo.user.userName, userInfo.user.avatarUrl, userInfo.favoriteItemsAmount);
      })
  }
}
