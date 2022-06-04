

export function getUserData() {
  const userN: object = { userName: 'userName', avatar: 'avatar', }

  localStorage.setItem('user', JSON.stringify(userN));

  console.log(JSON.parse(localStorage.getItem('user')))

}

export function getFavoritesAmount() {
  localStorage.setItem('favoritesAmount', '5');

  console.log(JSON.parse(localStorage.getItem('favoritesAmount')))
}


