import {LINE_JOIN, Text} from "pixi.js";
import {FrameworkConfig} from "../FrameworkConfig";
import {FrameworkEvents} from "../FrameworkEvents";
import {Dispatcher} from "../services";
import {Pivot} from "../utils";
import {LanguageTextProps} from "./language_text/LanguageTextProps";


export class LanguageText extends Text {
    protected onLanguageChangedBindThis: (e: Event) => void;

    constructor(public props: LanguageTextProps) {
        super(props.key, {
            fontFamily: FrameworkConfig.languageTextConfig.fontFamily,
            fontSize: props.fontSize,
            fill: props.fill ?? FrameworkConfig.languageTextConfig.fill,
            fontWeight: props.fontWeight ?? FrameworkConfig.languageTextConfig.fontWeight,
            align: props.align ?? FrameworkConfig.languageTextConfig.align,
            fontStyle: props.fontStyle ?? FrameworkConfig.languageTextConfig.fontStyle,
        });
        this.style.lineJoin = LINE_JOIN.ROUND;
        this.onLanguageChangedBindThis = this.onLanguageChanged.bind(this);
        addEventListener(FrameworkEvents.LANGUAGE_CHANGED, this.onLanguageChangedBindThis);
        this.onLanguageChanged();
        this.init();
    }

    init(): void {
        this.interactive = this.interactiveChildren = false;
    }

    public applyPlaceholders(placeholders: string[]) {
        this.props.placeholders = placeholders;
        this.onLanguageChanged();
    }

    setTextStroke(color: number, thickness: number, centerAfter: boolean = true): void {
        this.style.strokeThickness = thickness;
        this.style.stroke = color;
        this.style.padding = thickness;
        centerAfter && Pivot.center(this);
    }

    setTextShadow(color: number = 0, distance: number = 1, blur: number = 3, angle: number = Math.PI / 2, alpha: number = .5, centerAfter: boolean = true): void {
        this.style.dropShadow = true;
        this.style.dropShadowAngle = angle;
        this.style.dropShadowColor = color;
        this.style.dropShadowDistance = distance;
        this.style.dropShadowBlur = blur;
        this.style.dropShadowAlpha = alpha;
        this.style.padding = blur + distance;
        centerAfter && Pivot.center(this);
    }

    changeText(textKey: string, centerAfter: boolean = true): void {
        this.props.key = textKey;
        this.text = this.props.key;
        this.onLanguageChanged();
        centerAfter && Pivot.center(this);
    }

    fitWidth(): void {
        if (!this.props.autoFitWidth) {
            return;
        }
        this.scale.set(1);
        this.width > this.props.autoFitWidth && this.scale.set(this.props.autoFitWidth / this.width);
    }

    public onLanguageChanged(): void {
        this.text = Dispatcher.getLanguageText(this.props.key, this.props.placeholders, this.props.textFormat)
        this.fitWidth();
        this.props.centerAfterLanguageChanged && Pivot.center(this);
    }

    destroy(): void {
        removeEventListener(FrameworkEvents.LANGUAGE_CHANGED, this.onLanguageChangedBindThis);
        this.onLanguageChangedBindThis = null;
        this.props = null;

        super.destroy();
    }
}
