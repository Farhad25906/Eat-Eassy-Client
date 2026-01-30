
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/Logo.png"
import useAuth from "../../../hooks/useAuth";
import { MdOutlineNotificationAdd, MdOutlineWbSunny, MdOutlineNightsStay } from "react-icons/md";
import { useEffect, useState } from "react";


const Navbars = () => {
    const { user, logOut } = useAuth()
    const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light");

    useEffect(() => {
        localStorage.setItem("theme", theme);
        const localTheme = localStorage.getItem("theme");
        document.querySelector("html").setAttribute("data-theme", localTheme);
    }, [theme]);

    const handleToggle = (e) => {
        if (e.target.checked) {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    }

    const Navs =
        <div className="space-x-5 flex items-center">
            <NavLink to={'/'} className={({ isActive }) => isActive ? 'btn btn-outline btn-primary hover:outline-none' : 'btn btn-ghost font-bold'}>Home</NavLink>
            <NavLink to={'/allMeals'} className={({ isActive }) => isActive ? 'btn btn-outline btn-primary hover:outline-none' : 'btn btn-ghost font-bold'}>Meals</NavLink>
            <NavLink to={'/upcommingMeals'} className={({ isActive }) => isActive ? 'btn btn-outline btn-primary hover:outline-none' : 'btn btn-ghost font-bold'}>Upcomming</NavLink>
        </div>

    return (
        <div className="navbar fixed w-full bg-base-100/90 backdrop-blur-md z-10 shadow-sm transition-colors duration-300">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {Navs}
                    </ul>
                </div>
                <Link to='/'>
                    <img
                        className='w-40 md:w-64'
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
            <div className="navbar-end flex items-center gap-2">
                {/* Theme Toggle */}
                <label className="swap swap-rotate btn btn-ghost btn-circle text-primary">
                    <input type="checkbox" onChange={handleToggle} checked={theme === "dark"} />
                    {/* sun icon */}
                    <MdOutlineWbSunny className="swap-off fill-current w-7 h-7" />
                    {/* moon icon */}
                    <MdOutlineNightsStay className="swap-on fill-current w-7 h-7" />
                </label>

                <MdOutlineNotificationAdd className="text-3xl mr-2 text-primary" />
                {
                    user ?
                        <div className="dropdown dropdown-end">

                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ring ring-primary ring-offset-base-100 ring-offset-2">
                                <div className="w-10 rounded-full">
                                    <img alt="User" src={user && user.photoURL} />
                                </div>
                            </div>
                            <div tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li className="mt-3 text-center font-bold text-primary">
                                    {user && user.displayName}
                                </li>
                                <div className="divider my-0"></div>
                                <li><Link to={'/dashboard/profile'} className="">Dashboard</Link></li>
                                <li><button onClick={logOut}>Logout</button></li>
                            </div>
                        </div>

                        :
                        <Link to="/login">
                            <button className="btn btn-primary text-white">
                                Join Us
                            </button>

                        </Link>

                }
            </div>
        </div>

    );
};

export default Navbars;

