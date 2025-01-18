import { Dispatch, memo, SetStateAction, useCallback } from "react";
import { domainDataType } from "../../../types/MainTypes";
import StatusImg from "./StatusImg";
import { axiosClient } from "../../../axiosClient";
import { useThemeStore } from "../../../Store/useTheme";
import fillStarIcon from "../../../assets/fillstar.svg";
import emptyStarIcon from "../../../assets/star.svg";
import deleteIcon from "../../../assets/delete.svg";
import { useNavigate } from "react-router-dom";
type ParametersType = {
	domain: domainDataType;
	index: number;
	setDomainData: React.Dispatch<React.SetStateAction<domainDataType[] | null | undefined>>;
	fetchData: () => void;
};
function Domain({
	domain,
	index,
	setDomainData,
	fetchData,
}: ParametersType) {
	const theme = useThemeStore((state) => state.theme);
	const navigate = useNavigate();

	const handleFavorite = useCallback(async (domain: domainDataType) => {
		domain.isFavorite = !domain.isFavorite;
		setDomainData(null);
		await axiosClient.post(`/api/domains/updateDomainPerUser`, domain);
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
			fetchData();
		}
	}, []);
	return (
		<div
			key={index}
			className={`hover:cursor-pointer min-w-48 w-fit py-5 px-4 rounded-lg hover:shadow-[3px_3px_5px_5px_rgba(0,0,0,0.3)] transition duration-300 ${
				theme == "dark" ? "bg-[#2d3535] text-white" : "bg-[#FBFBFB] text-black"
			}`}
		>
			<StatusImg lastUpdate={domain.lastUpdate} />
			<h1 className="text-2xl px-10">{domain.name}</h1>
			<h1 className="text-lg">{domain.ipAddr}</h1>
			<div className=" mt-2 flex justify-between align-middle relative">
				{domain.isFavorite ? (
					<img
						onClick={() => handleFavorite(domain)}
						title="Remove from favorites &#11088;"
						className="w-12  hover:animate-bounce hover:cursor-pointer p-1 drop-shadow-xl"
						src={fillStarIcon}
						alt="star"
					/>
				) : (
					<img
						onClick={() => handleFavorite(domain)}
						title={`Add to favorites ⭐`}
						className="w-12 hover:animate-bounce hover:cursor-pointer p-1 drop-shadow-xl"
						src={emptyStarIcon}
						alt="star"
					/>
				)}
				<img
					onClick={() => handleDelete(domain)}
					title={`Delete Domain 🗑`}
					className=" w-12 hover:animate-bounce hover:cursor-pointer p-1 drop-shadow-xl"
					src={deleteIcon}
					alt="delete"
				/>
			</div>
			<button
				onClick={() => navigate(`/domainDetails/${domain.ipAddr}`)}
				className="bg-slate-400 mt-4 pr-2"
			>
				more details <span className="hover:animate-bounce">→</span>
			</button>
		</div>
	);
}

export default memo(Domain);
