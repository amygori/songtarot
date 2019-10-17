class Page {
  constructor() {
    this.header = document.querySelector('h1');
    this.nav = document.querySelector('.nav');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.contentMountPoint = document.querySelector('.content-box');
    this.contentText = {
      about: 'I keep readings simple. You ask a question. I draw the cards. I look at the visual elements in the cards to find answers. Everything I say is verifiable in the cards. We can point to it. You don’t have to take my word for anything. I send you a photo of the cards and the reading in writing. You ask a clarifying question. I respond. $30.',
      aboutCards: 'I use Marseilles Tarot, Sibilla, Lenormandon, and playing cards. The cards are made of card stock. They are flat, nothing but air behind them. There’s nothing magic in them. The question that you ask is the magical element. We can think of a question as a line looking for its own source, and an answer as the line closing itself, a circle. Call and response. It’s that simple. Don’t ask me how it works. Who knows?'
    }

    this.setup = () => {
      this.createNavMenu();
      this.setViewportHeight();
    }

    this.getText = (link) => {
      switch (link) {
        case 'nav-about':
          return this.contentText.about;
        case 'nav-about-cards':
          return this.contentText.aboutCards;
        default:
          return '';
      }
    }

    this.setViewportHeight = () => {
      // https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);

      window.addEventListener('resize', () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      });
    }

    this.handleContentChange = (e) => {
      let clickedLinkId = e.target.id;
      let contentDiv =  document.querySelector('.content-box>p');

      if (contentDiv && contentDiv.className === clickedLinkId) {
        this.contentMountPoint.removeChild(contentDiv);
      } else {
        let p = document.createElement('p');
        p.innerText = this.getText(clickedLinkId);
        p.className = clickedLinkId;

        contentDiv ? this.contentMountPoint.replaceChild(p, contentDiv) : this.contentMountPoint.appendChild(p);
      }
    }

    this.createNavMenu = () => {
      this.navLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
          console.log(e)
          console.log(e.currentTarget)
          console.log(e.target)
          this.handleContentChange(e);
        });
      });
    }
  }
}

window.onload = () => {
  const page = new Page();
  page.setup();
}
