import { memo, useState } from "react";
import LeftNavBar from "../../../components/LeftNavBar/LeftNavBar";
import { PageViewingType } from "../../../types/MainTypes";
import AddItem from "../components/addItem";
function HomePage() {
  const [pageViewing, setPageViewing] = useState<PageViewingType>('dashboard')
	return (
		<>
			<LeftNavBar setPageViewing={setPageViewing}/>

			<div className="mt-24 w-4/12">
      {pageViewing == 'addItem' && <AddItem/>}
      </div>
		</>
	);
}

export default memo(HomePage);
