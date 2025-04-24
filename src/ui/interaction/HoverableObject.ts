import {InteractionEvent, Sprite} from "pixi.js";


export class HoverableObject extends Sprite {
    constructor() {
        super();

        this.on("pointerover", this.onPointerOver, this);
        this.on("pointerout", this.onPointerOut, this);
        this.on("pointerdown", this.onPointerDown, this);
        this.on('pointerup', this.onPointerUp, this);

        this.interactive = this.interactiveChildren = this.buttonMode = true;
    }

    /**
     * Уничтожаем объект
     */
    destroy(): void {
        this.off("pointerover", this.onPointerOver, this);
        this.off("pointerout", this.onPointerOut, this);
        this.off("pointerdown", this.onPointerDown, this);
        this.off('pointerup', this.onPointerUp, this);

        super.destroy({children: true});
    }

    /**
     * Обработчик события pointerover
     * @param e Событие взаимодейтсвия пользователя
     */
    onPointerOver(e: InteractionEvent): void {
        e;
    }

    /**
     * Обработчик события pointerout
     * @param e Событие взаимодейтсвия пользователя
     */
    onPointerOut(e: InteractionEvent): void {
        e;
    }

    /**
     * Обработчик события pointerdown
     * @param e Событие взаимодейтсвия пользователя
     */
    onPointerDown(e: InteractionEvent): void {
        e;
    }

    /**
     * Обработчик события pointerdown
     * @param e Событие взаимодейтсвия пользователя
     */
    onPointerUp(e: InteractionEvent): void {
        e;
    }
}
