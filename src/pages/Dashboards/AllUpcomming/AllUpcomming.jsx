import React, { useState } from 'react';
import SharedTitle from "../../../Components/Shared/Sharedtitle/SharedTitle";
import useUpcommingMeals from "../../../hooks/useUpcommingMeals";
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import toast from 'react-hot-toast';
import Spinner from '../../../Components/Shared/Spinner/Spinner';

const AllUpcomming = () => {
    const axiosPublic = useAxiosPublic()
    const [upcommingMeals,loading , refetch] = useUpcommingMeals();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    
    const handlePublishMeals = async item => {
        console.log(item);
        const mealRes = await axiosPublic.post('/meals', item);
        console.log(mealRes.data)
    }
    const sortedMeals = [...upcommingMeals].sort((a, b) => b.likes - a.likes);

    // Calculate the total number of pages
    const totalPages = Math.ceil(sortedMeals.length / itemsPerPage);

    // Get the meals for the current page
    const currentMeals = sortedMeals.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    if (loading) {
        return <Spinner />;
    }
    return (
        <div>
            <SharedTitle heading="All Upcoming Meals" subHeading="Our Regular Meals"></SharedTitle>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Item Name</th>
                            <th>Price</th>
                            <th>Likes</th>
                            <th>Distributor Name</th>
                            <th>View Meal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentMeals.map((item, index) => (
                            <tr key={item._id}>
                                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} alt="Meal Avatar" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{item.title}</td>
                                <td className="text-right">${item.price}</td>
                                <td className="text-right">{item.likes}</td>
                                <td className="text-right">{item.admin_name}</td>
                                <td>
                                    <button onClick={() => handlePublishMeals(item)} className="btn bg-orange-500 text-white">Publish Meal</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="pagination flex justify-center mt-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="btn mx-1"
                >
                    Previous
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`btn mx-1 ${currentPage === index + 1 ? 'btn-active' : ''}`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="btn mx-1"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AllUpcomming;
