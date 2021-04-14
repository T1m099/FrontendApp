//a custom sleep function
export default function delay(ms) {
	return new Promise(res => setTimeout(res, ms));
}
