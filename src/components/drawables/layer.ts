import { Drawable } from '../../engine/drawable';
import { Dynamic } from '../../engine/dynamic';
import { Globals } from '../../globals';
import { Point } from '../so/point';
import { Rect } from '../so/rect';

/**
 * Layer of elements to draw and interact with.
 * Parameterize whether the layer allows hovering/dragging with the Dynamic methods.
 */
export class Layer extends Dynamic {
	drawables: Drawable[];
	
	constructor() {
		super();
		this.drawables = [];
	}

	/**
	 * Add a drawable in front
	 */
	addDrawable(drawable: Drawable): this {
		this.drawables.push(drawable);
		return this;
	}

	/**
	 * Remove any drawable from this layers
	 */
	removeDrawable(drawable: Drawable): this {
		const i = this.drawables.findIndex((el) => el == drawable);
		if(i == -1) {
			// Drawable already doesn't exist in this layer
			return this;
		}
		this.drawables.splice(i, 1);
		return this;
	}

	/**
	 * Put a drawable on top
	 */
	onTop(drawable: Drawable) {
		this.removeDrawable(drawable).addDrawable(drawable);
		return this;
	}

	/**
	 * Draw loop
	 */
	draw(): this {
		this.drawables.forEach(element => {
			if(element.isInbounds(new Rect(0, 0, Globals.VIEWER.canvas.width,  Globals.VIEWER.canvas.height))) {
				element.draw();
			}
		});
		return this;
	}

	/**
	 * Update loop
	 */
	update(): this {
		// Update the elements starting with those in front to consume events in order
		this.drawables.reduceRight((_prev, element: Drawable) => {
			// Mouse actions
			if(element.isTouched(Globals.MOUSEPOS)) {
				// Check for a click on an element
				if(this.drag && element.draggable() && Globals.HOLD == 1) {
					// We start the drag logic
					// The rest is handled globally
					Globals.DRAGGED.push(element);
					Globals.DRAGPOS = new Point(Globals.MOUSEPOS.x - element.x, Globals.MOUSEPOS.y - element.y);
					Globals.HOLD = 0;
					if(element.onTopOnClick) {
						this.onTop(element);
					}
					element.onDragStart();
				} else if (this.hover && !Globals.HOVERED) {
					// Hover the first object and consume
					// Even if the object is not hoverable, it consumes the event
					// Dragging an object does count as hovering (planned: parameterize this in Dynamic)
					Globals.HOVERED = true;
					if(element.hover && !Globals.DRAGGED.includes(element)) {
						if(!element.hovered) {
							element.hovered = true;
							element.onHoverStart();
						} else {
							element.onHover();
						}
					}
				}
			} else if (element.hovered) {
				element.hovered = false;
				element.onHoverStop();
			}
			
			element.update();
				
			return null;
		}, null);
		return this;
	}
}