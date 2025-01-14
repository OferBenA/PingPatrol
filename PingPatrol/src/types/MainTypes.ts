export type ResterUserType = {
	userName: string;
	password: string;
	email: string;
	confirmPassword: string;
};
export type PasswordValidation = {
	ispass8chars: boolean;
	doesPassContainUpperCase: boolean;
	doesPassContainSpecialChar: boolean;
	doesPassMatch: boolean;
};
export type LoginInfoType = {
	emailOrUsername: string;
	password: string;
};
export type addItemType = {
	ipAddr: string[];
	name: string;
	favorite: boolean;
};
export type formInput = {
	name: string;
	type: string;
	value: string;
	placeholder: string;
};
export type PageViewingType = "Dashboard" | "AddItem";

export type lastUpdateType = {
	alive: boolean;
	startCurrentStatus: number;
	endCurrentStatus: number;
};
export type domainDataType = {
	ipAddr: string;
	isFavorite: boolean;
	name: string;
	domainId: string;
	lastUpdate: lastUpdateType;
};
export type ReceivedDomainDataType = {
	ipAddr: string;
	id: string;
	createdDate: string;
	isIpOrDns: string;
	history: { date: number; alive: boolean }[];
	lastUpdate: lastUpdateType;
};
