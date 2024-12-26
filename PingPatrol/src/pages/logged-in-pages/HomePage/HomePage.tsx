import { memo, useState } from "react";
import LeftNavBar from "../../../components/LeftNavBar/LeftNavBar";
import { PageViewingType } from "../../../types/MainTypes";
import AddItem from "../components/AddItem";
import Dashboard from "../components/Dashboard";
function HomePage() {
	const [pageViewing, setPageViewing] = useState<PageViewingType>("Dashboard");
	return (
		<>

			<LeftNavBar setPageViewing={setPageViewing} />

			<div className="mt-32 ml-36 w-10/12 h-[calc(100vh-140px)]">
				{pageViewing == "AddItem" && <AddItem  setPageViewing={setPageViewing}/>}
				{pageViewing == "Dashboard" && <Dashboard  />}
			</div>
		</>
	);
}

export default memo(HomePage);
