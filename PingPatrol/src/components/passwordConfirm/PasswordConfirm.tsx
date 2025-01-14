import { memo, useEffect, useState } from "react";
import passwordShow from "../../assets/password-show.svg";
import passwordHide from "../../assets/assword-hide.svg";
import checkPass from "../../assets/check.svg";
import checkfails from "../../assets/error.svg";
import { PasswordValidation, ResterUserType } from "../../types/MainTypes";
import { specialCharacters } from './../../services/utils.service';


function PasswordConfirm({
	formData,
	setFormData,
    passwordValidation,
    setPasswordValidation,
}: {
	formData: ResterUserType;
	setFormData: React.Dispatch<React.SetStateAction<ResterUserType>>;
    passwordValidation: PasswordValidation;
    setPasswordValidation: React.Dispatch<React.SetStateAction<PasswordValidation>>
}) {
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [ispasswordValidationShown, setIspasswordValidationShown] =
		useState<boolean>(false);
	// const [passwordValidation, setPasswordValidation] =
	// 	useState<PasswordValidation>({
	// 		ispass8chars: false,
	// 		doesPassContainUpperCase: false,
	// 		doesPassContainSpceialChar: false,
	// 		doesPassMatch: false,
	// 	});

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const password = e.target.value;
		setIspasswordValidationShown(true);
		checkPasswordLength(password);
		checkUpperCase(password);
		checkSpecialChar(password);
		setFormData((prevState) => ({ ...prevState, password: password }));
	};
	const handleConfirmPasswordChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const confirmPassword = e.target.value;
		if (!ispasswordValidationShown) {
			setIspasswordValidationShown(true);
		}

		setFormData((prevState) => ({
			...prevState,
			confirmPassword: confirmPassword,
		}));
	};

	function checkPasswordLength(password: string): void {
		if (password.length >= 8) {
			setPasswordValidation((prevState) => ({
				...prevState,
				ispass8chars: true,
			}));
		} else {
			setPasswordValidation((prevState) => ({
				...prevState,
				ispass8chars: false,
			}));
		}
	}

	function checkUpperCase(password: string): void {
		if (/[A-Z]/.test(password)) {
			setPasswordValidation((prevState) => ({
				...prevState,
				doesPassContainUpperCase: true,
			}));
		} else {
			setPasswordValidation((prevState) => ({
				...prevState,
				doesPassContainUpperCase: false,
			}));
		}
	}
	function checkSpecialChar(password: string): void {
		if (
			password.split("").some((char) => specialCharacters.includes(char))
		) {
			setPasswordValidation((prevState) => ({
				...prevState,
				doesPassContainSpecialChar: true,
			}));
		} else {
			setPasswordValidation((prevState) => ({
				...prevState,
				doesPassContainSpecialChar: false,
			}));
		}
	}
	function checkPasswordMatch(): void {
		if (
			formData.password == formData.confirmPassword &&
			formData.password.length > 0
		) {
			setPasswordValidation((prevState) => ({
				...prevState,
				doesPassMatch: true,
			}));
		} else {
			setPasswordValidation((prevState) => ({
				...prevState,
				doesPassMatch: false,
			}));
		}
	}
	useEffect(() => {
		checkPasswordMatch();
	}, [formData]);

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
                    maxLength={15}
                    minLength={8}
                    onCopy={(e) => {
						e.preventDefault();
						return false;
					}}
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
                    maxLength={15}
                    minLength={8}
					onPaste={(e) => {
						e.preventDefault();
						return false;
					}}
					onCopy={(e) => {
						e.preventDefault();
						return false;
					}}
				/>
				<img
					onClick={() => setIsVisible(!isVisible)}
					className="password-icon"
					src={isVisible ? passwordShow : passwordHide}
					alt="password-hide-icon"
				/>
			</label>
			{ispasswordValidationShown && (
				<div className="password-validation">
					<ul>
						<div className="li-div">
							<li>password length must be at least 8 characters </li>
							<img
								className="check-img"
								src={passwordValidation.ispass8chars ? checkPass : checkfails}
								alt="v"
							/>
						</div>
						<div className="li-div">
							<li>password must contain at least one uppercase letter </li>
							<img
								className="check-img"
								src={
									passwordValidation.doesPassContainUpperCase
										? checkPass
										: checkfails
								}
								alt="v"
							/>
						</div>
						<div className="li-div">
							<li>password must contain at least one special character </li>
							<img
								className="check-img"
								src={
									passwordValidation.doesPassContainSpecialChar
										? checkPass
										: checkfails
								}
								alt="v"
							/>
						</div>
						<div className="li-div">
							<li>passwords must match </li>
							<img
								className="check-img"
								src={passwordValidation.doesPassMatch ? checkPass : checkfails}
								alt="v"
							/>
						</div>
					</ul>
				</div>
			)}
		</>
	);
}

export default memo(PasswordConfirm);
