class WidgetBaseBuilder {
    constructor(parent, element) { this._element = element; this._parent = parent; }
    set(attributes) {
        for (const k in attributes) {
            this._element[k] = attributes[k];
        }
        return this;
    }
    get element() { return this._element; }
    finish() { return this._parent; }
}
// text
class WidgetTextBuilder extends WidgetBaseBuilder {
    constructor(parent, text) { super(parent, parent.element.addText(text)); }
    leftAlignText() { this._element.leftAlignText(); return this; }
    centerAlignText() { this._element.centerAlignText(); return this; }
    rightAlignText() { this._element.rightAlignText(); return this; }
}
// date
class WidgetDateBuilder extends WidgetBaseBuilder {
    constructor(parent, date) { super(parent, parent.element.addDate(date)); }
    leftAlignText() { this._element.leftAlignText(); return this; }
    centerAlignText() { this._element.centerAlignText(); return this; }
    rightAlignText() { this._element.rightAlignText(); return this; }
    applyTimeStyle() { this._element.applyTimeStyle(); return this; }
    applyDateStyle() { this._element.applyDateStyle(); return this; }
    applyRelativeStyle() { this._element.applyRelativeStyle(); return this; }
    applyOffsetStyle() { this._element.applyOffsetStyle(); return this; }
    applyTimerStyle() { this._element.applyTimerStyle(); return this; }
}
// image
class WidgetImageBuilder extends WidgetBaseBuilder {
    constructor(parent, image) { super(parent, parent.element.addImage(image)); }
    leftAlignImage() { this._element.leftAlignImage(); return this; }
    centerAlignImage() { this._element.centerAlignImage(); return this; }
    rightAlignImage() { this._element.rightAlignImage(); return this; }
    applyFittingContentMode() { this._element.applyFittingContentMode(); return this; }
    applyFillingContentMode() { this._element.applyFillingContentMode(); return this; }
}
// spacer
class WidgetSpacerBuilder extends WidgetBaseBuilder {
    constructor(parent, length) { super(parent, parent.element.addSpacer(length)); }
}
// stack
class WidgetNestableBuilder extends WidgetBaseBuilder {
    constructor(parent, nestable) { super(parent, nestable); }
    addText(text) { return new WidgetTextBuilder(this, text); }
    addDate(date) { return new WidgetDateBuilder(this, date); }
    addImage(image) { return new WidgetImageBuilder(this, image); }
    addSpacer(length) { return new WidgetSpacerBuilder(this, length); }
    addStack() { return new WidgetStackBuilder(this); }
    setPadding(top, leading, bottom, trailing) { this._element.setPadding(top, leading, bottom, trailing); return this; }
    useDefaultPadding() { this._element.useDefaultPadding(); return this; }
}
class WidgetStackBuilder extends WidgetNestableBuilder {
    constructor(parent) { super(parent, parent.element.addStack()); }
    topAlignContent() { this._element.topAlignContent(); return this; }
    centerAlignContent() { this._element.centerAlignContent(); return this; }
    bottomAlignContent() { this._element.bottomAlignContent(); return this; }
    layoutHorizontally() { this._element.layoutHorizontally(); return this; }
    layoutVertically() { this._element.layoutVertically(); return this; }
}
class WidgetBuilder extends WidgetNestableBuilder {
    constructor() { super(undefined, new ListWidget()); }
    finishAll() { return this._element; }
}
module.exports = { WidgetBuilder };
