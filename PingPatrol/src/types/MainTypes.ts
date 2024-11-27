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
	userName: string;
	password: string;
};
export type formInput = {
    name:string;
    type:string;
    value:string;
    placeholder:string;
}