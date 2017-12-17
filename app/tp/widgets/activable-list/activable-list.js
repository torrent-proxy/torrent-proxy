goog.provide('tp.widgets.ActivableList');
goog.require('tp.struct.ActivableCyclicDataList');
goog.require('zb.widgets.CuteWidget');


/**
 * @template T
 * @extends {zb.widgets.CuteWidget}
 * @constructor
 * @abstract
 */
tp.widgets.ActivableList = class extends zb.widgets.CuteWidget {
    constructor() {
        super();

        /**
         * @type {number}
         * @protected
         */
        this._offset = 0;


        /**
         * @const {string}
         */
        this.EVENT_ITEM_CLICK = 'item-click';


        /**
         * @const {string}
         */
        this.EVENT_ITEM_ACTIVATE = 'item-activate';


        /**
         * @const {string}
         */
        this.EVENT_ACTIVATED_ITEM_CLICK = 'activated-item-clicked';


        /**
         * @const {number}
         */
        this.ACTIVATE_ITEM_TIMEOUT = 2 * 1000;

        /**
         * @type {tp.struct.ActivableCyclicDataList<T>}
         * @protected
         */
        this._items = new tp.struct.ActivableCyclicDataList([]);

        this._items.on(this._items.EVENT_ITEM_SELECTED, this._onItemSelected.bind(this));
        this._items.on(this._items.EVENT_ITEM_ACTIVATE, this._onItemActivated.bind(this));

        this._setupScrollBar();
    }


    /**
     * @override
     */
    focus(opt_prev) {
        super.focus(opt_prev);

        this._render();
    }


    /**
     * @override
     */
    blur() {
        super.blur();

        this._render();
    }


    /**
     * @override
     */
    getFocusedRect() {
        return this.getContainerRect();
    }


    /**
     * @return {?T}
     */
    getActivatedItem() {
        return this._items.activated();
    }


    /**
     * @return {boolean}
     */
    activateNext() {
        return this._items.activateNext(true);
    }


    /**
     * @return {?T}
     */
    getNext() {
        var currentActivatedIndex = this._items.activatedIndex();

        if (currentActivatedIndex === null) {
            return null;
        }

        return this._items.itemAt(currentActivatedIndex + 1);
    }


    /**
     * @return {?T}
     */
    getPrev() {
        var currentActivatedIndex = this._items.activatedIndex();

        if (currentActivatedIndex === null) {
            return null;
        }

        return this._items.itemAt(currentActivatedIndex - 1);
    }


    /**
     * @return {boolean}
     */
    activatePrev() {
        return this._items.activatePrev(true);
    }


    /**
     * @param {Array<T>} items
     * @param {number=} opt_preactivatedItemIndex
     */
    setItems(items, opt_preactivatedItemIndex) {
        this._offset = 0;
        this._items.setItems(items);
        var size = this._getNodes().length;
        var padding = 1;

        if (typeof opt_preactivatedItemIndex === 'number') {
            this._offset = opt_preactivatedItemIndex - size + padding;
            this._items.selectAt(opt_preactivatedItemIndex);
            this._items.activateCurrent();
        }

        var total = this._items.size();
        var thumbSize = Math.round(size / total * 100);
        this._getScrollBar().setThumbSize(thumbSize);

        this._render();
    }


    /**
     * @override
     */
    _processKey(zbKey, opt_e) {
        var isHandled = false;
        switch (zbKey) {
            case zb.device.input.Keys.DOWN:
                isHandled = this._items.selectNextItem();
                break;
            case zb.device.input.Keys.UP:
                isHandled = this._items.selectPrevItem();
                break;
            case zb.device.input.Keys.ENTER:
                this._processEnterKey();
                isHandled = true;
                break;
        }

        return isHandled || super._processKey(zbKey, opt_e);
    }


    /**
     * @protected
     */
    _processEnterKey() {
        this._fireEvent(this.EVENT_ITEM_CLICK, this._items.current());

        if (!this._items.activateCurrent()) {
            this._fireEvent(this.EVENT_ACTIVATED_ITEM_CLICK, this._items.activated());
        }
    }


    /**
     * @param {string} eventName
     * @param {T} item
     * @param {number} index
     * @param {T} prevItem
     * @param {number} prevIndex
     * @protected
     */
    _onItemSelected(eventName, item, index, prevItem, prevIndex) {
        if (!isNaN(index) && !isNaN(prevIndex)) {
            var startIndex = 0;
            var lastIndex = this._items.size() - 1;

            var fromFirstToLast = index === lastIndex && prevIndex === startIndex;
            var fromLastToFirst = index === startIndex && prevIndex === lastIndex;

            if (fromFirstToLast) {
                this._offset = lastIndex;
            } else if (fromLastToFirst) {
                this._offset = startIndex;
            }
        }

        if (!isNaN(index)) {
            var padding = 1;
            var size = this._getNodes().length;
            var maxIndex = size - 1 - padding;
            var minIndex = 0 + padding;
            var visualIndex = index - this._offset;

            var diff = 0;
            if (visualIndex > maxIndex) {
                diff = 1;
            } else if (visualIndex < minIndex) {
                diff = -1;
            }

            this._offset += diff;
            this._offset = Math.max(0, Math.min(this._items.size() - size, this._offset));
        }

        this._render();
    }


    /**
     * @param {string} eventName
     * @param {T} activated
     * @param {T} prev
     * @protected
     */
    _onItemActivated(eventName, activated, prev) {
        this._updateActivatedClass(prev);
        this._updateActivatedClass(activated);
        this._fireEvent(this.EVENT_ITEM_ACTIVATE, activated);
    }


    /**
     * @protected
     */
    _render() {
        var offset = this._offset;
        var nodes = this._getNodes();
        var size = nodes.length;
        var items = this._items ? this._items.toArray() : [];
        var piece = items.slice(offset, offset + size);

        for (var i = 0; i < nodes.length; i++) {
            this._renderItem(piece[i] || null, nodes[i]);
        }

        var total = this._items.size();
        var pos = Math.round(this._offset / (total - size) * 100);
        this._getScrollBar().setThumbPosition(pos);
    }


    /**
     * @param {T} item
     * @param {HTMLElement=} opt_node
     * @protected
     */
    _renderItem(item, opt_node) {
        var node = opt_node || this._getNodeByItem(item);

        if (!node) {
            return;
        }

        var style = node.style;
        style.visibility = item ? '' : 'hidden';
        zb.html.updateClassName(node, '_active', this.isFocused() && item === this._items.current());
        this._updateActivatedClass(item, node);

        if (item) {
            this._updateNodeData(node, item);
        }
    }


    /**
     * @param {T} item
     * @param {HTMLElement=} opt_node
     * @protected
     */
    _updateActivatedClass(item, opt_node) {
        var node = opt_node || this._getNodeByItem(item);

        if (!node) {
            return;
        }

        zb.html.updateClassName(node, '_activated', item === this._items.activated());
    }


    /**
     * @param {T} item
     * @return {?HTMLElement}
     * @protected
     */
    _getNodeByItem(item) {
        var index = this._items ? this._items.toArray().indexOf(item) : -1;

        if (index === -1) {
            return null;
        }

        return this._getNodes()[index - this._offset];
    }


    /**
     * @param {HTMLElement} node
     * @param {T} item
     * @protected
     * @abstract
     */
    _updateNodeData(node, item) {
    }


    /**
     * @protected
     * @abstract
     */
    _setupScrollBar() {
    }


    /**
     * @return {zb.ui.ScrollBar}
     * @protected
     * @abstract
     */
    _getScrollBar() {
    }


    /**
     * @return {Array<HTMLElement>}
     * @protected
     * @abstract
     */
    _getNodes() {
    }
};
