class Page {
  constructor() {
    this.header = document.querySelector('h1');
    this.nav = document.querySelector('.nav');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.contentMountPoint = document.querySelector('.content-box');

    this.contentText = {
      aboutMe: 'Hello, this is about Adam',
      aboutCards: 'Well this is text about the cards'
    }

    this.getText = (link) => {
      switch (link) {
        case 'nav-about-me':
          return this.contentText.aboutMe;
        case 'nav-about-cards':
          return this.contentText.aboutCards;
        default:
          return '';
      }
    }
  }
}

window.onload = () => {
  const page = new Page();
  console.log(page.getText())
  page.navLinks.forEach( (link) => {
    link.addEventListener('click', (e) => {
      let clickedLinkId = e.target.id;
      let contentDiv = document.querySelector('.content-box>p');
      console.log(clickedLinkId);
      if (contentDiv) {
        page.contentMountPoint.removeChild(contentDiv);
      } else {
        let p = document.createElement('p');
        p.innerText = page.getText(clickedLinkId);
        page.contentMountPoint.appendChild(p);
      }
    });
  });
}
