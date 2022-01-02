import gsap from "gsap/gsap-core";
import { Container, Sprite, Text, Texture } from "pixi.js";

export default class Pokeball extends Container {
    constructor() {
        super()
        this.name = 'pokeball'
        this.text = this._addText();
        this.top = this._addTop();
        this.bottom = this._addBottom();
        this.isOpened = false;
    }

    static get events() {
        return {
            OPEN_END: 'open_end',
            OPEN_START: 'open_start',
            CLOSE_END: 'close_end',
            CLOSE_START: 'close_start',
            SHUFFLE_END: 'shuffle_end'
        }
    }

    async open() {
        this.emit(Pokeball.events.OPEN_START)
        const tlOpen = gsap.timeline();
         
        await tlOpen.to(this.top, { y: -250, ease: 'elastic.out' })
            .to(this.bottom, { y: 250, ease: 'elastic.out' }, '<')
        
        this.isOpened = true;
        this.emit(Pokeball.events.OPEN_END)
    }

    async close() {
        this.emit(Pokeball.events.CLOSE_START)
        
        const tlClose = gsap.timeline();
        await tlClose.to(this.top, { y: -95, ease: 'elastic.out' })
            .to(this.bottom, { y: 90, ease: 'elastic.out' }, '<')

        this.isOpened = false;
        this.emit(Pokeball.events.CLOSE_END)
    }

    _addTop() {
        const topSprite = new Sprite.from('ballTop');
        topSprite.anchor.set(0.5);
        topSprite.y = -95
        this.addChild(topSprite);
        return topSprite
    }

    _addBottom() {
        const bottomSprite = new Sprite.from('ballBottom')
        bottomSprite.anchor.set(0.5);
        bottomSprite.y = 95
        this.addChild(bottomSprite);
        return bottomSprite
    }

    _addText() {
        const txt = new Text('text', { align: 'center', fontSize: 200, fill: '#FFFFFF' });
        txt.anchor.set(0.5)
        txt.alpha = 0;
        this.addChild(txt)
        return txt
    }

    async _shuffle() {
        let prev = 0;
        this.text.alpha = 1;

        const dummy = { value: 0 };
        const steps = gsap.to(dummy, {
            duration: 1,
            ease: 'steps(100)',
            value: 100,
            onUpdate: () => {
                if (dummy.value !== prev) this._setRandomText();
                prev = dummy.value
            }
        });

        await gsap.to(steps, { duration: 3, progress: 1, ease: 'circ.out' })
        this.text.alpha = 0;
        this.emit(Pokeball.events.SHUFFLE_END)
    }

    _setRandomText() {
        this.text.text = Pokeball.pokemons.names[Math.floor(Math.random() * Pokeball.pokemons.names.length)];
    }

    static get pokemons() {
        return {
            names: ['Balbasaur', 'Charmander', 'Squirtle', 'Charizard', 'Metapod', 'Caterpie', 'Wartortle']
        }
    }
}