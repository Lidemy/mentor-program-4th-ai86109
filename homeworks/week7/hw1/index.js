/* eslint-disable dot-notation */
document.querySelector('main').addEventListener('submit',
  (e) => {
    e.preventDefault();
    const values = {};
    let hasEmpty = false;

    const inputs = document.querySelectorAll('.notice input[type=text]');
    for (let i = 0; i < inputs.length; i += 1) {
      values[inputs[i].name] = inputs[i].value;
      if (inputs[i].value === '') {
        inputs[i].parentNode.classList.add('active');
        hasEmpty = true;
      } else {
        inputs[i].parentNode.classList.remove('active');
      }
    }

    const inputsRadio = document.querySelectorAll('.notice input[type=radio]');
    let hasChecked = false;
    for (let i = 0; i < inputsRadio.length; i += 1) {
      if (inputsRadio[i].checked) {
        hasChecked = true;
        values['type'] = inputsRadio[i].value;
      }
    }
    if (!hasChecked) {
      document.querySelector('.type form').classList.add('active');
      hasEmpty = true;
    } else {
      document.querySelector('.type form').classList.remove('active');
    }

    const opinion = document.querySelector('.others input');
    values['others'] = opinion.value;

    if (!hasEmpty) {
      alert(`
        暱稱：${values.nickname}
        電子信箱：${values.email}
        手機號碼：${values.mobile}
        報名類型：${values.type}
        怎麼知道這個活動的：${values.campaign}
        其他：${values.others}
        `);
    }
  });
