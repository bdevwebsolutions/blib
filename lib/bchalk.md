# BChalk

A lightweight and flexible library for colorizing and styling text in the console for Bun applications.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Introduction

BChalk provides an elegant and intuitive API for adding colors and styles to terminal output in your Bun applications. With chainable methods and an easy-to-use interface, you can quickly enhance your console logs with visual formatting.

## Usage

### Basic Usage

```typescript
import { bchalk } from "bchalk";

// Simple colored text
console.log(bchalk("Hello, world!").foreground(FOREGROUND_COLORS.Green));

// Chain multiple styles
console.log(
	bchalk("Important message")
		.foreground(FOREGROUND_COLORS.Red)
		.decoration([TEXT_DECORATION.Bold, TEXT_DECORATION.Underline])
);

// Background colors
console.log(
	bchalk("Warning")
		.background(BACKGROUND_COLORS.Yellow)
		.foreground(FOREGROUND_COLORS.Black)
);
```

### Available Colors and Styles

#### Foreground Colors

```typescript
import { bchalk, FOREGROUND_COLORS } from "bchalk";

console.log(bchalk("Red text").foreground(FOREGROUND_COLORS.Red));
console.log(bchalk("Green text").foreground(FOREGROUND_COLORS.Green));
console.log(bchalk("Bright Blue").foreground(FOREGROUND_COLORS.BrightBlue));
// See enum FOREGROUND_COLORS for all available options
```

#### Background Colors

```typescript
import { bchalk, BACKGROUND_COLORS } from "bchalk";

console.log(bchalk("Red background").background(BACKGROUND_COLORS.Red));
console.log(bchalk("Green background").background(BACKGROUND_COLORS.Green));
console.log(bchalk("Bright Blue bg").background(BACKGROUND_COLORS.BrightBlue));
// See enum BACKGROUND_COLORS for all available options
```

#### Text Decorations

```typescript
import { bchalk, TEXT_DECORATION } from "bchalk";

console.log(bchalk("Bold text").decoration([TEXT_DECORATION.Bold]));
console.log(bchalk("Underlined text").decoration([TEXT_DECORATION.Underline]));
console.log(
	bchalk("Bold and italic").decoration([
		TEXT_DECORATION.Bold,
		TEXT_DECORATION.Italic,
	])
);
// See enum TEXT_DECORATION for all available options
```

### Combining Styles

You can chain multiple styling methods together:

```typescript
import {
	bchalk,
	FOREGROUND_COLORS,
	BACKGROUND_COLORS,
	TEXT_DECORATION,
} from "bchalk";

// Bold, green text on black background
console.log(
	bchalk("Styled text")
		.foreground(FOREGROUND_COLORS.Green)
		.background(BACKGROUND_COLORS.Black)
		.decoration([TEXT_DECORATION.Bold])
);
```

## API Reference

### Main Function

#### `bchalk(text: string): BChalk`

Creates a new BChalk instance with the provided text.

### Methods

#### `foreground(color: FOREGROUND_COLORS): BChalk`

Sets the text color.

#### `background(color: BACKGROUND_COLORS): BChalk`

Sets the background color.

#### `decoration(styles: TEXT_DECORATION[]): BChalk`

Applies text decorations (bold, italic, underline, etc.).

#### `toString(): string`

Converts the styled text to a string.

#### `valueOf(): string`

Returns the string value of the styled text.

### Enums

#### `FOREGROUND_COLORS`

Available text colors:

- Black (30)
- Red (31)
- Green (32)
- Yellow (33)
- Blue (34)
- Magenta (35)
- Cyan (36)
- White (37)
- BrightBlack (90)
- BrightRed (91)
- BrightGreen (92)
- BrightYellow (93)
- BrightBlue (94)
- BrightMagenta (95)
- BrightCyan (96)
- BrightWhite (97)

#### `BACKGROUND_COLORS`

Available background colors:

- Black (40)
- Red (41)
- Green (42)
- Yellow (43)
- Blue (44)
- Magenta (45)
- Cyan (46)
- White (47)
- BrightBlack (100)
- BrightRed (101)
- BrightGreen (102)
- BrightYellow (103)
- BrightBlue (104)
- BrightMagenta (105)
- BrightCyan (106)
- BrightWhite (107)

#### `TEXT_DECORATION`

Available text decorations:

- Reset (0)
- Bold (1)
- Dim (2)
- Italic (3)
- Underline (4)
- Blink (5)
- Reverse (7)
- Hidden (8)
- Strikethrough (9)

## Important Notes

- When directly logging a BChalk instance without calling `toString()` or `valueOf()`, the library uses `Symbol.for("nodejs.util.inspect.custom")` to render the text.
- Due to this implementation, equality comparisons on BChalk instances will not work directly:
  ```typescript
  bchalk("test") === bchalk("test"); // False
  ```
- However, comparing the string values will work as expected:
  ```typescript
  bchalk("test").toString() === bchalk("test").toString(); // True
  bchalk("test").valueOf() === bchalk("test").valueOf(); // True
  ```

## Examples

### Simple Logger

```typescript
import { bchalk, FOREGROUND_COLORS, TEXT_DECORATION } from "bchalk";

function logger(level: "info" | "warn" | "error", message: string) {
	switch (level) {
		case "info":
			console.log(
				bchalk(`[INFO] ${message}`).foreground(FOREGROUND_COLORS.Blue)
			);
			break;
		case "warn":
			console.log(
				bchalk(`[WARN] ${message}`).foreground(FOREGROUND_COLORS.Yellow)
			);
			break;
		case "error":
			console.log(
				bchalk(`[ERROR] ${message}`)
					.foreground(FOREGROUND_COLORS.Red)
					.decoration([TEXT_DECORATION.Bold])
			);
			break;
	}
}

logger("info", "Application started");
logger("warn", "Connection timeout, retrying...");
logger("error", "Failed to connect to database");
```

### Progress Bar

```typescript
import { bchalk, FOREGROUND_COLORS, BACKGROUND_COLORS } from "bchalk";

function progressBar(percent: number, width = 30): string {
	const complete = Math.round(width * (percent / 100));
	const incomplete = width - complete;

	const bar =
		bchalk("█".repeat(complete))
			.foreground(FOREGROUND_COLORS.Green)
			.toString() +
		bchalk("░".repeat(incomplete))
			.foreground(FOREGROUND_COLORS.White)
			.toString();

	return `${bar} ${percent}%`;
}

// Usage
for (let i = 0; i <= 100; i += 10) {
	console.clear();
	console.log(progressBar(i));
	// In a real application, you would wait between updates
}
```

## License

MIT
