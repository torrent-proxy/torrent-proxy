goog.provide('tp.widgets.DataList');
goog.require('tp.widgets.ActivableList');
goog.require('tp.widgets.templates.dataList.dataList');



/**
 * @extends {tp.widgets.ActivableList}
 * @constructor
 */
tp.widgets.DataList = class extends tp.widgets.ActivableList {
    constructor() {
        super();

        /**
         * @type {tp.widgets.templates.dataList.DataListLineOut}
         * @protected
         */
        this._exported;
    }


    /**
     * @override
     */
    _updateNodeData(node, item) {
        var index = this._getNodes().indexOf(/** @type {HTMLDivElement} */(node));
        zb.html.text(this._exported.title[index], item.title);
        zb.html.text(this._exported.magnet[index], item.magnet);
        zb.html.updateClassName(node, '_active', this.isFocused() && item === this._items.current());
    }


    /**
     * @override
     */
    _renderTemplate() {
        return tp.widgets.templates.dataList.dataList(this._getTemplateData(), this._getTemplateOptions());
    }


    /**
     * @override
     */
    _setupScrollBar() {
        this._getScrollBar().setVertical(true);
        this._getScrollBar().setThumb(this._exported.thumb);
    }


    /**
     * @override
     */
    _getScrollBar() {
        return this._exported.scrollBar;
    }


    /**
     * @override
     */
    _getNodes() {
        return this._exported.nodes;
    }
};
