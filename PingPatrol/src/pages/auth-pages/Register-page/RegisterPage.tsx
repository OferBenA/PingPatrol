import React, { ChangeEvent, memo, useState } from "react";
import passwordHide from "../../../assets/assword-hide.svg";
import passwordShow from "../../../assets/password-show.svg";
import { Link } from "react-router-dom";
import passwordConfirm from "../../../components/passwordConfirm/passwordConfirm";
import "./RegisterPage.css";
import PasswordConfirm from "../../../components/passwordConfirm/passwordConfirm";

export type ResterUserType = {
	userName: string;
	password: string;
	email:string;
	confirmPassword:string;
};

function RegisterPage() {
	const [formData, setFormData] = useState<ResterUserType>({
		userName: "",
		password: "",
		email: "",
		confirmPassword: "",
	});
	// const [isVisible, setIsVisible] = useState<boolean>(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};


	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log(`asd`);
	};

	return (
		<div className="RegisterPage">
			<div className="register-div">
				<h2>Register</h2>
				<form onSubmit={handleSubmit}>
					<p>email </p>
					<label className="username-label">
						<input
							onChange={handleChange}
							className="formInput"
							name="email"
							type="text"
							value={formData.email}
							placeholder="email"
						/>
					</label>
					<p>username </p>
					<label className="username-label">
						<input
							onChange={handleChange}
							className="formInput"
							name="userName"
							type="text"
							value={formData.userName}
							placeholder="username"
						/>
					</label>
					<br />
					<PasswordConfirm formData={formData} setFormData={setFormData}/>
					<input className="input-submit" type="submit" value="Login" />
				</form>
				<p className="dont-have-acc">Already have an account? </p>
				<Link to={"/login"}>login</Link>
			</div>
		</div>
	);
}

export default memo(RegisterPage);
