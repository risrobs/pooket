import gsap from "gsap/gsap-core";
import { Container, Sprite } from "pixi.js";

export default class Button extends Container {
    constructor() {
        super()
        this.name = 'button'
        this.button = this._addButton();
        this.interactive = true;
        this.buttonMode = true;
    }

    show() {
        this.alpha = 1;
    }

    hide() {
        this.alpha = 0;
    }

    _addButton(){
        const buttonSprite = new Sprite.from('logo')
        buttonSprite.anchor.set(0.5);
        buttonSprite.y = 250
        buttonSprite.buttonMode = true;
        buttonSprite.interactive = true;
        this.addChild(buttonSprite);
        return buttonSprite;
    }
}