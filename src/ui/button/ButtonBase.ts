import {ColorMatrixFilter} from "@pixi/filter-color-matrix";
import {TweenMax} from "gsap";
import * as PIXI from "pixi.js";
import {InteractionEvent} from "pixi.js";
import {FrameworkEvents} from "../../FrameworkEvents";
import {HoverableObject} from "../interaction/HoverableObject";


export class ButtonBase extends HoverableObject {
    private filter: ColorMatrixFilter;
    private tween: TweenMax;
    private onConnectionChangeBind: (e: MessageEvent) => void;
    private _enabledByConnection: boolean = true;
    private _enabledByGameLogic: boolean = true;
    private alreadyClicked: boolean = false;
    hasSound: boolean = true;
    cooldownTime: number = 2000;

    constructor(private onClick: Function = null,
                private clickEventName = FrameworkEvents.CLICK_EVENT_NAME,
                private enabledOnlineOnly: boolean = false,
                private withCooldown: boolean = false,
                private oneTimeOnly: boolean = false
    ) {
        super();
        this.on(this.clickEventName, this.processClick, this);
        this.enabled = true;

        this.filter = new PIXI.filters.ColorMatrixFilter();
        this.filter.resolution = window.devicePixelRatio;
        this.filters = [];
        this.brightness = 1;

        this.onConnectionChangeBind = this.onConnectionChange.bind(this);
        addEventListener(FrameworkEvents.CONNECTION_CHANGE, this.onConnectionChangeBind);
    }

    private _brightness: number;

    get brightness(): number {
        return this._brightness;
    }

    set brightness(val: number) {
        if (!this.filters) {
            return;
        }
        if (val > .99) {
            this.filters.splice(this.filters.indexOf(this.filter), 1);
        } else {
            this._brightness = val;
            this.filter.brightness(this._brightness, false);
            this.filters.includes(this.filter) || this.filters.push(this.filter);
        }
    }

    set enabled(value: boolean) {
        this._enabledByGameLogic = value;
        this.updateTotalEnabledState();
    }

    processClick(e: InteractionEvent) {
        if (!this.cooldownCheck()) {
            return;
        }
        this.playSound();
        this.onClick && this.onClick(e);
        setInterval(() => {
            this?.onPointerOut && this.tween && this.onPointerOut();
        }, 500);

        if (this.oneTimeOnly) {
            this.enabled = false;
            this.brightness = .5;
        }
    }

    playSound(): void {
        // this.hasSound && SoundsPlayer.playWithoutFocus("buttonClick");
    }

    cooldownCheck(): boolean {
        if (this.alreadyClicked && this.withCooldown) {
            return false;
        }
        this.alreadyClicked = true;
        this.withCooldown && setTimeout(() => this.alreadyClicked = false, this.cooldownTime);
        return true;
    }

    onConnectionChange(e: MessageEvent) {
        let connected: boolean = e.data;
        this._enabledByConnection = connected || !this.enabledOnlineOnly;
        this.updateTotalEnabledState();
    }

    private updateTotalEnabledState() {
        let totalEnabled: boolean = this._enabledByConnection && this._enabledByGameLogic;
        this.interactive = this.interactiveChildren = this.buttonMode = totalEnabled;
        //totalEnabled && this.onPointerOut(null);
    }

    public destroy(): void {
        removeEventListener(FrameworkEvents.CONNECTION_CHANGE, this.onConnectionChangeBind);
        this.onConnectionChangeBind = null;

        this.off(this.clickEventName, this.processClick, this);
        this.tween?.kill();
        this.tween = null;

        this.filters = null;
        this.filter = null;

        this.onClick = null;

        super.destroy();
    }

    /**
     * Обработчик события pointerover
     * @param e Событие взаимодейтсвия пользователя
     */
    onPointerOver(_?: InteractionEvent): void {
        //this.scale.set(1.05);
    }

    /**
     * Обработчик события pointerout
     * @param e Событие взаимодейтсвия пользователя
     */
    onPointerOut(_?: InteractionEvent): void {
        this.brightness = 1;
        //this.scale.set(1);
    }

    /**
     * Обработчик события pointerdown
     * @param e Событие взаимодейтсвия пользователя
     */
    onPointerDown(_?: InteractionEvent): void {
        this.brightness = .9;
        //this.scale.set(1);
    }

    /**
     * Обработчик события pointerdown
     * @param e Событие взаимодейтсвия пользователя
     */
    onPointerUp(_?: InteractionEvent): void {
        this.brightness = 1;
        //this.scale.set(1.05);
    }
}


