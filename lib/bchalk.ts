/**
 *
 * BChalk - Colorize and style text in console
 *
 * notes:
 * 	- When logging without calling toString or valueOf we imply trough the Symbol.for
 * 	that Bun should render the text as a string this has some consequences.
 *
 * 		=> bchalk('test') === bchalk('test') [X]: False
 *		=> bchalk('test').toString() (or valueOf) === bchalk('test').toString() (or valueOf) [V]: true
 *
 */

export enum TEXT_DECORATION {
	Reset = 0,
	Bold = 1,
	Dim = 2,
	Italic = 3,
	Underline = 4,
	Blink = 5,
	Reverse = 7,
	Hidden = 8,
	Strikethrough = 9,
}

export enum FOREGROUND_COLORS {
	Black = 30,
	Red = 31,
	Green = 32,
	Yellow = 33,
	Blue = 34,
	Magenta = 35,
	Cyan = 36,
	White = 37,
	BrightBlack = 90,
	BrightRed = 91,
	BrightGreen = 92,
	BrightYellow = 93,
	BrightBlue = 94,
	BrightMagenta = 95,
	BrightCyan = 96,
	BrightWhite = 97,
}

export enum BACKGROUND_COLORS {
	Black = 40,
	Red = 41,
	Green = 42,
	Yellow = 43,
	Blue = 44,
	Magenta = 45,
	Cyan = 46,
	White = 47,
	BrightBlack = 100,
	BrightRed = 101,
	BrightGreen = 102,
	BrightYellow = 103,
	BrightBlue = 104,
	BrightMagenta = 105,
	BrightCyan = 106,
	BrightWhite = 107,
}

class BChalk {
	private text: string;
	private fg?: FOREGROUND_COLORS;
	private bg?: BACKGROUND_COLORS;
	private styles: TEXT_DECORATION[] = [];

	constructor(text: string) {
		this.text = text;
	}

	foreground(color: FOREGROUND_COLORS): this {
		this.fg = color;
		return this;
	}

	background(color: BACKGROUND_COLORS): this {
		this.bg = color;
		return this;
	}

	decoration(styles: TEXT_DECORATION[]): this {
		this.styles = styles;
		return this;
	}

	toString(): string {
		const codes = [
			...this.styles,
			...(this.fg !== undefined ? [this.fg] : []),
			...(this.bg !== undefined ? [this.bg] : []),
		];
		return `\x1b[${codes.join(";")}m${this.text}\x1b[0m`;
	}

	valueOf(): string {
		return this.toString();
	}

	[Symbol.for("nodejs.util.inspect.custom")]() {
		return this.toString();
	}
}

export function bchalk(text: string): BChalk {
	return new BChalk(text);
}
