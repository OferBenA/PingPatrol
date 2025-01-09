export type ResterUserType = {
	userName: string;
	password: string;
	email: string;
	confirmPassword: string;
};
export type PasswordValidation = {
	ispass8chars: boolean;
	doesPassContainUpperCase: boolean;
	doesPassContainSpceialChar: boolean;
	doesPassMatch: boolean;
};
export type LoginInfoType = {
	emailOrUsername: string;
	password: string;
};
export type addItemType = {
	ipOrDns: string;
	name: string;
	favorite:boolean;
	isIpOrDns: 'ip' | 'dns' | undefined
};
export type formInput = {
    name:string;
    type:string;
    value:string;
    placeholder:string;
}
export type PageViewingType = 'Dashboard' | 'AddItem';

export type domainDataType = {
	ipOrDns: string;
	isFavorite: boolean;
	name: string;
	domainId: string;
	lastUpdate?: {alive: boolean, date: number}
};
export type ReceivedDomainDataType = {
	domain:string;
	id: string;
	createdDate: string;
	isIpOrDns: string;
	history: { date: number; alive: boolean }[];
	lastUpdate: { date: number; alive: boolean };
};
