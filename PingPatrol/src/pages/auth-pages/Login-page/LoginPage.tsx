import React, { memo, useState } from "react";
import passwordHide from "../../../assets/assword-hide.svg";
import passwordShow from "../../../assets/password-show.svg";
import { Link, useNavigate } from "react-router-dom";
import { LoginInfoType } from "../../../types/MainTypes";
import axios from "axios";
import { parseJwt } from "../../../services/utils.service";
import { useUserContext } from "../../../Contexts/User-Context";
import "./LoginPage.css";
import { axiosClient } from "../../../axiosClient";

function LoginPage() {
	const [formData, setFormData] = useState<LoginInfoType>({
		emailOrUsername: "",
		password: "",
	});
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const { dispatch: dispatchUserData } = useUserContext();
	const navigate = useNavigate();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const response = await axiosClient.post('/api/users/login', {
				emailOrUsername: formData.emailOrUsername,
					password: formData.password,
			})
			const accessToken = response?.data?.accessToken;
			if (accessToken) {
				const refreshToken = response?.data?.refreshToken;
				window.localStorage.setItem("accessToken", accessToken); // store accessToken in localStorage
				window.localStorage.setItem("refreshToken", refreshToken);
				window.localStorage.setItem("isLoggedIn", "true");
				const userPayload = parseJwt(accessToken);
				const userData = {
					isLoggedIn: true,
					email: userPayload.email,
					userId: userPayload.userId,
					username: userPayload.username,
					devices: userPayload.devices || [],
				};
				dispatchUserData?.(userData);
				navigate('/');
			}
		} catch (err: unknown) {
			if (axios.isAxiosError(err)) {
				alert(`unable to log in: ${err.response?.data}`);
				setFormData({ ...formData, password: "" });
			}
		}
	};

	return (
		<div className="LoginPage">
			<div className="login-div">
				<h2>Login</h2>
				<form onSubmit={handleSubmit}>
					<span>email \ username </span>
					<label className="username-label">
						<br />
						<input
							onChange={handleChange}
							className="formInput"
							name="emailOrUsername"
							type="text"
							value={formData.emailOrUsername}
							placeholder="username"
						/>
					</label>
					<br />
					<span>password </span>
					<label className="password-label">
						<br />
						<input
							onChange={handleChange}
							className="formInput"
							name="password"
							type={isVisible ? "text" : "password"}
							value={formData.password}
							placeholder="password"
						/>
						<img
							onClick={() => setIsVisible(!isVisible)}
							className="password-icon"
							src={isVisible ? passwordShow : passwordHide}
							alt="password-hide-icon"
						/>
					</label>
					<br />
					<input className="button input-submit" type="submit" value="Login" />
				</form>
				<p className="dont-have-acc">don't have and account? </p>
				<Link to={"/register"} className="text-indigo-400">register</Link>
			</div>
		</div>
	);
}

export default memo(LoginPage);
