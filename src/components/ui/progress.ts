import { Drawable } from '../../engine/drawable';
import { Text } from '../../components/drawables/text';
import { Rectangle } from '../drawables/shapes/rectangle';
import { Rect } from '../so/rect';
import { Color } from '../so/color';

export class Progress extends Drawable {

	private _currentProgress = 0.0;
	get currentProgress(): number {
		return this._currentProgress;
	}
	set currentProgress(progress: number) {
		this._currentProgress = progress;
		this.updateText();
		this.updateProgress();
	}
	displayPercent = true;

	background!: Rectangle;
	progressBar!: Rectangle;
	percent!: Text;
	percentForeground!: Text;

	constructor() {
		super();

		this.setRect(new Rect(0, 0, 0, 0));
		this.setText(new Text());
		this.setForegroundText(new Text());

		this.setHover(true);
		this.setDrag(false);
	}

	setRect(rect: Rect): this {
		this.background = new Rectangle(rect);
		this.progressBar = new Rectangle(new Rect(
			rect.x,
			rect.y,
			0,
			rect.h
		));

		this.updateProgress();

		return this;
	}

	setText(text: Text): this {
		this.percent = text;

		this.percent.rect.x = this.background.x + this.background.w / 2;
		this.percent.rect.y = this.background.y + this.background.h / 2;

		this.updateText();

		return this;
	}

	setForegroundText(text: Text): this {
		this.percentForeground = text;

		this.percentForeground.rect.x = this.background.x + this.background.w / 2;
		this.percentForeground.rect.y = this.background.y + this.background.h / 2;

		this.updateText();

		return this;
	}

	setBackgroundColor(color: Color): this {
		this.background.color = color;
		return this;
	}

	setProgressBarColor(color: Color): this {
		this.progressBar.color = color;
		return this;
	}

	updateText(): void {
		const text = `${(this._currentProgress*100).toFixed(2)} %`;

		this.percent?.setText(text);
		this.percentForeground?.setText(text);
	}

	updateProgress(): void {
		this.progressBar.w = this.background.w * this._currentProgress;
	}

	setDisplayPercent(display: boolean): this {
		this.displayPercent = display;
		return this;
	}
    
	onHoverStart() {
		this.background.onHoverStart();
		this.progressBar.onHoverStart();
	}
    
	onHoverStop() {
		this.background.onHoverStop();
		this.progressBar.onHoverStop();
	}
    
	draw() {
		super.draw();
		
		this.background.draw();

		if(this.displayPercent) {
			this.percent.draw();
		}

		this.progressBar.draw();
		
		if(this.displayPercent) {
			this.context.save();
			this.context.rect(
				this.progressBar.x,
				this.progressBar.y,
				this.progressBar.w,
				this.progressBar.h
			);
			this.context.clip();

			this.percentForeground.draw();
			this.context.restore();
		}
	}
}