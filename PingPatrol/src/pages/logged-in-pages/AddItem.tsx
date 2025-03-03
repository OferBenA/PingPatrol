import { memo, useCallback, useState } from "react";
import { addItemType } from "../../types/MainTypes";
import { axiosClient } from "../../axiosClient";
import axios from "axios";
import { useUserContext } from "../../Contexts/User-Context";
import { useNavigate } from "react-router-dom";
import { useThemeStore } from "../../Store/useTheme";

function AddItem() {
	const [formData, setFormData] = useState<addItemType>({
		ipAddr: ["", "", "", ""],
		name: "",
		favorite: false,
	});
	const [isIpErrors, setIsIpErrors] = useState([true, true, true, true]);
	const { userData } = useUserContext();
	const navigation = useNavigate();
		const theme = useThemeStore((state) => state.theme)


	const handleCheckedChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const inputValue = e.target.checked;
			setFormData((prev) => ({ ...prev, favorite: inputValue }));
		},
		[formData]
	);

	const handleIpChange = useCallback(
		(index: number, value: string) => {
			if (isNaN(Number(value)) || Number(value) < 0 || Number(value) > 255) {
				setIsIpErrors((prev) =>
					prev.map((ipErr, i) => (i === index ? false : ipErr))
				);
			} else {
				setIsIpErrors((prev) =>
					prev.map((ipErr, i) => (i === index ? true : ipErr))
				);
			}
			setFormData((prev) => ({
				...prev,
				ipAddr: prev.ipAddr.map((ip, i) => (i === index ? value : ip)),
			}));
		},
		[formData]
	);

	const handleSubmit = useCallback(
		async (event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();

			try {
				const response = await axiosClient.put("/api/domains/create", {
					ipAddr: formData.ipAddr.join("."),
					name: formData.name,
					isFavorite: formData.favorite,
					userId: userData.userId,
				});
				alert(response.data.message);
				navigation("/");
			} catch (err: unknown) {
				if (axios.isAxiosError(err)) {
					console.log(err);
					alert(`unable to create domain: ${err.response?.data}`);
				}
			}
		},
		[formData]
	);

	return (
		<div className={`pt-48 sm:pl-44 w-screen min-h-screen flex justify-center items-start `}>
			<div className={`gap-4 w-96 h-96 shadow-xl rounded-3xl flex justify-center items-center flex-col text-xl ${theme == 'dark' ? 'bg-[#2d3535] text-white': 'bg-[#FBFBFB] text-black'}`}>
				<h1 className="text-2xl">add item</h1>
				<form onSubmit={handleSubmit}>
					<span>ip Address</span>
					<br />
					<div className="w-full flex justify-center align-middle gap-1 text-white">
						<input
							className={`my-2 mb-4 p-2 text-base w-14 rounded-md ${
								!isIpErrors[0] ? "ring-4 ring-red-600" : ""
							} `}
							type="text"
							pattern="^(25[0-5]|2[0-4][0-9]|1?[0-9]?[0-9])$"
							placeholder="255"
							required
							maxLength={3}
							value={formData.ipAddr[0]}
							onChange={(e) => handleIpChange(0, e.target.value)}
						/>
						<span className="self-end text-2xl pb-3 mx-0">.</span>
						<input
							className={`my-2 mb-4 p-2 text-base w-14 rounded-md  ${
								!isIpErrors[1] ? "ring-4 ring-red-600" : ""
							} `}
							type="text"
							pattern="^(25[0-5]|2[0-4][0-9]|1?[0-9]?[0-9])$"
							placeholder="255"
							required
							maxLength={3}
							value={formData.ipAddr[1]}
							onChange={(e) => handleIpChange(1, e.target.value)}
						/>
						<span className="self-end text-2xl pb-3">.</span>

						<input
							className={`my-2 mb-4 p-2 text-base w-14 rounded-md ${
								!isIpErrors[2] ? "ring-4 ring-red-600" : ""
							} `}
							type="text"
							pattern="^(25[0-5]|2[0-4][0-9]|1?[0-9]?[0-9])$"
							placeholder="255"
							required
							maxLength={3}
							value={formData.ipAddr[2]}
							onChange={(e) => handleIpChange(2, e.target.value)}
						/>
						<span className="self-end text-2xl pb-3">.</span>

						<input
							className={`my-2 mb-4 p-2 text-base w-14 rounded-md  ${
								!isIpErrors[3] ? "ring-4 ring-red-600" : ""
							} `}
							type="text"
							pattern="^(25[0-5]|2[0-4][0-9]|1?[0-9]?[0-9])$"
							placeholder="255"
							required
							maxLength={3}
							value={formData.ipAddr[3]}
							onChange={(e) => handleIpChange(3, e.target.value)}
						/>
					</div>
					<p className=" p-0 text-red-600 text-[14px]  ">
						{isIpErrors.some((err) => err == false) &&
							`each Octet must be a number between 0 and 255`}
					</p>

					<span>name: </span>
					<label className="">
						<br />
						<input
							className={`my-2 mb-4 p-2 text-base w-64 rounded-md text-white`}
							name="name"
							type="text"
							placeholder="name"
							required
							maxLength={40}
							value={formData.name}
							onChange={(e) =>
								setFormData((perv) => ({ ...perv, name: e.target.value }))
							}
						/>
					</label>
					<br />
					<span>add to favorites: </span>
					<div className="relative mt-8 mb-6 inline">
						<input
							name="favorite"
							className=" ml-5 mt-1 p-1 w-5 h-6 absolute"
							type="checkbox"
							checked={formData.favorite}
							onChange={handleCheckedChange}
						/>
					</div>
					<br />
					<input
						className="bg-slate-200 text-black mt-6 px-5 py-2 rounded-xl hover:cursor-pointer"
						type="submit"
						value="Add to dashboard"
					/>
				</form>
			</div>
		</div>
	);
}

export default memo(AddItem);
