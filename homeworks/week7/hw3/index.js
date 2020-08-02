document.querySelector('.addList__btn').addEventListener('click', () => {
  const contents = document.querySelector('.addList__input').value;
  if (contents) {
    const items = document.createElement('div');
    items.classList.add('list__block');
    items.innerHTML = `
    <input type="checkbox" class="list__button" />
    <div class="list__content">${contents}</div>
    <button class="list__delete">Delete</button>
    `;
    document.querySelector('.list').appendChild(items);
    document.querySelector('.addList__input').value = '';
  }
});

document.querySelector('.list').addEventListener('click', (e) => {
  if (e.target.classList.contains('list__button')) {
    e.target.parentNode.children[1].classList.toggle('checked');
  }
});

document.querySelector('.list').addEventListener('click', (e) => {
  if (e.target.classList.contains('list__delete')) {
    e.target.parentElement.remove();
  }
});
