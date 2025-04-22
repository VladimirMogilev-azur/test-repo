import {NineSlicePlane, Sprite, Texture, TilingSprite} from "pixi.js";


export class DisplayObjectFactory {

    static createSprite(texture?: Texture, autoFitWidth: number = 0): Sprite {
        let sprite: Sprite = new Sprite(texture);
        if (autoFitWidth && sprite.width > autoFitWidth) {
            sprite.scale.set(autoFitWidth / sprite.width);
        }
        return sprite;
    }

    static createNineSlicePlane(
        texture: Texture,
        leftWidth: number = 10,
        topHeight: number = 10,
        rightWidth: number = 10,
        bottomHeight: number = 10): NineSlicePlane {
        return new NineSlicePlane(texture, leftWidth, topHeight, rightWidth, bottomHeight);
    }

    static createTiling(texture: Texture): TilingSprite {
        return new TilingSprite(texture);
    }
}
