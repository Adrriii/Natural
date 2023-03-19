// convert getter lines (with * at the end) to add setters
// \tget (.*) \(\) \{ return (.*); \};*
// \tget $1 () { return $2; };\n\tset $1 ($1) { $2 = $1; };\n

import { Color } from '../components/so/color';
import { Point } from '../components/so/point';
import { Rect } from '../components/so/rect';
import { Dynamic } from './dynamic';
import { Globals } from '../globals';

/**
 * An element that can be drawn and posesses a hitbox.
 */
export class Drawable extends Dynamic {
	rect: Rect;
	color: Color;

	get context () { return Globals.VIEWER; }

	// Color properties direct access
	get x () { return this.rect.x; }
	set x (x) { this.rect.x = x; }

	get y () { return this.rect.y; }
	set y (y) { this.rect.y = y; }

	get w () { return this.rect.w; }
	set w (w) { this.rect.w = w; }

	get h () { return this.rect.h; }
	set h (h) { this.rect.h = h; }

	// Rect properties direct access
	get r () { return this.color.r; }
	set r (r) { this.color.r = r; }

	get g () { return this.color.g; }
	set g (g) { this.color.g = g; }

	get b () { return this.color.b; }
	set b (b) { this.color.b = b; }

	get a () { return this.color.a; }
	set a (a) { this.color.a = a; }

	constructor() {
		super();
		this.rect = new Rect(0, 0, 0, 0);
		this.color = new Color(0, 0, 0, 1);
	}

	setColor(color: Color): this {
		this.color = color;
		return this;
	}

	setRect(rect: Rect): this {
		this.rect = rect;
		return this;
	}
	
	isInbounds(bounds: Rect): boolean {
		return this.x <= bounds.x + bounds.w && this.x + this.w >= bounds.x && this.y <= bounds.y + bounds.h && this.y + this.h >= bounds.y;
	}

	isTouched(point: Point): boolean {
		return point.x >= this.x && point.x <= this.x + this.w && point.y >= this.y && point.y <= this.y + this.h;
	}

	setFillStyle(color: Color): void {
		this.context.fillStyle = 'rgba('+color.r+','+color.g+','+color.b+','+color.a+')';
	}

	draw(): void {
		this.setFillStyle(this.color);
	}

	update(): void {}
}