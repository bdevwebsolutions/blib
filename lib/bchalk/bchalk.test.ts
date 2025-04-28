import { describe, expect, test } from "bun:test";
import {
	bchalk,
	FOREGROUND_COLORS,
	BACKGROUND_COLORS,
	TEXT_DECORATION,
} from "./bchalk";

describe(
	bchalk("BCHALK").foreground(FOREGROUND_COLORS.Yellow).toString(),
	() => {
		test("It should return a text with foreground color", () => {
			const result = bchalk("test")
				.foreground(FOREGROUND_COLORS.Red)
				.toString();
			expect(result).toBe("\x1b[31mtest\x1b[0m");
		});

		test("It should return a text with background color", () => {
			const result = bchalk("test")
				.background(BACKGROUND_COLORS.Blue)
				.toString();
			expect(result).toBe("\x1b[44mtest\x1b[0m");
		});

		test("It should return a text with decoration", () => {
			const result = bchalk("test")
				.decoration([TEXT_DECORATION.Bold])
				.toString();
			expect(result).toBe("\x1b[1mtest\x1b[0m");
		});

		test("It should return a text with multiple decorations", () => {
			const result = bchalk("test")
				.decoration([TEXT_DECORATION.Bold, TEXT_DECORATION.Underline])
				.toString();
			expect(result).toBe("\x1b[1;4mtest\x1b[0m");
		});

		test("It should return a text with foreground and background colors", () => {
			const result = bchalk("test")
				.foreground(FOREGROUND_COLORS.White)
				.background(BACKGROUND_COLORS.Blue)
				.toString();
			expect(result).toBe("\x1b[37;44mtest\x1b[0m");
		});

		test("It should return a text with foreground, background and decoration", () => {
			const result = bchalk("test")
				.foreground(FOREGROUND_COLORS.White)
				.background(BACKGROUND_COLORS.Red)
				.decoration([TEXT_DECORATION.Bold])
				.toString();
			expect(result).toBe("\x1b[1;37;41mtest\x1b[0m");
		});

		test("It should handle bright colors correctly", () => {
			const result = bchalk("test")
				.foreground(FOREGROUND_COLORS.BrightGreen)
				.background(BACKGROUND_COLORS.BrightYellow)
				.toString();
			expect(result).toBe("\x1b[92;103mtest\x1b[0m");
		});

		test("Symbol.toPrimitive should convert to string when used in string context", () => {
			const chalk = bchalk("test").foreground(FOREGROUND_COLORS.Blue);
			// Force string conversion
			const str = String(chalk);
			expect(str).toBe("\x1b[34mtest\x1b[0m");
		});

		test("Symbol.toPrimitive should work with string concatenation", () => {
			const chalk = bchalk("test").foreground(FOREGROUND_COLORS.Green);
			const str = "Colored text: " + chalk;
			expect(str).toBe("Colored text: \x1b[32mtest\x1b[0m");
		});

		test("Symbol.toPrimitive should work with template literals", () => {
			const chalk = bchalk("test").foreground(FOREGROUND_COLORS.Magenta);
			const str = `Colored text: ${chalk}`;
			expect(str).toBe("Colored text: \x1b[35mtest\x1b[0m");
		});

		test("Multiple method calls should be chainable", () => {
			const result = bchalk("test")
				.foreground(FOREGROUND_COLORS.Cyan)
				.background(BACKGROUND_COLORS.Black)
				.decoration([TEXT_DECORATION.Bold, TEXT_DECORATION.Italic])
				.toString();
			expect(result).toBe("\x1b[1;3;36;40mtest\x1b[0m");
		});
	}
);
