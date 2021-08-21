export default class View {
  _data

  render(data) {
    if (!data) this.renderError()

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
}
