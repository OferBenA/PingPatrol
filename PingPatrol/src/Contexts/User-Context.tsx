import {
	createContext,
	ReactNode,
	useMemo,
	useState,
	useContext,
	useLayoutEffect,
} from "react";
import { parseJwt } from "../services/utils.service";

type User = {
	isLoggedIn: boolean;
	email: string;
	userId: string;
	username: string;
	devices: string[];
};

type UserContextType = {
	userData: User;
	dispatch?: (user: User) => void;
};

export const initalizeUserData = () => {
	return {
		isLoggedIn: false,
		email: "",
		userId: "",
		username: "",
		devices: [],
	};
};

const UserContext = createContext<UserContextType | undefined>(undefined);

function UserProvider({ children }: { children: ReactNode }) {
	const [userData, setUserData] = useState<User>(initalizeUserData());
	useLayoutEffect(() => {
		const isLoggedIn = window.localStorage.getItem("isLoggedIn");
		const accessToken = window.localStorage.getItem('accessToken')
		if (isLoggedIn == "true" && accessToken) {
			const userPayload = parseJwt(accessToken);
			setUserData({
				isLoggedIn: true,
				email: userPayload.email,
				userId: userPayload.userId,
				username: userPayload.username,
				devices: userPayload.devices || [],
			});
		}
	},[]);
	const contextData: UserContextType = useMemo(
		() => ({
			userData,
			dispatch: setUserData,
		}),
		[userData]
	);

	return (
		<UserContext.Provider value={contextData}>{children}</UserContext.Provider>
	);
}

export default UserProvider;

export const useUserContext = (): UserContextType => {
	const context = useContext(UserContext);
	if (context === undefined) {
		// if there is no value the hook is not being called within a function component that is rendered within a `ThemeContext`
		throw new Error("useThemeContext must be used within App");
	}
	return context;
};
