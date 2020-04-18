class Router {
  constructor () {
    this.link = new URL(window.location.href).searchParams.get('q')
  }

  route () {
    if (!this.link) {
      return false
    }
    const navLink = this.navElement()
    navLink.click()
  }

  navElement () {
    return document.querySelector(`#nav-${this.link}`)
  }
}

export default Router
