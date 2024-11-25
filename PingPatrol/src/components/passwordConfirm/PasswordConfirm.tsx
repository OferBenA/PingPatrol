import { memo, useState } from "react";
import { ResterUserType } from "../../pages/auth-pages/Register-page/RegisterPage";
import passwordShow from '../../assets/password-show.svg'
import passwordHide from '../../assets/assword-hide.svg'

function PasswordConfirm({formData,setFormData,}: {
	formData: ResterUserType;
	setFormData: React.Dispatch<React.SetStateAction<ResterUserType>>}) {

	const [isVisible, setIsVisible] = useState<boolean>(false);

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		setFormData((prevState) => ({ ...prevState, password: value }));
	};
    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		setFormData((prevState) => ({ ...prevState, confirmPassword: value }));
	};
	return (
		<>
			<p>password </p>
			<label className="password-label">
				<br /> {/* aligns the password input with all the other inputs*/}
				<input
					onChange={handlePasswordChange}
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
			<p>confirm password </p>
			<label className="password-label">
				<br /> {/* aligns the password input with all the other inputs*/}
				<input
					onChange={handleConfirmPasswordChange}
					className="formInput"
					name="confirmPassword"
					type={isVisible ? "text" : "password"}
					value={formData.confirmPassword}
					placeholder="confirm password"
				/>
				<img
					onClick={() => setIsVisible(!isVisible)}
					className="password-icon"
					src={isVisible ? passwordShow : passwordHide}
					alt="password-hide-icon"
				/>
			</label>
		</>
	);
}

export default memo(PasswordConfirm);
