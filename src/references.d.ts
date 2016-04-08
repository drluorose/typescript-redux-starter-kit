/// <reference path="../typings/browser.d.ts" />

interface Window {
    __INITIAL_STATE__: any;
    devToolsExtension : any;
}

declare var __INITIAL_STATE__: any;
declare var __DEBUG__: boolean;
declare var __DEBUG_NEW_WINDOW__: boolean;

declare var module: any;

declare var window: Window;

declare var require: {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};