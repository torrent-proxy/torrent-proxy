goog.provide('tp.struct.ActivableCyclicDataList');
goog.require('zb.ui.CyclicalDataList');



/**
 * @template T
 * @param {Array<T>=} opt_items
 * @extends {zb.ui.CyclicalDataList}
 * @constructor
 */
tp.struct.ActivableCyclicDataList = class extends zb.ui.CyclicalDataList {
	constructor(opt_items) {
        super(opt_items);

        /**
         * @type {?T}
         * @private
         */
        this._activatedItem = null;

        /**
         * Fires with: current: T, prev: T
         * @const {string}
         */
        this.EVENT_ITEM_ACTIVATE = 'item-activate';
    };

    /**
     * @return {boolean}
     */
    isSynchronized() {
        return this._activatedItem === this.current();
    }


    /**
     * @return {?T}
     */
    activated() {
        return this._activatedItem;
    }



    /**
     * @return {boolean}
     */
    activateCurrent() {
        return this.activate(this.current());
    }



    /**
     * @param {T} item
     * @return {boolean}
     */
    activate(item) {
        var isChanged = item !== this._activatedItem;

        if (isChanged) {
            var prevActivatedItem = this._activatedItem;
            this._activatedItem = item;

            this._fireEvent(this.EVENT_ITEM_ACTIVATE, this._activatedItem, prevActivatedItem);
        }

        return isChanged;
    }



    /**
     * @param {boolean} sync
     * @return {boolean}
     */
    activateNext(sync) {
        var changed = this.activate(this.itemAt(this.currentIndex() + 1));

        if (sync) {
            this.selectNextItem();
        }

        return changed;
    }


    /**
     * @param {boolean} sync
     * @return {boolean}
     */
    activatePrev(sync) {
        var changed = this.activate(this.itemAt(this.currentIndex() - 1));

        if (sync) {
            this.selectPrevItem();
        }

        return changed;
    }


    /**
     * @return {?number}
     */
    activatedIndex() {
        if (!this._activatedItem) {
            return null;
        }

        return this._items.indexOf(/** @type {!T} */(this._activatedItem));
    }
};
