/* eslint-disable */
document.querySelector('.lottery__btn button').addEventListener('click', () => {
  getData();
});

function getData() {
  return fetch('/lottery').then((response) => {
    return response.json();
  }).then((data) => {
    getPrize(data);
  }).catch(err => console.log(err));
}

function getPrize(data) {
  const { prize, description, image } = data;
  document.querySelector('.lottery__block').classList.add('prize');
  document.querySelector('.lottery__bg').classList.add('prize');
  document.querySelector('.lottery__bg.prize').style.background = `url(${image}) center/cover no-repeat`;
  document.querySelector('.prize__text').innerText = prize + '! ' + description;
  document.querySelector('.prize__text').classList.add('prize');
  document.querySelector('.prize__btn').classList.add('prize');
}

document.querySelector('.prize__btn button').addEventListener('click', () => {
  document.querySelector('.prize__text').classList.remove('prize');
  document.querySelector('.prize__text').style.color = 'black';
  document.querySelector('.prize__btn').classList.remove('prize');
  document.querySelector('.lottery__bg').style.background = '';
  document.querySelector('.lottery__bg').classList.remove('prize');
  document.querySelector('.lottery__block').classList.remove('prize');
});
