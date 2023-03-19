import { Globals } from '../globals';
import { Rect } from '../components/so/rect';

/**
 * Inject hover/drag logic
 */
export const dynamicMixin = (Base: ObjectConstructor) => class extends Base {
	hover: boolean;
	drag: boolean;
	bound: boolean;
	onTopOnClick: boolean;

	rect!: Rect;
	
	hovered: boolean;

	constructor() {
		super();
		this.hover = false;
		this.drag = false;
		this.bound = false;
		this.hovered = false;
		this.onTopOnClick = false;
	}

	/**
	 * Whether the object is bound to the canvas
	 */
	setBound(mode: boolean): this {
		this.bound = mode;
		return this;
	}

	/**
	 * Whether the object goes on top of the layer when interacted with
	 */
	setOnTopOnClick(mode: boolean): this {
		this.onTopOnClick = mode;
		return this;
	}

	///// HOVER LOGIC /////

	/**
	 * Whether the object can be hovered
	 */
	setHover(mode: boolean): this {
		this.hover = mode;
		return this;
	}

	/**
	 * Triggered for when object starts to get hovered
	 */
	onHoverStart() {}

	/**
	 * Triggered for each tick when object is hovered
	 */
	onHover() {}

	/**
	 * Triggered for when object is no longer hovered
	 */
	onHoverStop() {}
	
	///// DRAG LOGIC /////
	
	/**
	 * Whether the object can be dragged
	 */
	setDrag(mode: boolean): this {
		this.drag = mode;
		return this;
	}
	
	/**
	 * Triggered when the user first clicks on the object
	 */
	onDragStart() {}

	/**
	 * Triggered for each tick when the user holds the object
	 */
	whileDrag() {
		if(!Globals.DRAGPOS || !this.rect) return;
		const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

		const x = Globals.MOUSEPOS.x - Globals.DRAGPOS.x;
		const y = Globals.MOUSEPOS.y - Globals.DRAGPOS.y;

		this.rect.x = this.bound ? clamp(x, 0, Globals.VIEWER.canvas.width - this.rect.w) : x;
		this.rect.y = this.bound ? clamp(y, 0, Globals.VIEWER.canvas.height - this.rect.h) : y;
	}

	/**
	 * Triggered when the user releases the object
	 */
	onDragEnd() {}
	
	dragged = (): boolean => Globals.DRAGGED.includes(this); // optimize by adding a flag on drag start/end
	draggable = (): boolean => this.drag && (this.dragged() || Globals.DRAGGED.length == 0);
};

export class Dynamic extends dynamicMixin(Object) {}