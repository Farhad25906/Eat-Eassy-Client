
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/Logo.png"
import useAuth from "../../../hooks/useAuth";
import { MdOutlineNotificationAdd } from "react-icons/md";




const Navbars = () => {
    const { user, logOut } = useAuth()
    const Navs =
        <div className="space-x-5">
            <NavLink to={'/'} className={({ isActive }) => isActive ? 'btn btn-outline border border-orange-400 text-orange-400  hover:outline-none' : ' bg-orange-400 py-4 px-6 rounded-lg text-white font-bold'}>Home</NavLink>
            <NavLink to={'/allMeals'} className={({ isActive }) => isActive ? 'btn btn-outline border border-orange-400 text-orange-400  hover:outline-none' : ' bg-orange-400 py-4 px-6 rounded-lg text-white font-bold'}>Meals</NavLink>
            <NavLink to={'/upcommingMeals'} className={({ isActive }) => isActive ? 'btn btn-outline border border-orange-400 text-orange-400  hover:outline-none' : ' bg-orange-400 py-4 px-6 rounded-lg text-white font-bold'}>Upcomming</NavLink>
        </div>

    return (
        <div className="navbar fixed w-full bg-gray-100 z-10 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3  z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {Navs}
                    </ul>
                </div>
                <Link to='/'>
                    <img
                        className='w-64'
                        src={logo}
                        alt='logo'
                    />
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {Navs}
                </ul>
            </div>
            <div className="navbar-end">
                <MdOutlineNotificationAdd className="text-3xl mr-2 text-orange-400" />
                {
                    user ?
                        <div className="dropdown dropdown-end">

                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img alt="Tailwind CSS Navbar component" src={user && user.photoURL} />
                                </div>
                            </div>
                            <div tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li className="mt-3 btn bg-orange-500 text-white">
                                    <a className="justify-between">
                                        {
                                            user && user.displayName
                                        }
                                    </a>
                                </li>
                                <NavLink to={'/dashboard/profile'} className="mt-3 btn bg-orange-500 text-white">Dashboard</NavLink>
                                <li className="mt-3 btn bg-orange-500 text-white" ><button  onClick={logOut}>Logout</button></li>
                            </div>
                        </div>

                        :
                        <Link to="/login">
                            <button className="btn bg-orange-400  text-white hover:border border-orange-400">
                                Join Us
                            </button>

                        </Link>

                }
            </div>
        </div>

    );
};

export default Navbars;

