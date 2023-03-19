import { Drawable } from '../../engine/drawable';

/**
 * Inject text properties
 */
export class Text extends Drawable {

	font!: string;
	text!: string;
	textInfo!: TextMetrics;

	constructor() {
		super();
		this.setFont('32px serif');
		this.setText('');
	}

	setText(text: string): this {
		this.text = text;
		this.context.font = this.font;
		this.textInfo = this.context.measureText(this.text);
		return this;
	}

	setFont(font: string): this {
		this.font = font;
		return this;
	}

	draw(): void {
		if(this.text.length > 0) {
			super.draw();
			this.context.font = this.font;
			const x = this.rect.x + this.rect.w/2 - Math.floor(this.textInfo.width / 2);
			const y = this.rect.y + this.rect.h/2 + Math.floor((this.textInfo.actualBoundingBoxAscent + this.textInfo.actualBoundingBoxDescent) / 2);
			this.context.fillText(this.text, x, y);
		}
	}
}