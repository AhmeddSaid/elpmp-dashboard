function convertTimeToSeconds(timeStr: string): number | null {
	const match: RegExpMatchArray | null = timeStr.toLowerCase().match(/^(\d+)([mhd])$/);
	if (!timeStr || !match) return null;

	const amount: number = parseInt(match[1], 10);
	const unit: string = match[2];

	const multipliers: Record<string, number> = {
		m: 60,
		h: 60 * 60,
		d: 24 * 60 * 60,
	};

	const multiplier: number = multipliers[unit];
	if (!multiplier) {
		return null;
	}

	return amount * multiplier;
}

export function convertSecondsToMinutes(seconds: number): string {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const remainingSeconds = seconds % 60;

	const timeParts = [];
	if (hours > 0) {
		timeParts.push(`${hours.toString().padStart(2, "0")}:`);
	}

	timeParts.push(`${minutes.toString().padStart(2, "0")}:`);
	timeParts.push(`${remainingSeconds.toString().padStart(2, "0")}`);

	return timeParts.join("");
}

export default convertTimeToSeconds;
