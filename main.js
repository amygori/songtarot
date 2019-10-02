const el= document.querySelector('h1');

el.addEventListener('click', function(){
  let p = document.querySelector('.description p')
  if(p) {
    p.parentNode.removeChild(p);
  } else {
    let p = document.createElement('p')
    p.innerText = 'Answers for your questions'
    document.querySelector('.description').appendChild(p)
  }
});
