import { memo, useCallback, useEffect, useState } from "react";
import { axiosClient } from "../../../axiosClient";
import deleteIcon from "../../../assets/delete.svg";
import emptyStarIcon from "../../../assets/star.svg";
import fillStarIcon from "../../../assets/fillstar.svg";
import { domainDataType } from "../../../types/MainTypes";
import StatusImg from "./StatusImg";
import { useNavigate } from "react-router-dom";
import DomainListSkeletons from "./Skeletons/DomainListSkeletons/DomainListSkeletons";
import { useThemeStore } from "../../../Store/useTheme";
function Domains() {
	const [domainData, setDomainData] = useState<domainDataType[] | null>();
	const [timeFetched, setTimeFetched] = useState<number>()
	const navigate = useNavigate();
	const theme = useThemeStore((state) => state.theme)

	const handleFavorite = useCallback(
		async (domain: domainDataType) => {
			domain.isFavorite = !domain.isFavorite;
			setDomainData(null);
			await axiosClient.post(`/api/domains/updateDomainPerUser`, domain);
			fetchData();
		},
		[domainData]
	);

	const handleDelete = useCallback(
		async (domain: domainDataType) => {
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
		},
		[domainData]
	);

	const fetchData = useCallback(async () => {
		try {
			setTimeFetched(Date.now())
			const data = await axiosClient.get(`/api/domains/allPerUser`);
			if (data) {
				console.log(`fetched new data at: ${new Date()}`);
				setDomainData(data.data);
			}
		} catch (error) {
			console.error(error);
		}
	}, [domainData]);

	useEffect(() => {
		let intervalKey: number;
		try {
			fetchData();
			intervalKey = setInterval(fetchData, 30000);
		} catch (error) {
			console.error(`error getting user data: ${error}`);
		} finally {
			return () => {
				clearInterval(intervalKey);
			};
		}
	}, []);

	if (!domainData) {
		return <DomainListSkeletons />;
	}
	return (
		<>
			<h1>last Update: {String(new Date(timeFetched ?? 0).toLocaleTimeString("en-GB")) }</h1>
			<div className="flex justify-center flex-wrap gap-4 align-top">
				{domainData?.map((domain: domainDataType, index: number) => (
					<div
						key={index}
						className={`hover:cursor-pointer min-w-48 w-fit py-5 px-4 rounded-lg hover:shadow-[3px_3px_5px_5px_rgba(0,0,0,0.3)] transition duration-300 ${theme == 'dark' ? 'bg-[#2d3535] text-white': 'bg-[#FBFBFB] text-black'}`}
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
				))}
			</div>
		</>
	);
}

export default memo(Domains);
