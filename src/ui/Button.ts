import {NineSlicePlane, Sprite, Texture} from "pixi.js";
import {DisplayObjectFactory} from "../factories";
import {FrameworkEvents} from "../FrameworkEvents";
import {Pivot} from "../utils";
import {BgCornersSize} from "./button/button_props/BgCornersSize";
import {ButtonBase} from "./button/ButtonBase";
import {ButtonProps} from "./button/ButtonProps";
import {LanguageText} from "./LanguageText";


export class Button extends ButtonBase {
    backgroundImage: NineSlicePlane;
    private disabledBgTextureName: string;
    private disableBgCornersSize: BgCornersSize;
    icon: Sprite;
    languageText: LanguageText;

    constructor(public props: ButtonProps) {
        super(props.callback, props.clickEventName, props.disabledOffline, props.withCooldown, props.oneTimeOnly);

        this.props.bgTextureName && this.setBackground();
        this.props.iconTextureName && this.setIcon();
        this.props.textKey && this.setText();

    }

    private setBackground() {
        this.backgroundImage = DisplayObjectFactory.createNineSlicePlane(this.props.bgTextureName)
        this.setBackgroundCorners(this.props.bgCornersSize);
        this.addChildAt(this.backgroundImage, 0);
        if (this.props.bgSizes) {
            this.backgroundImage.width = this.props.bgSizes.x;
            this.backgroundImage.height = this.props.bgSizes.y;
        }
        Pivot.center(this.backgroundImage);
    }

    private setText(): void {
        this.languageText = new LanguageText({
            key: this.props.textKey,
            fontSize: this.props.fontSize,
            fill: this.props.fontColor,
            fontWeight: this.props.fontWeight,
            autoFitWidth: this.props.autoFitWidth,
            centerAfterLanguageChanged: true
        });
        this.addChild(this.languageText);
        Pivot.center(this.languageText);
        this.props.textPosition && this.languageText.position.set(this.props.textPosition.x, this.props.textPosition.y);
        this.languageText.interactive = this.languageText.interactiveChildren = this.languageText.buttonMode = this.props.interactiveText;
    }

    private setIcon(): void {
        this.icon = DisplayObjectFactory.createSprite(this.props.iconTextureName)
        this.addChild(this.icon);
        Pivot.center(this.icon);
        this.props.iconPosition && this.icon.position.set(this.props.iconPosition.x, this.props.iconPosition.y);
    }

    setBackgroundCorners(bgCornersSize: number | [number, number, number, number]): void {
        bgCornersSize || (bgCornersSize = 0);
        this.props.bgCornersSize = bgCornersSize;
        let [left, top, right, bottom] = typeof bgCornersSize == "number"
            ? [bgCornersSize, bgCornersSize, bgCornersSize, bgCornersSize]
            : [bgCornersSize[0], bgCornersSize[1], bgCornersSize[2], bgCornersSize[3]];

        this.backgroundImage.leftWidth = left;
        this.backgroundImage.topHeight = top;
        this.backgroundImage.rightWidth = right;
        this.backgroundImage.bottomHeight = bottom;
    }

    set enabled(value: boolean) {
        super.enabled = value;
        if (!this.disabledBgTextureName) {
            return;
        }
        dispatchEvent(new MessageEvent(FrameworkEvents.GET_TEXTURE, {
            data: {
                textureName: value ? this.props.bgTextureName : this.disabledBgTextureName,
                onComplete: (texture: Texture) => this.backgroundImage.texture = texture
            }
        }))

        this.setBackgroundCorners(value ? this.props.bgCornersSize : this.disableBgCornersSize);
        if (value) {
            this.languageText.style.fill = this.props.fontColor ?? 0xffffff;
        }
    }

    get backgroundWidth(): number {
        return this.backgroundImage.width;
    }

    get backgroundHeight(): number {
        return this.backgroundImage.height;
    }

    changeBackgroundImage(textureKey: string): void {
        this.props.bgTextureName = textureKey;
        if (this.backgroundImage) {
            this.removeChild(this.backgroundImage);
            this.backgroundImage.destroy();
        }
        this.setBackground();
    }

    changeIcon(textureKey: string) {
        this.props.iconTextureName = textureKey;
        if (this.icon) {
            this.removeChild(this.icon);
            this.icon.destroy();
        }
        this.setIcon();
    }

    setDisabledTexture(textureName: string, cornersSize: BgCornersSize): void {
        this.disabledBgTextureName = textureName;
        this.disableBgCornersSize = cornersSize;
    }

    makeGreyAndDisabled(disabledBgTextureName: string = "common/ButtonGrey", disableBgCornersSize: BgCornersSize = 60): void {
        this.setDisabledTexture(disabledBgTextureName, disableBgCornersSize);
        this.languageText.style.fill = 0x7d7d7c;
        this.languageText.setTextShadow(0, 0, 0, 0, 0, false);
        this.languageText.setTextStroke(0, 0);
        this.enabled = false;
    }

    destroy() {
        if (this.backgroundImage) {
            this.removeChild(this.backgroundImage);
            this.backgroundImage.destroy();
            this.backgroundImage = null;
        }

        if (this.icon) {
            this.removeChild(this.icon);
            this.icon.destroy();
            this.icon = null;
        }

        if (this.languageText) {
            this.removeChild(this.languageText);
            this.languageText.destroy();
            this.languageText = null;
        }

        this.props = null;
        super.destroy();
    }
}
