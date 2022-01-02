import Scene from './Scene';
import gsap from 'gsap';
import Footer from '../components/Footer';
import Button from '../components/Button';
import Pokeball from '../components/Pokeball';

export default class Play extends Scene {
  async onCreated() {

    const footer = new Footer();
    footer.x = - window.innerWidth / 2;
    footer.y = window.innerHeight / 2 - footer.height;
    this.addChild(footer);

    const pokeball = new Pokeball();
    pokeball.y = -50
    this.addChild(pokeball)

    const button = new Button();
    this.addChild(button);

    button.on('click',async () => await pokeball.open())
    button.on('click',async () => await pokeball._shuffle())

    pokeball.on(Pokeball.events.OPEN_START, () => button.hide())
    pokeball.on(Pokeball.events.CLOSE_END, () => button.show())
    pokeball.on(Pokeball.events.SHUFFLE_END, async () => await pokeball.close())

  }

  /**
   * Hook called by the application when the browser window is resized.
   * Use this to re-arrange the game elements according to the window size
   *
   * @param  {Number} width  Window width
   * @param  {Number} height Window height
   */
  onResize(width, height) { // eslint-disable-line no-unused-vars

  }
}
