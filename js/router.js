export class Router {
  routes = {}
  add(routeName, page) {
    this.routes[routeName] = page
  }
  route(event) {
    event = event || window.event
    event.preventDefault()

    window.history.pushState({}, '', event.target.href)
    this.handle()
  }

  handle() {
    const { pathname } = window.location
    const route = this.routes[pathname] || this.routes[404]
    const homeSelected = document.querySelector('.list a:nth-child(1)')
    const universeSelected = document.querySelector('.list a:nth-child(2)')
    const explorationSelected = document.querySelector('.list a:nth-child(3)')

    fetch(route)
      .then(data => data.text())
      .then(html => {
        document.querySelector('#app').innerHTML = html
      })

    if (pathname == '/exploration') {
      console.log(pathname)
      homeSelected.classList.remove('selected')
      universeSelected.classList.remove('selected')
      explorationSelected.classList.add('selected')
      document.body.classList.remove('Bg_universe')
      document.body.classList.add('Bg_explorer')
    }
    if (pathname == '/universe') {
      homeSelected.classList.remove('selected')
      universeSelected.classList.add('selected')
      explorationSelected.classList.remove('selected')
      document.body.classList.add('Bg_universe')
      document.body.classList.remove('Bg_explorer')
    } else {
      homeSelected.classList.add('selected')
      universeSelected.classList.remove('selected')
      explorationSelected.classList.remove('selected')
      document.body.classList.remove('Bg_universe')
      document.body.classList.remove('Bg_explorer')
    }
  }
}
