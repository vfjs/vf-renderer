
export * from './const';
export * from './math';

import * as utils from './utils';
import * as ticker from './ticker';
import WebGLRenderer from './renderer/WebGLRenderer';

export { utils,ticker,WebGLRenderer };

export { default as DisplayObject } from './display/DisplayObject';
export { default as Container } from './display/Container';
export { default as BaseTexture } from './textures/BaseTexture';
export { default as Texture } from './textures/Texture';
export { default as Sprite } from './sprites/Sprite';
export { default as SpriteRenderer } from './sprites/SpriteRenderer';


if (typeof window !== 'undefined')
{
    window.vf = window.vf || {};
    window.vf.renderer = exports;

    global.PIXI = exports;
}