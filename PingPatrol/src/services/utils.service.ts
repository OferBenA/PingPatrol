import { IpsToAddType } from "../types/MainTypes";

export const specialCharacters = "!@#$%^&*()_+}{=~<>";

export function parseJwt(token: string) {
	const base64Url = token.split(".")[1];
	const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
	const jsonPayload = decodeURIComponent(
		window
			.atob(base64)
			.split("")
			.map(function (c) {
				return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
			})
			.join("")
	);
	return JSON.parse(jsonPayload);
}
export function timestampToTime(timeStamp: number | undefined): string {
	return String(new Date(timeStamp ?? "0").toLocaleTimeString("en-GB"));
}
export function timestampToDataAndTime(timeStamp: number | undefined): string {
	const time = new Date(timeStamp ?? "0").toLocaleTimeString("en-GB");
	const day = new Date(timeStamp ?? "0").getDate();
	const month = new Date(timeStamp ?? "0").getMonth();
	const year = new Date(timeStamp ?? "0").getFullYear() % 100;
	return `${time}, ${day}-${month + 1}-${year}`;
}
export function ipStringToObj(string: string): IpsToAddType[] | null {
  if(string == ''){
    return null
  }
	const stringArr = string.split(/^/gm).map((string) => string.slice(0, -1));
	const stringArrNested = stringArr.map((row) =>
		row.split(",").map((item) => item.trim())
	);
	const stringArrFormatted = stringArrNested.map((row, index) => ({
		ip: row[0],
		name: row[1] ? row[1] : `item${index + 1}`,
		isFavorite: row[2] == "true" ? true : false,
	}));
	return stringArrFormatted;
}
