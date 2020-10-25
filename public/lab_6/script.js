// You may wish to find an effective randomizer function on MDN.

function range(int) {
  const arr = [];
  for (let i = 0; i < int; i += 1) {
    arr.push(i);
  }
  return arr;
}

function sortFunction(a, b, key) {
  if (a[key] < b[key]) {
    return -1;
  } if (a[key] > b[key]) {
    return 1;
  }
  return 0;
}

document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray(); // here we're using jQuery to serialize the form
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((fromServer) => {
      // You're going to do your lab work in here. Replace this comment.
      if (document.querySelector('.flex-inner')){
        document.querySelector('.flex-inner').remove();
      }
      const mappingArr = range(10);
      const tenCountries = mappingArr.map(() => {
        const num = Math.floor(Math.random()*243);
        return fromServer[num];
      });

      const reverseCountries = tenCountries.sort((org,compare) => sortFunction(org,compare,'name')).reverse().filter((x, i, a) => !i || x != a[i-1]);
      const ul = document.createElement('ul');
      ul.className = 'flex-inner';
      $('form').prepend(ul);

      reverseCountries.forEach((el, i) => {
        const li = document.createElement('li');
        $(li).append(`<input type="checkbox" value=${el.code} id=${el.code} />`);
        $(li).append(`<label for${el.code}>${el.name}</label>`);
        $(ul).append(li);
      });
      //You're goign to do your...
      console.log('fromServer', fromServer);
    })
    .catch((err) => console.log(err));
});