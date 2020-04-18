import content from './writing-content.js'
import Router from './router.js'

class Page {
  constructor () {
    this.header = document.querySelector('h1')
    this.nav = document.querySelector('.nav')
    this.navLinks = document.querySelectorAll('.nav-link')
    this.contentMountPoint = document.querySelector('.content-box')
    this.contentText = {
      about: content.about,
      aboutCards: content.cards,
      writing: content.writing
    }
  }

  setup () {
    this.createNavMenu()
    this.setViewportHeight()
  }

  getText (link) {
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

  setViewportHeight () {
    // https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)

    window.addEventListener('resize', () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    })
  }

  handleContentChange (e) {
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

  createNavMenu () {
    this.navLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        this.handleContentChange(e)
      })
    })
  }

}

window.onload = () => {
  const page = new Page()
  page.setup()
  const router = new Router(window.url)
  router.route()
}
