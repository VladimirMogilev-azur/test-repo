import {Container} from "pixi.js";


export class Pivot {
    static center(sprite: Container, byX: boolean = true, byY: boolean = true) {
        byX && (sprite.pivot.x = Math.floor(sprite.width / sprite.scale.x * .5));
        byY && (sprite.pivot.y = Math.floor(sprite.height / sprite.scale.y * .5));
    }
}
