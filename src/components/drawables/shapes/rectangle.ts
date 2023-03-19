import { Drawable } from '../../../engine/drawable';
import { Rect } from '../../so/rect';

export class Rectangle extends Drawable {

	constructor(rect: Rect) {
		super();
		this.rect = rect;
	}

	draw() {
		super.draw();
		this.context.fillRect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);
	}
}