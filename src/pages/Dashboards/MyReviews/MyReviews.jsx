import React, { useState } from "react";
import SharedTitle from "../../../Components/Shared/Sharedtitle/SharedTitle";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useMeals from "../../../hooks/useMeals";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Spinner from "../../../Components/Shared/Spinner/Spinner";

const MyReviews = () => {
    const [menu] = useMeals();
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const [currentPage, setCurrentPage] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [updateReviews, setupdateReviews] = useState('');
    const [Id, setId] = useState('');
    const itemsPerPage = 10;

    const { data: reviews = [], isPending: loading, refetch } = useQuery({
        queryKey: ["reviews", user?.email],
        queryFn: async () => {
            const { data } = await axiosPublic(`/reviews/${user?.email}`);
            return data;
        },
    });

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
                const res = await axiosPublic.delete(`/reviews/${item._id}?email=${user?.email}`);
                if (res.data.deletedCount > 0) {
                    toast.success(`${item.food_title} has been deleted`);
                    refetch();
                } else {
                    toast.error("You are not authorized to delete this review.");
                }
            }
        });
    };

    const handleButtonClick = (item) => {
        // console.log(item);
        setIsOpen(true);
        setupdateReviews(item.food_title);
        setId(item._id);
    }
    const handleReviewSubmit = async e => {
        e.preventDefault()
        const form = e.target
        const review = form.review_text.value;
        const rating = form.rating.value;

       
        const reviewData = {
            review, rating,
        }
        // console.log(reviewData);
        const menuRes = await axiosPublic.put(`/upDateReviews/${Id}`, reviewData);
        console.log(menuRes.data)
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentReviews = reviews.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(reviews.length / itemsPerPage);
    if (loading) {
        return <Spinner />;
    }
    return (
        <div>
            <SharedTitle heading="My Reviews" subHeading="Reviews From Our Daily Users"></SharedTitle>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Item Name</th>
                            <th>Likes</th>
                            <th>Review</th>
                            <th>Edit</th>
                            <th>Delete</th>
                            <th>View Meal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentReviews.map((item, index) => {
                            const meal = menu.find(meal => meal.title === item.food_title);
                            const likes = meal ? meal.likes : 0;
                            const ids = meal ? meal._id : 0;

                            return (
                                <tr key={item._id}>
                                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                    <td>{item.food_title}</td>
                                    <td className="text-right">{likes}</td>
                                    <td className="text-right">{item.review}</td>
                                    <td>
                                        <button onClick={() => handleButtonClick(item)} className="btn btn-ghost btn-lg">
                                            <FaEdit className="text-orange-600"></FaEdit>
                                        </button>
                                    </td>
                                    {isOpen && (
                                        <div className="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                                            <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                                                <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>
                                                <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
                                                    <h3 className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">
                                                        Review Meal
                                                    </h3>
                                                    <form onSubmit={handleReviewSubmit} className="mt-4" action="#">
                                                        
                                                        <label className="block mt-3" htmlFor="commentText">Write A review</label>
                                                        <textarea
                                                            name="review_text"
                                                            id="reviewText"
                                                            placeholder="Write review"
                                                            defaultValue={item.review}
                                                            className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-orange-400 focus:outline-none focus:ring focus:ring-orange-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-orange-300"
                                                        />
                                                        <label htmlFor="rating" className="text-sm text-gray-700 dark:text-gray-200">
                                                            Rating (1-5)
                                                        </label>
                                                        <input
                                                            type="number"
                                                            name="rating"
                                                            defaultValue={item.rating}
                                                            id="rating"
                                                            min="1"
                                                            max="5"
                                                            required
                                                            className="block w-full px-4 py-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-orange-400 focus:outline-none focus:ring focus:ring-orange-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-orange-300"
                                                        />
                                                        <div className="mt-4 sm:flex sm:items-center sm:-mx-2">
                                                            <button type="button" onClick={() => setIsOpen(false)} className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                                                                Cancel
                                                            </button>
                                                            <input type="submit" value="Submit Comment" className="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-orange-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-orange-500 focus:outline-none focus:ring focus:ring-orange-300 focus:ring-opacity-40" />
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <td>
                                        <button onClick={() => handleDeleteItem(item)} className="btn btn-ghost btn-lg">
                                            <FaTrashAlt className="text-orange-600"></FaTrashAlt>
                                        </button>
                                    </td>
                                    <td>
                                        <Link to={`/meal/${ids}`}>
                                            <button className="btn bg-orange-500 text-white">
                                                View Meal
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="flex justify-center mt-4">
                    <button
                        className="btn bg-gray-500 text-white mr-2"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span className="btn bg-gray-300 text-black mr-2">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        className="btn bg-gray-500 text-white"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>

        </div>

    );
};

export default MyReviews;
