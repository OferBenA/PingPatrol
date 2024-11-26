import React, {  memo, useState } from "react";
import "./LoginPage.css";
import passwordHide from '../../../assets/assword-hide.svg'
import passwordShow from '../../../assets/password-show.svg'
import { Link } from 'react-router-dom';
import { LoginInfoType } from "../../../types/MainTypes";


function LoginPage() {
	const [formData, setFormData] = useState<LoginInfoType>({
		userName: "",
		password: "",
	});
    const [isVisible, setIsVisible] = useState<boolean>(false)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log(`asd`)
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
							name="userName"
							type="text"
							value={formData.userName}
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
							type={isVisible ? 'text' :'password'}
							value={formData.password}
							placeholder="password"
						/>
                        <img onClick={() => setIsVisible(!isVisible)} className="password-icon" src={isVisible ?  passwordShow : passwordHide} alt="password-hide-icon" />
					</label>
					<br />
					<input className="input-submit" type="submit" value="Login" />
				</form>
                    <p className="dont-have-acc">don't have and account? </p>
                <Link  to={'/register'}>
                    register
                </Link>
			</div>
		</div>
	);
}

export default memo(LoginPage);
