import { memo } from "react";
import { PageViewingType } from "../../types/MainTypes";
import { useAuthContext } from "../../Contexts/Auth-Context";

function LeftNavBar({
	setPageViewing,
}: {
	setPageViewing: (arg0: PageViewingType) => void;
}) {
  const { logout } = useAuthContext();

	return (
		<>
			<div className='ml-2 w-36 h-screen fixed left-0 top-0 z-20 flex flex-col justify-around'>
				<div className=" flex flex-col justify-center gap-2">
					<div
						onClick={() => setPageViewing("Dashboard")}
						className="leftNavBarBtn"
					>
						Dashboard
					</div>
					<div
						onClick={() => setPageViewing("AddItem")}
						className="leftNavBarBtn"
					>
						Add item
					</div>
					<div className="leftNavBarBtn">3</div>
				</div>
        <div className="">
				<div onClick={logout} className="leftNavBarBtn">Logout</div>
        </div>
			</div>
		</>
	);
}

export default memo(LeftNavBar);
