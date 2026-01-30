import useReview from "../../../hooks/useReview";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import SharedTitle from "../../../Components/Shared/Sharedtitle/SharedTitle";
import useMeals from "../../../hooks/useMeals";
import { Link } from "react-router-dom";

const PAGE_SIZE = 10; // Number of items per page

const AllReviews = () => {
    const [review, loading, refetch] = useReview();
    const [menu] = useMeals();
    const axiosPublic = useAxiosPublic();
    const [reviewCounts, setReviewCounts] = useState({});
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        // Function to calculate review counts by food_title
        const calculateReviewCounts = () => {
            const counts = {};
            review.forEach((item) => {
                if (item.food_title in counts) {
                    counts[item.food_title]++;
                } else {
                    counts[item.food_title] = 1;
                }
            });
            setReviewCounts(counts);
        };

        calculateReviewCounts();
    }, [review]);

    const handleDeleteItem = async (item) => {
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
                const res = await axiosPublic.delete(`/reviews/${item._id}`);
                if (res.data.deletedCount > 0) {
                    toast.success(`${item.food_title} has been deleted`);
                    refetch();
                }
            }
        });
    };

    const currentReviews = review.filter((item) => {
        const meal = menu.find((meal) => meal.title === item.food_title);
        return meal && meal.likes > 0;
    });

    // Pagination logic
    const totalPages = Math.ceil(currentReviews.length / PAGE_SIZE);
    const indexOfLastItem = currentPage * PAGE_SIZE;
    const indexOfFirstItem = indexOfLastItem - PAGE_SIZE;
    const currentPaginatedReviews = currentReviews.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <SharedTitle heading="All Reviews" subHeading="Reviews From Our Daily Users" />
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="loader"></div>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Item Name</th>
                                <th>Likes</th>
                                <th>Reviews Count</th>
                                <th>Delete</th>
                                <th>View Meal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPaginatedReviews.map((item, index) => {
                                const meal = menu.find((meal) => meal.title === item.food_title);
                                const likes = meal ? meal.likes : 0;
                                const mealId = meal ? meal._id : 0;

                                return (
                                    <tr key={item._id}>
                                        <th>{indexOfFirstItem + index + 1}</th>
                                        <td>{item.food_title}</td>
                                        <td>{likes}</td>
                                        <td>{reviewCounts[item.food_title]}</td>
                                        <td>
                                            <button
                                                onClick={() => handleDeleteItem(item)}
                                                className="btn btn-ghost btn-lg"
                                            >
                                                <FaTrashAlt className="text-orange-600" />
                                            </button>
                                        </td>
                                        <td>
                                            <Link to={`/meal/${mealId}`}>
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
                    <div className="pagination flex justify-center mt-4">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="btn mx-1"
                        >
                            Previous
                        </button>
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => paginate(index + 1)}
                                className={`btn mx-1 ${currentPage === index + 1 ? 'btn-active' : ''}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="btn mx-1"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllReviews;
