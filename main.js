import content from './writing-content.js'

class Page {
  constructor () {
    this.header = document.querySelector('h1')
    this.nav = document.querySelector('.nav')
    this.navLinks = document.querySelectorAll('.nav-link')
    this.contentMountPoint = document.querySelector('.content-box')
    this.contentText = {
      about: 'I keep readings simple. You ask a question. I draw the cards. I look at the visual elements in the cards to find answers. Everything I say is verifiable in the cards. We can point to it. You don’t have to take my word for anything. I send you a photo of the cards and the reading in writing. You ask a clarifying question. I respond. $30.',
      aboutCards: 'I use Marseilles Tarot, Sibilla, Lenormandon, and playing cards. The cards are made of card stock. They are flat, nothing but air behind them. There’s nothing magic in them. The question that you ask is the magical element. We can think of a question as a line looking for its own source, and an answer as the line closing itself, a circle. Call and response. It’s that simple. Don’t ask me how it works. Who knows?',
      writing: content
    }

    this.setup = () => {
      this.createNavMenu()
      this.setViewportHeight()
    }

    this.getText = (link) => {
      switch (link) {
        case 'nav-about':
          return this.contentText.about
        case 'nav-about-cards':
          return this.contentText.aboutCards
        case 'nav-writing':
          return this.contentText.writing
        default:
          return ''
      }
    }

    this.setViewportHeight = () => {
      // https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)

      window.addEventListener('resize', () => {
        const vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
      })
    }

    this.handleContentChange = (e) => {
      const clickedLinkId = e.target.id
      const contentDiv = document.querySelector('.content-box>div')

      if (contentDiv && contentDiv.className === clickedLinkId) {
        this.contentMountPoint.removeChild(contentDiv)
      } else {
        const div = document.createElement('div')
        div.innerHTML = this.getText(clickedLinkId)
        div.className = clickedLinkId

        contentDiv ? this.contentMountPoint.replaceChild(div, contentDiv) : this.contentMountPoint.appendChild(div)
      }
    }

    this.createNavMenu = () => {
      this.navLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
          this.handleContentChange(e)
        })
      })
    }
  }
}

window.onload = () => {
  const page = new Page()
  page.setup()
}
