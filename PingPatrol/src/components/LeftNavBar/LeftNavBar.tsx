import { memo } from "react";
import { useAuthContext } from "../../Contexts/Auth-Context";
import { useNavigate } from "react-router-dom";

function LeftNavBar() {
  const { logout } = useAuthContext();
  const navigate = useNavigate()

	return (
		<>
			<div className='ml-2 w-36 h-screen fixed left-0 top-0 z-20 flex flex-col justify-around'>
				<div className=" flex flex-col justify-center gap-2">
					<div
						className="bg-gray-800 py-1 rounded-md  text-white px-3 hover:cursor-pointer transition-all duration-200 hover:shadow-2xl text-lg"
						onClick={() => navigate('/')}
					>
						Dashboard
					</div>
					<div
						className="bg-gray-800 py-1 rounded-md  text-white px-3 hover:cursor-pointer transition-all duration-200 hover:shadow-2xl text-lg"
						onClick={() => navigate('/additem')}
					>
						Add item
					</div>
				</div>
        <div className="">
				<div onClick={logout}
						className="bg-gray-800 py-1 rounded-md  text-white px-3 hover:cursor-pointer transition-all duration-200 hover:shadow-2xl text-lg"
						>
					Logout</div>
        </div>
			</div>
		</>
	);
}

export default memo(LeftNavBar);
