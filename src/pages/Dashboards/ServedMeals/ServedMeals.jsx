import { useState } from "react";
import useUpcommingMeals from "../../../hooks/useUpcommingMeals";
import SharedTitle from "../../../Components/Shared/Sharedtitle/SharedTitle";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";


const ServedMeals = () => {
    // const [upcommingMeals, , refetch] = useUpcommingMeals();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const axiosSecure = useAxiosPublic()
    const {
        data: requested = [], isLoading, refetch,
    } = useQuery({
        queryKey: ['requested',],
        queryFn: async () => {
            const { data } = await axiosSecure(`/requested_meals`);
            return data;
        },
    });
    const handleServedMeals = item => {
        axiosSecure.patch(`/servedMeal/${item._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    toast.success(`${item.title} Served`)
                }
            })
    }

    console.log(requested);

    // Calculate the total number of pages
    const totalPages = Math.ceil(requested.length / itemsPerPage);

    // Get the meals for the current page
    const currentMeals = requested.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    return (
        <div>
            <SharedTitle heading="Served Meals" subHeading="Requested Meals To Serve"></SharedTitle>
            {isLoading ? (
                <div className="spinner-border text-primary text-center" role="status">
                    <span className="loading loading-infinity loading-lg text-orange-500 "></span>
                </div>
            ) :
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Item Name</th>
                                <th>User Email</th>
                                <th>User Name</th>
                                <th>Status</th>
                                <th>Publish Meal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentMeals.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                    <td>{item.title}</td>
                                    <td>{item.user_email}</td>
                                    <td className="">{item.user_name}</td>
                                    <td className="">{item.status}</td>

                                    <td>
                                        {
                                            item.status === 'served' ?
                                            <button disabled className="btn bg-orange-500 text-white">Publish</button>
                                            :
                                            <button onClick={() => handleServedMeals(item)} className="btn bg-orange-500 text-white">Publish</button>
                                    }
                                        
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }

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

export default ServedMeals;