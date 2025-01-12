import { memo, useCallback, useState } from "react";
import {  addItemType } from "../../types/MainTypes";
import { axiosClient } from "../../axiosClient";
import ipaddress from "../../assets/ip-adress.png";
import dns from "../../assets/dns.png";
import axios from "axios";
import { useUserContext } from "../../Contexts/User-Context";
import { useNavigate } from "react-router-dom";

function AddItem() {
	const [formData, setFormData] = useState<addItemType>({
		ipOrDns: "",
		name: "",
		favorite: false,
		isIpOrDns: undefined,
	});
	const { userData } = useUserContext();
	const navigation = useNavigate()

	const handleIpOrDnsChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const ipOrDns = e.target.value;
			checkIpOrDns();
			setFormData((prevState) => ({ ...prevState, ipOrDns }));
		},
		[formData]
	);

	const handleCheckedChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.checked;
		setFormData((prev) => ({ ...prev, favorite: inputValue }));
	},[formData]);

	const  checkIpOrDns = useCallback(() => {
		if (/^[0-9.]+$/.test(formData.ipOrDns)) {
			setFormData((prev) => ({ ...prev, isIpOrDns: "ip" }));
			return;
		} else {
			setFormData((prev) => ({ ...prev, isIpOrDns: "dns" }));
			return;
		}
	},[formData])

	const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			const response = await axiosClient.put("/api/domains/create", {
				ipOrDns: formData.ipOrDns,
				name: formData.name,
				isFavorite: formData.favorite,
				isIpOrDns: formData.isIpOrDns,
				userId: userData.userId,
			});
			alert(response.data.message);
			navigation('/');
		} catch (err: unknown) {
			if (axios.isAxiosError(err)) {
				console.log(err);
				alert(`unable to create domain: ${err.response?.data}`);
			}
		}
	},[formData]);

	return (
		<div className=" mt-32 ml-36 w-full h-full flex justify-center items-start">
			<div className="gap-4 w-96 h-96 bg-[#2d3535] shadow-xl rounded-3xl flex justify-center items-center flex-col text-xl">
				<h1 className="text-2xl">add item</h1>
				<form onSubmit={handleSubmit}>
					<span>ip \ dns address: </span>
					<label className="relative">
						<br />
						<input
							className="my-2 mb-4 p-2 text-base w-64"
							name="ipOrDns"
							type="text"
							placeholder="ip \ dns"
							required
							maxLength={90}
							value={formData.ipOrDns}
							onChange={handleIpOrDnsChange}
						/>
						<img
							className="w-7 ml-2 mt-4 inline absolute"
							src={formData.isIpOrDns == "ip" ? ipaddress : dns}
							alt="ipaddress/dns"
						/>
					</label>
					<br />
					<span>name: </span>
					<label className="">
						<br />
						<input
							className="my-2 mb-4 p-2 text-base w-64"
							name="name"
							type="text"
							placeholder="name"
							required
							maxLength={15}
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
