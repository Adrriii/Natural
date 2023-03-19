import { Drawable } from '../../engine/drawable';
import { Text } from '../../components/drawables/text';

export class Button extends Drawable {

	text: Text | undefined;

	setText(text: Text): this {
		text.rect = this.rect;
		this.text = text;
		return this;
	}
    
	onHoverStart() {
		this.color.r += 15;
		this.color.g += 15;
		this.color.b += 15;
	}
    
	onHoverStop() {
		this.color.r -= 15;
		this.color.g -= 15;
		this.color.b -= 15;
	}

	onDragStart() {
		this.r = Math.random() * 255;
		this.g = Math.random() * 255;
		this.b = Math.random() * 255;

		if(this.text) {
			this.text.r = Math.random() * 255;
			this.text.g = Math.random() * 255;
			this.text.b = Math.random() * 255;
		}
	}

	whileDrag() {}
    
	draw() {
		super.draw();
		this.context.fillRect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);

		if(this.text) {
			this.text.draw();
		}
	}
}