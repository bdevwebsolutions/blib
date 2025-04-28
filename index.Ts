import { bchalk, FOREGROUND_COLORS } from "./lib/bchalk";

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

console.log(progressBar(10));
