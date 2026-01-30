import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { FaUsers } from "react-icons/fa";
import toast from 'react-hot-toast';
import SharedTitle from "../../../Components/Shared/Sharedtitle/SharedTitle";

const ManageUser = () => {
    const axiosPublic = useAxiosPublic();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const { data: users = [], isLoading: usersLoading, refetch: refetchUsers } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users');
            return res.data;
        }
    });

    const { data: payments = [], isLoading: paymentsLoading, refetch: refetchPayments } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosPublic.get('/payments');
            return res.data;
        }
    });
    console.log(payments);

    const handleMakeAdmin = user => {
        axiosPublic.patch(`/users/admin/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetchUsers();
                    toast.success(`${user.name} is an Admin Now!`);
                }
            });
    };

    // Calculate total pages
    const totalPages = Math.ceil(users.length / itemsPerPage);

    // Get current users for the current page
    const indexOfLastUser = currentPage * itemsPerPage;
    const indexOfFirstUser = indexOfLastUser - itemsPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <SharedTitle heading="All Users" />
            {(usersLoading || paymentsLoading) ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="loader"></div> {/* Customize loader styles as needed */}
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Membership Status</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map((user, index) => {
                                const userPayment = payments.find(payment => payment.email === user.email);
                                console.log(payments);
                                return (
                                    <tr key={user._id}>
                                        <th>{indexOfFirstUser + index + 1}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {user.role === 'admin' ? 'Admin' : (
                                                <button
                                                    onClick={() => handleMakeAdmin(user)}
                                                    className="btn btn-lg bg-orange-500"
                                                >
                                                    <FaUsers className="text-white text-2xl"></FaUsers>
                                                </button>
                                            )}
                                        </td>
                                        <td>{userPayment ? userPayment.membership : 'No Membership'}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
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
            )}
        </div>
    );
};

export default ManageUser;
