import React, { memo, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import "./RegisterPage.css";
import PasswordConfirm from "../../../components/passwordConfirm/PasswordConfirm";
import { PasswordValidation, ResterUserType } from "../../../types/MainTypes";
import axios, { AxiosError } from "axios";

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
	const navigate = useNavigate();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!formData.email) {
			alert("Please enter a valid email");
			return;
		}
		if (formData.userName.length < 5) {
			alert("Please enter a valid user name");
			return;
		}
		if (
			!passwordValidation.ispass8chars ||
			!passwordValidation.doesPassContainUpperCase ||
			!passwordValidation.doesPassContainSpceialChar
		) {
			alert("password is not strong enough");
			return;
		}
		if (!passwordValidation.doesPassMatch) {
			alert("passwords does not match");
			return;
		}
		//TODO - handle call to register in backend

		try {
			const result = await axios({
				method: "put",
				url: "http://localhost:3000/api/users/register",
				data: {
					email: formData.email,
					userName: formData.userName,
					password: formData.password,
				},
				headers: { "Content-Type": "application/json" },
			});
			if(result.status == 201){
				setTimeout(() =>{
					navigate('/login');
				},100)
				alert("succesfully register, please log in")
			}
		} catch (error) {
			console.error(`error while trying to register: ${error}`);
			alert(`failed to register, ${(error as AxiosError)?.response?.data}`)
		}
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
							type="email"
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
							maxLength={20}
							minLength={6}
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
