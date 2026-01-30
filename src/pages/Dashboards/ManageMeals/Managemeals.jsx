import { Link } from "react-router-dom";
import useMeals from "../../../hooks/useMeals";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import SharedTitle from "../../../Components/Shared/Sharedtitle/SharedTitle";
import toast from "react-hot-toast";
import { useState } from "react";

const Managemeals = () => {
    const [menu, , refetch] = useMeals();
    const axiosPublic = useAxiosPublic();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [sortBy, setSortBy] = useState(null); // 'likes', 'reviews'
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc', 'desc'

    const handleDeleteItem = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosPublic.delete(`/meals/${item._id}`);
                if (res.data.deletedCount > 0) {
                    toast.success(`${item.title} has been deleted`);
                    refetch();
                }
            }
        });
    };

    // Sorting logic
    const sortedMeals = [...menu].sort((a, b) => {
        if (sortBy === 'likes') {
            if (sortOrder === 'asc') {
                return a.likes - b.likes;
            } else {
                return b.likes - a.likes;
            }
        } else if (sortBy === 'reviews') {
            const reviewsA = a.reviews ? a.reviews.length : 0;
            const reviewsB = b.reviews ? b.reviews.length : 0;
            if (sortOrder === 'asc') {
                return reviewsA - reviewsB;
            } else {
                return reviewsB - reviewsA;
            }
        }
        return 0;
    });

    // Pagination logic
    const totalPages = Math.ceil(sortedMeals.length / itemsPerPage);
    const currentMeals = sortedMeals.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Toggle sorting criteria
    const handleSortBy = (criteria) => {
        if (sortBy === criteria) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(criteria);
            setSortOrder('asc');
        }
        setCurrentPage(1); // Reset pagination to first page
    };

    return (
        <div>
            <SharedTitle heading="All Meals" subHeading="Our Regular Meals"></SharedTitle>

            <div className="flex justify-between mb-4">
                <div>
                    <button
                        className={`btn mx-2 ${sortBy === 'likes' ? 'btn-active bg-orange-500 text-white' : ''}`}
                        onClick={() => handleSortBy('likes')}
                    >
                        Sort by Likes {sortBy === 'likes' && sortOrder === 'asc' && <>&uarr;</>}
                        {sortBy === 'likes' && sortOrder === 'desc' && <>&darr;</>}
                    </button>
                    <button
                        className={`btn mx-2 ${sortBy === 'reviews' ? 'btn-active bg-orange-500 text-white' : ''}`}
                        onClick={() => handleSortBy('reviews')}
                    >
                        Sort by Reviews {sortBy === 'reviews' && sortOrder === 'asc' && <>&uarr;</>}
                        {sortBy === 'reviews' && sortOrder === 'desc' && <>&darr;</>}
                    </button>
                </div>

            </div>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Item Name</th>
                            <th>Price</th>
                            <th>Likes</th>
                            <th>Distributer Name</th>
                            <th>Update</th>
                            <th>Delete</th>
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
                                                <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{item.title}</td>
                                <td className="text-right">${item.price}</td>
                                <td className="text-right">{item.likes}</td>
                                <td className="text-right">{item.admin_name}</td>
                                <td>
                                    <Link to={`/dashboard/updatemeal/${item._id}`}>
                                        <button className="btn btn-ghost btn-lg">
                                            <FaEdit className="text-orange-600"></FaEdit>
                                        </button>
                                    </Link>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteItem(item)}
                                        className="btn btn-ghost btn-lg">
                                        <FaTrashAlt className="text-orange-600"></FaTrashAlt>
                                    </button>
                                </td>
                                <td>
                                    <Link to={`/meal/${item._id}`}>
                                        <button className="btn bg-orange-500 text-white">
                                            View Meal
                                        </button>
                                    </Link>
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

export default Managemeals;
