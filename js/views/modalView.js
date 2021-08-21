import View from './View.js'

class ModalView extends View {
  _parentElement = document.querySelector('body')

  _generateMarkup(game) {
    return `
      <div class="modal">
      <span class="close-modal">+</span>
      <div class="modal__container">
        <img src="${game.thumbnail}" alt="" class="modal__image" />
        <div class="modal__content">
          <h2 class="modal__title">${game.title}</h2>
          <ul class="modal__list">
            <li class="modal__description">
              ${game.short_description}
            </li>
            <li>
              <a
                target="_blank"
                class="modal__site"
                href="${game.game_url}"
                >Website</a
              >
            </li>
            <li class="modal__genre"><span>Genre:</span> ${game.genre}</li>
            <li class="modal__dev">
              <span>Developers:</span> ${game.developer}
            </li>
            <li class="modal__release">
              <span>Release date:</span> ${game.release_date}
            </li>
          </ul>
        </div>
      </div>
    </div>
      `
  }

  _clear() {}
}

export default new ModalView()
