import { Globals } from '../globals';

export class Light {

	static get GLOBALS () { return Globals; }
	static get LAYERS () { return Globals.LAYERS; }

	protected drawLoopHandler: NodeJS.Timer | undefined;
	protected updateLoopHandler: NodeJS.Timer | undefined;

	/**
	 * Capture the canvas and initialize the engine
	 */
	constructor() {
		onmousemove = function(e){
			Globals.MOUSEPOS.x = e.clientX;
			Globals.MOUSEPOS.y = e.clientY;
		};
		onmousedown = function(){
			if(Globals.HOLD == 0) {
				Globals.HOLD = 1;
			}
		};
		onmouseup = function(){
			Globals.HOLD = 2;
		};

		const body = document.getElementsByTagName('body')[0];
		body.style.padding = '0px';
		body.style.margin = '0px';
		body.style.overflow = 'hidden';

		const canvas: HTMLCanvasElement = document.createElement('canvas');
		canvas.setAttribute('id', 'viewer');
		body.appendChild(canvas);

		if(!canvas) {
			document.getElementsByTagName('body')[0].innerHTML = 'Unable to load canvas : Not found.';
			return;
		}
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		const context = canvas.getContext('2d');
		
		if(!context) {
			document.getElementsByTagName('body')[0].innerHTML = 'Unable to load canvas : Could not initialize 2D Context.';
			return;
		}

		Globals.VIEWER = context;
		Globals.STARTTIME = Date.now();

		Globals.READY = true;
	}

	/**
	 * Removes all from the canvas
	 */
	static clearCanvas(): void {
		Globals.VIEWER.clearRect(0, 0, Globals.VIEWER.canvas.width, Globals.VIEWER.canvas.height);
		Globals.VIEWER.beginPath();
	}

	setView(func: () => void): void {
		if(this.drawLoopHandler !== undefined) {
			clearInterval(this.drawLoopHandler);
		}
		this.drawLoopHandler = setInterval(func, Globals.DRAW_RATE);
	}

	setUpdate(func: () => void): void {
		if(this.updateLoopHandler !== undefined) {
			clearInterval(this.updateLoopHandler);
		}
		this.updateLoopHandler = setInterval(func, Globals.UPDATE_RATE);
	}
	
	/**
	 * Draw loop
	 */
	viewTick(): void {
		Light.clearCanvas();
		Globals.LAYERS.BACKGROUND.draw();
		Globals.LAYERS.FOREGROUND.draw();
		Globals.LAYERS.OVERLAY.draw();
	}
	
	/**
	 * Update loop
	 */
	updateTick(): void {
		// Update the application clock
		Globals.TIME = Date.now() - Globals.STARTTIME;

		// Unlock the hover event
		Globals.HOVERED = false;

		// Undrag on release
		if(Globals.HOLD == 2) {
			Globals.DRAGGED.forEach(el => el.onDragEnd());
			Globals.DRAGGED = [];
			Globals.HOLD = 0;
		}
	
		// Trigger layer updates
		Globals.LAYERS.OVERLAY.update();
		Globals.LAYERS.FOREGROUND.update();
		Globals.LAYERS.BACKGROUND.update();

		// If the click was not consumed, cancel
		if(Globals.HOLD == 1) {
			Globals.HOLD = 0;
		}
	
		Globals.DRAGGED.forEach(el => el.whileDrag());
	}
}