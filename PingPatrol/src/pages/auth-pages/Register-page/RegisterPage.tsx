import React, { memo, useState } from "react";
import { Link } from "react-router-dom";
import "./RegisterPage.css";
import PasswordConfirm from "../../../components/passwordConfirm/PasswordConfirm";
import { PasswordValidation, ResterUserType } from "../../../types/MainTypes";



function RegisterPage() {
	const [formData, setFormData] = useState<ResterUserType>({
		email: "",
		userName: "",
		password: "",
		confirmPassword: "",
	});
	const [passwordValidation, setPasswordValidation] =
		useState<PasswordValidation>({
			ispass8chars: false,
			doesPassContainUpperCase: false,
			doesPassContainSpceialChar: false,
			doesPassMatch: false,
		});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		//TODO - handle call to register in backend
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
					<PasswordConfirm
						formData={formData}
						setFormData={setFormData}
						passwordValidation={passwordValidation}
						setPasswordValidation={setPasswordValidation}
					/>
					<input className="input-submit" type="submit" value="Register" />
				</form>
				<p className="dont-have-acc">Already have an account? </p>
				<Link to={"/login"}>login</Link>
			</div>
		</div>
	);
}

export default memo(RegisterPage);
