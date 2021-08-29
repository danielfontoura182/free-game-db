export default class View {
  _data

  render(data, modal = false) {
    if (!data) this.renderError()

    if (modal) {
      const markup = this._generateMarkup(data)
      this._parentElement.insertAdjacentHTML('beforeend', markup)
      return
    }

    this._data = data
    const markup = this._generateMarkup()

    this._clear()
    this._parentElement.insertAdjacentHTML('beforeend', markup)
  }

  renderError() {
    this._clear()
    this._parentElement.insertAdjacentHTML(
      'beforeend',
      'Sorry, something went wrong. Please, reload the page.'
    )
  }

  _clear() {
    this._parentElement.innerHTML = ''
  }

  renderSpinner() {
    const markup = `
    <div class="loader"></div>
    `
    this._clear()
    this._parentElement.insertAdjacentHTML('afterbegin', markup)
  }

  renderNoMatch() {
    this._clear()
    const markup = `
    <div class="no-match">
      Sorry, no game found. <br> Try searching for another one.
    </div>
    `
    this._parentElement.insertAdjacentHTML('beforeend', markup)
  }
}
