import { Light } from './engine/light';
import { Button } from './components/ui/button';
import { Rectangle } from './components/drawables/shapes/rectangle';
import { Rect } from './components/so/rect';
import { Color } from './components/so/color';
import { Text } from './components/drawables/text';
import { Globals } from './globals';
import { Progress } from './components/ui/progress';
import { Loading } from './menus/loading';
import { Menu } from './menus/menu';

export class Game extends Light {

	currentMenu: Menu | undefined;
	
	constructor() {
		super();
		const self = this;
		
		this.setView(() => self.viewTick());
		this.setUpdate(() => self.updateTick());
		
		this.currentMenu = new Loading();
	}

	viewTick(): void {
		super.viewTick();
	}
	
	updateTick(): void {
		super.updateTick();
		
		this.currentMenu?.tick();		
	}
}

(function() {
	Globals.DRAW_RATE = 16;
	Globals.UPDATE_RATE = 1;
	new Game();
})();