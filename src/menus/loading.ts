import { Color } from '../components/so/color';
import { Rect } from '../components/so/rect';
import { Progress } from '../components/ui/progress';
import { Text } from '../components/drawables/text';
import { Game } from '../game';
import { Menu } from './menu';

export class Loading extends Menu {

	progress!: Progress;

	constructor() {
		super();
		this.init();
	}

	init(): void {
		this.progress = (new Progress())
			.setRect(new Rect(300, 300, 500, 70))
			.setBackgroundColor(new Color(20, 20, 20, 1))
			.setProgressBarColor(new Color(220, 220, 220, 1))
			.setText(
				(new Text()
					.setColor(new Color(255,255,255,1)))
			)
			.setForegroundText(
				(new Text()
					.setColor(new Color(0,0,0,1)))
			);

		Game.LAYERS.FOREGROUND.addDrawable(
			this.progress
		);
	}

	tick(): void {
		this.progress.currentProgress = Math.min(1, this.progress.currentProgress + 0.00037);
	}
}