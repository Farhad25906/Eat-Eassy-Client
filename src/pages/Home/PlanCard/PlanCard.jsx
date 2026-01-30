import { FaCheckCircle } from "react-icons/fa";
import SharedTitle from "../../../Components/Shared/Sharedtitle/SharedTitle";
import silver from '../../../assets/Silver.png'
import gold from '../../../assets/Gold.png'
import platinum from '../../../assets/Platinum.png'
import { Link } from "react-router-dom";

const PlanCard = () => {
    const Silver = 9;
    const Gold = 19;
    const Platinum = 29;
    return (
        <div className="p-5 ">
            <SharedTitle heading="Membership Plans" subHeading="Best Monthly Meal Plans For Everyone"></SharedTitle>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Silver Plan */}
                <div className="flex flex-col w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <h5 className="mb-4 text-2xl font-bold text-center underline text-orange-500 dark:text-gray-400">Silver Membership</h5>
                    <img className="w-96" src={silver} alt="Silver Membership" />
                    <div className="flex items-baseline text-gray-900 dark:text-white">
                        <span className="text-3xl font-semibold">$</span>
                        <span className="text-5xl font-extrabold tracking-tight">{Silver}</span>
                        <span className="ms-1 text-xl font-normal text-black dark:text-gray-400">/month</span>
                    </div>
                    <ul role="list" className="space-y-2 my-4">
                        {/* ... list items ... */}
                    </ul>
                    <div className="mt-auto">
                        <Link to={`/dashboard/payment?plan=Silver&price=${Silver}`}>
                            <button type="button" className="text-white bg-orange-500 hover:bg-none focus:orange-4 focus:outline-none focus:orange-orange-200 dark:bg-blue-600 dark:hover:bg-orange-500 dark:focus:orange-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 w-full text-center">
                                Choose Silver Plan
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Gold Plan */}
                <div className="flex flex-col w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <h5 className="mb-4 text-2xl font-bold text-center underline text-orange-500 dark:text-gray-400">Gold Membership</h5>
                    <img className="w-68" src={gold} alt="Gold Membership" />
                    <div className="flex items-baseline text-gray-900 dark:text-white">
                        <span className="text-3xl font-semibold">$</span>
                        <span className="text-5xl font-extrabold tracking-tight">{Gold}</span>
                        <span className="ms-1 text-xl font-normal text-black dark:text-gray-400">/month</span>
                    </div>
                    <ul role="list" className="space-y-2 my-4">
                        {/* ... list items ... */}
                    </ul>
                    <div className="mt-auto">
                        <Link to={`/dashboard/payment?plan=Gold&price=${Gold}`}>
                            <button type="button" className="text-white bg-orange-500 hover:bg-none focus:orange-4 focus:outline-none focus:orange-blue-200 dark:bg-blue-600 dark:hover:bg-orange-500 dark:focus:orange-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 w-full text-center">
                                Choose Gold Plan
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Platinum Plan */}
                <div className="flex flex-col w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <h5 className="mb-4 text-2xl font-bold text-center underline text-orange-500 dark:text-gray-400">Platinum Membership</h5>
                    <img className="w-68" src={platinum} alt="Platinum Membership" />
                    <div className="flex items-baseline text-gray-900 dark:text-white">
                        <span className="text-3xl font-semibold">$</span>
                        <span className="text-5xl font-extrabold tracking-tight">{Platinum}</span>
                        <span className="ms-1 text-xl font-normal text-black dark:text-gray-400">/month</span>
                    </div>
                    <ul role="list" className="space-y-2 my-4">
                        {/* ... list items ... */}
                    </ul>
                    <div className="mt-auto">
                        <Link to={`/dashboard/payment?plan=Platinum&price=${Platinum}`}>
                            <button type="button" className="text-white bg-orange-500 hover:bg-none focus:orange-4 focus:outline-none focus:orange-blue-200 dark:bg-blue-600 dark:hover:bg-orange-500 dark:focus:orange-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 w-full text-center">
                                Choose Platinum Plan
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlanCard;
