import { Light } from './engine/light';
import { Globals } from './globals';
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