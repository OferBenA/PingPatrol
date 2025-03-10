import { memo, useCallback, useEffect, useState } from "react";
import { axiosClient } from "../../axiosClient";
import DomainDetailsSkeletons from "./components/Skeletons/domainDetailsSkeletons/domainDetailsSkeletons";
import arrowUp from "../../assets/arrow_up.svg";
import arrowDown from "../../assets/arrow_down.svg";
import { domainDataType, ReceivedDomainDataType } from "../../types/MainTypes";
import DomainDetailsSyncing from "./components/DomainDetailsSyncing";
import { useThemeStore } from "../../Store/useTheme";
import {
	timestampToDataAndTime,
	timestampToTime,
} from "../../services/utils.service";
import { FRONT_REFRESH_RATE_SLOW } from "../../services/consts.service";
import fillStarIcon from "../../assets/fillstar.svg";
import emptyStarIcon from "../../assets/star.svg";
import { useNavigate } from "react-router-dom";
import deleteIcon from "../../assets/delete.svg";
import edit from "../../assets/edit.svg";
import editOff from "../../assets/edit_off.svg";
import save from "../../assets/save.svg";

function DomainDetails() {
	const [domainData, setDomainData] = useState<ReceivedDomainDataType | null>();
	const [timeFetched, setTimeFetched] = useState<number>();
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [tempName, setTempName] = useState<string>("");

	const navigate = useNavigate();

	const theme = useThemeStore((state) => state.theme);
	const pathParts = window.location.pathname.split("/");
	const relevantDomainUrl = pathParts[pathParts.length - 1];

	const handleFavorite = useCallback(async (domain: domainDataType) => {
		setDomainData(null);
		console.log(domain);
		await axiosClient.post(`/api/domains/handleFavorite`, domain);
		fetchData();
	}, []);
	const handleDelete = useCallback(async (domain: domainDataType) => {
		const affirm = confirm(
			`are you sure you want to delete ${domain.ipAddr} ?`
		);
		if (affirm) {
			setDomainData(null);
			await axiosClient.delete(
				`/api/domains/deleteDomainPerUser/${domain.domainId}`
			);
			navigate("/");
		}
	}, []);

	const handleChangeName = useCallback(async () => {
		const affirm = confirm(
			`are you sure you want to change ${domainData?.ipAddr} the name to ${tempName} ?`
		);
		if (affirm) {
			setDomainData(null);
			await axiosClient.post(`/api/domains/updateName`, {
				newName: tempName,
				domainId: domainData?.domainId,
			});
			fetchData();
			setIsEditing(false);
		}
	}, [tempName]);

	const handleChangeInput = useCallback( (e: React.ChangeEvent<HTMLInputElement >) => {
		setTempName(e?.target?.value)
	}, []);

	const fetchData = useCallback(async () => {
		try {
			setTimeFetched(Date.now());
			const data = await axiosClient.get(
				`/api/domains/domainDetails/${relevantDomainUrl}`
			);
			if (data) {
				setTempName(data.data.name);
				setDomainData(data.data);
			}
		} catch (error) {
			console.error(error);
		}
	}, []);

	useEffect(() => {
		let intervalKey: number;
		try {
			fetchData();
			intervalKey = setInterval(fetchData, FRONT_REFRESH_RATE_SLOW);
		} catch (error) {
			console.error(`error getting user data: ${error}`);
		} finally {
			return () => {
				clearInterval(intervalKey);
			};
		}
	}, []);
	if (!domainData) {
		return <DomainDetailsSkeletons />;
	}
	if (!domainData.lastUpdate) {
		return <DomainDetailsSyncing domain={domainData.ipAddr} />;
	}
	return (
		<div
			className={`pt-10 pl-36 w-screen min-h-screen max-w-full flex justify-center items-start ${
				theme == "dark"
					? "bg-[#1a2222] text-white"
					: "bg-[#BCCCDC] text-slate-700"
			}`}
		>
			<div
				className={` p-8 mt-32 ml-36 min-h-[600px]  w-3/4  rounded-3xl bg-[#2d3535] shadow-[10px_10px_20px_20px_rgba(0,0,0,0.5)] ${
					theme == "dark"
						? "bg-[#2d3535] text-white"
						: "bg-[#FBFBFB] text-black"
				}`}
			>
				<h1 className="text-5xl mb-5">{domainData.ipAddr}</h1>
				<h4>last Update: {timestampToTime(timeFetched)}</h4>
				<div className="w-full flex justify-center align-middle py-4">
					{domainData.lastUpdate.alive && (
						<img className="w-24" src={arrowUp} alt="arrowUp" />
					)}
					{domainData.lastUpdate.alive == false && (
						<img className="w-24" src={arrowDown} alt="arrowDown" />
					)}
				</div>
				<div className={`flex justify-center flex-wrap gap-10`}>
					{!isEditing ? (
						<>
							<h1 className={`text-4xl mb-2`}>{domainData.name}</h1>
							<img
								onClick={() => setIsEditing(true)}
								className="px-2 rounded-xl hover:cursor-pointer"
								src={edit}
								alt="edit"
							/>
						</>
					) : (
						<>
							<input
								onChange={handleChangeInput}
								className={`text-2xl text-white mb-2 max-w-[450px] flex-grow p-2 rounded-md shadow-lg`}
								value={tempName}
							/>
							<img
								onClick={() => setIsEditing(false)}
								className="px-2 rounded-xl hover:cursor-pointer"
								src={editOff}
								alt="edit"
							/>
							<img
								onClick={handleChangeName}
								className="px-2 rounded-xl hover:cursor-pointer"
								src={save}
								alt="save"
							/>
						</>
					)}
				</div>

				<div className="w=full flex gap-10 justify-center align-middle">
					{domainData.isFavorite ? (
						<img
							onClick={() => handleFavorite(domainData)}
							title="Remove from favorites &#11088;"
							className="w-12  hover:animate-bounce hover:cursor-pointer p-1 drop-shadow-xl"
							src={fillStarIcon}
							alt="star"
						/>
					) : (
						<img
							onClick={() => handleFavorite(domainData)}
							title={`Add to favorites ⭐`}
							className="w-12 hover:animate-bounce hover:cursor-pointer p-1 drop-shadow-xl"
							src={emptyStarIcon}
							alt="star"
						/>
					)}
					<img
						onClick={() => handleDelete(domainData)}
						title={`Delete Domain 🗑`}
						className=" w-12 hover:animate-bounce hover:cursor-pointer p-1 drop-shadow-xl"
						src={deleteIcon}
						alt="delete"
					/>
				</div>
				<h1 className={`text-23xl`}>device history</h1>
				<div className=" flex justify-center flex-wrap gap-1 align-top pt-3">
					{[...domainData?.history]?.reverse().map((domain, index: number) =>
						domain.alive ? (
							<div key={index} className="flex justify-center  flex-nowrap">
								<div
									className="bg-green-500 min-w-16 p-4  rounded-[5px_0_0_5px] text-left"
									title={`end of current status: ${timestampToDataAndTime(
										domain.endCurrentStatus
									)}`}
								>
									{timestampToDataAndTime(domain.endCurrentStatus)}
								</div>
								<div
									className="bg-green-500 min-w-16  p-4 text-right  rounded-[0_5px_5px_0] "
									title={`start of current status: ${timestampToDataAndTime(
										domain.startCurrentStatus
									)}`}
								>
									&#8592; {timestampToDataAndTime(domain.startCurrentStatus)}
								</div>
							</div>
						) : (
							<div key={index} className="flex justify-center  flex-nowrap">
								<div
									className="bg-red-500 min-w-16 p-4  rounded-[5px_0_0_5px] text-left"
									title={`end of current status: ${timestampToDataAndTime(
										domain.endCurrentStatus
									)}`}
								>
									{timestampToDataAndTime(domain.endCurrentStatus)}
								</div>
								<div
									className="bg-red-500 min-w-16 p-4 text-right  rounded-[0_5px_5px_0] "
									title={`start of current status: ${timestampToDataAndTime(
										domain.startCurrentStatus
									)}`}
								>
									&#8592; {timestampToDataAndTime(domain.startCurrentStatus)}
								</div>
							</div>
						)
					)}
				</div>
			</div>
		</div>
	);
}

export default memo(DomainDetails);
