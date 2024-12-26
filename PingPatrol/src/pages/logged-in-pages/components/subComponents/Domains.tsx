import { memo, useEffect, useState } from "react";
import { axiosClient } from "../../../../axiosClient";
import { useUserContext } from "../../../../Contexts/User-Context";

type domainDataType = {
	ipOrDns: string;
	isFavorite: boolean;
	name: string;
};
function Domains() {
	const { userData } = useUserContext();
	const [domainData, setDomainData] = useState<domainDataType[]>();

	useEffect(() => {
		try {
			const fetchData = async () => {
				const data = await axiosClient.get(`/api/domains/${userData.userId}`);
				if (data) {
					setDomainData(data.data.domains);
				}
				console.log(data.data.domains);
			};
			fetchData();
		} catch (error) {
			console.error(`error getting user data: ${error}`);
		}
	}, []);
	return (
		<>
			<div className="flex justify-center flex-wrap gap-4 align-top">

			{domainData?.map((domain: domainDataType) => (
				<>
					<div className="min-w-48 w-fit bg-indigo-900 py-5 px-4 rounded-lg">
						<h1 className="text-2xl">{domain.name}</h1>
						<h1 className="text-lg">{domain.ipOrDns}</h1>
					</div>
				</>
			))}
			</div>

		</>
	);
}

export default memo(Domains);
