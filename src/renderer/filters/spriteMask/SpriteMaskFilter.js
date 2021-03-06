import Filter from '../Filter';
import { Matrix } from '../../../math';
import { default as TextureMatrix } from '../../../textures/TextureMatrix';

import vs from './spriteMaskFilter.vert';
import fs from './spriteMaskFilter.frag';

/**
 * The SpriteMaskFilter class
 *
 * @class
 * @extends SINT.Filter
 * @memberof SINT
 */
export default class SpriteMaskFilter extends Filter
{
    /**
     * @param {SINT.Sprite} sprite - the target sprite
     */
    constructor(sprite)
    {
        const maskMatrix = new Matrix();

        super(vs,fs);

        sprite.renderable = false;

        this.maskSprite = sprite;
        this.maskMatrix = maskMatrix;
    }

    /**
     * Applies the filter
     *
     * @param {SINT.FilterManager} filterManager - The renderer to retrieve the filter from
     * @param {SINT.RenderTarget} input - The input render target.
     * @param {SINT.RenderTarget} output - The target to output to.
     */
    apply(filterManager, input, output)
    {
        const maskSprite = this.maskSprite;
        const tex = this.maskSprite.texture;

        if (!tex.valid)
        {
            return;
        }
        if (!tex.transform)
        {
            // margin = 0.0, let it bleed a bit, shader code becomes easier
            // assuming that atlas textures were made with 1-pixel padding
            tex.transform = new TextureMatrix(tex, 0.0);
        }
        tex.transform.update();

        this.uniforms.mask = tex;
        this.uniforms.otherMatrix = filterManager.calculateSpriteMatrix(this.maskMatrix, maskSprite)
            .prepend(tex.transform.mapCoord);
        this.uniforms.alpha = maskSprite.worldAlpha;
        this.uniforms.maskClamp = tex.transform.uClampFrame;

        filterManager.applyFilter(this, input, output);
    }
}
