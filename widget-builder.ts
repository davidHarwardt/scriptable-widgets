
type WidgetNestableEle = ListWidget | WidgetStack;
type WidgetNestable = WidgetNestableBuilder<WidgetNestableEle, any>;


type Fields<T> = { [k in keyof T]: Exclude<T[k], Function> };

class WidgetBaseBuilder<T, P extends WidgetNestable>
{
    protected _element: T;
    protected _parent: P;

    constructor(parent: P, element: T) { this._element = element; this._parent = parent; }

    set(attributes: Partial<Fields<T>>)
    {
        for(const k in attributes) { this._element[k as any] = attributes[k]; }
        return this;
    }

    public get element() { return this._element; }

    finish() { return this._parent; }
}

// text
class WidgetTextBuilder<P extends WidgetNestable> extends WidgetBaseBuilder<WidgetText, P>
{
    constructor(parent: P, text: string) { super(parent, parent.element.addText(text)); }

    leftAlignText() { this._element.leftAlignText(); return this; }
    centerAlignText() { this._element.centerAlignText(); return this; }
    rightAlignText() { this._element.rightAlignText(); return this; }
}

// date
class WidgetDateBuilder<P extends WidgetNestable> extends WidgetBaseBuilder<WidgetDate, P>
{
    constructor(parent: P, date: Date) { super(parent, parent.element.addDate(date)); }

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
class WidgetImageBuilder<P extends WidgetNestable> extends WidgetBaseBuilder<WidgetImage, P>
{
    constructor(parent: P, image: any) { super(parent, parent.element.addImage(image)); }

    leftAlignImage() { this._element.leftAlignImage(); return this; }
    centerAlignImage() { this._element.centerAlignImage(); return this; }
    rightAlignImage() { this._element.rightAlignImage(); return this; }

    applyFittingContentMode() { this._element.applyFittingContentMode(); return this; }
    applyFillingContentMode() { this._element.applyFillingContentMode(); return this; }
}

// spacer
class WidgetSpacerBuilder<P extends WidgetNestable> extends WidgetBaseBuilder<WidgetSpacer, P>
{
    constructor(parent: P, length: number) { super(parent, parent.element.addSpacer(length)); }
}

// stack
class WidgetNestableBuilder<T extends WidgetNestableEle, P extends WidgetNestable> extends WidgetBaseBuilder<T, P>
{
    constructor(parent: P, nestable: T) { super(parent, nestable); }

    addText(text: string): WidgetTextBuilder<this>          { return new WidgetTextBuilder(this, text); }
    addDate(date: Date): WidgetDateBuilder<this>            { return new WidgetDateBuilder(this, date); }
    addImage(image: any): WidgetImageBuilder<this>          { return new WidgetImageBuilder(this, image); }
    addSpacer(length: number): WidgetSpacerBuilder<this>    { return new WidgetSpacerBuilder(this, length); }
    addStack(): WidgetStackBuilder<this>                    { return new WidgetStackBuilder(this); }

    setPadding(top: number, leading: number, bottom: number, trailing: number) { this._element.setPadding(top, leading, bottom, trailing); return this; }
    useDefaultPadding() { this._element.useDefaultPadding(); return this; }
}

class WidgetStackBuilder<P extends WidgetNestable> extends WidgetNestableBuilder<WidgetStack, P>
{
    constructor(parent: P) { super(parent, parent.element.addStack()); }

    topAlignContent() { this._element.topAlignContent(); return this; }
    centerAlignContent() { this._element.centerAlignContent(); return this; }
    bottomAlignContent() { this._element.bottomAlignContent(); return this; }

    layoutHorizontally() { this._element.layoutHorizontally(); return this; }
    layoutVertically() { this._element.layoutVertically(); return this; }
}

class WidgetBuilder<P extends WidgetNestable> extends WidgetNestableBuilder<ListWidget, P>
{
    constructor() { super(undefined, new ListWidget()); }

    finishAll() { return this._element; }
}

module.exports = { WidgetBuilder };