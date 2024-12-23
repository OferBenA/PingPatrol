import { memo, useState } from "react";
import { PageViewingType, addItemType } from "../../../types/MainTypes";
import { axiosClient } from "../../../axiosClient";
import ipaddress from "../../../assets/ip-adress.png";
import dns from "../../../assets/dns.png";
import axios from "axios";
import { useUserContext } from "../../../Contexts/User-Context";

function AddItem({setPageViewing,}: {setPageViewing: (arg0: PageViewingType) => void;}) {
	const [formData, setFormData] = useState<addItemType>({
		ipOrDns: "",
		name: "",
		favorite: false,
		isIpOrDns: undefined,
	});
  const { userData } = useUserContext();


	const handleIpOrDnsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const ipOrDns = e.target.value;
		checkIpOrDns();
		setFormData((prevState) => ({ ...prevState, ipOrDns }));
	};
	const handleCheckedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.checked;
		setFormData((prev) => ({ ...prev, favorite: inputValue }));
	};
	function checkIpOrDns() {
		if (/^[0-9.]+$/.test(formData.ipOrDns)) {
			setFormData((prev) => ({ ...prev, isIpOrDns: "ip" }));
			return;
		} else   {
			setFormData((prev) => ({ ...prev, isIpOrDns: "dns" }));
			return;
		}
	}
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			const response = await axiosClient.put("/api/domains/create", {
				ipOrDns: formData.ipOrDns,
				name: formData.name,
				isFavorite: formData.favorite,
				isIpOrDns: formData.isIpOrDns,
        userId: userData.userId,
			});
      alert(response.data.message)
      setPageViewing('Dashboard');

		} catch (err: unknown) {
			if (axios.isAxiosError(err)) {
        console.log(err)
				alert(`unable to log in: ${err.response?.data}`);
			}
		}
	};

	return (
		<div className=" w-full h-full flex justify-center items-start">
			<div className="gap-4 w-96 h-96 bg-indigo-950/50 shadow-xl rounded-3xl flex justify-center items-center flex-col text-xl">
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
							maxLength={40}
							value={formData.ipOrDns}
							onChange={handleIpOrDnsChange}
						/>
						<img
							className="w-7 ml-2 mt-4 inline absolute"
							src={formData.isIpOrDns == 'ip' ?  ipaddress : dns}
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
