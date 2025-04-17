import EnToArNumbers from "@/Utils/EnglishToArabicNumbers";

export default function DateFormatter(date: string, locale: string): string {
	if (date === null) {
		return "-";
	}
	const d: Date = new Date(date);
	const months: string[] = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const monthsAR: string[] = [
		"يناير",
		"فبراير",
		"مارس",
		"أبريل",
		"مايو",
		"يونيو",
		"يوليو",
		"أغسطس",
		"سبتمبر",
		"أكتوبر",
		"نوفمبر",
		"ديسمبر",
	];

	if (locale === "ar") {
		const year = EnToArNumbers(d.getFullYear()).replace(/,/g, "");
		return `${EnToArNumbers(d.getDate())} ${monthsAR[d.getMonth()]} ${year}`;
	}
	return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}
