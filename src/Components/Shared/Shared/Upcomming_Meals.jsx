import React from 'react';
import toast from 'react-hot-toast';
import { FaStar } from 'react-icons/fa';
import { FcLike } from 'react-icons/fc';
import { LuCircleDollarSign } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import Spinner from '../Spinner/Spinner';

const Upcomming_Meals = ({ meal,loading, refetch }) => {
    const { _id, image, title, price, description, rating, category, likes } = meal;
    const {user} = useAuth()

    const axiosSecure = useAxiosPublic()
    const { data: payments = [] } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments`)
            return res.data;
        }
    })
   
    const userPayment = payments.find(payment => payment.email === user?.email);
    
    const Membership = userPayment?.membership
    const handleLike = (id) => {
        
        if(Membership === 'Silver' || Membership === 'Gold' || Membership === 'Platinum'){
            const menuItem = { likes: likes + 1 };
        // console.log(id, menuItem);

        axiosSecure.patch(`/upcommingMeals/${id}`, menuItem)
            .then(response => {
                console.log('Like updated successfully', response.data);
                toast.success('Like updated successfully');
                refetch();
            })
            .catch(error => {
                console.error('Error updating like', error);
                toast.error('Failed to update like');
            }
            );
        }else{
            toast.error('Yo Cant Like This Card, You Are Not Premium Member');
        }
        
    };
    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="border rounded-lg shadow-md flex flex-col mb-10">
            <div className="h-60 overflow-hidden rounded-t-lg">
                <img
                    src={image}
                    alt="card-image"
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                    <div className="mb-2 flex items-center justify-between">
                        <span className="text-black text-xl font-medium">{title}</span>

                    </div>
                    <p className="text-black text-sm font-normal opacity-75">
                        {description}
                    </p>
                </div>
                <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-black font-bold">Price: {price}</span>
                        <LuCircleDollarSign />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-black font-bold">Rating:{rating}</span>
                        <FaStar className="text-yellow-500" />
                    </div>
                </div>
                <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-black font-bold">Category: {category}</span>

                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-black font-bold">Likes:{likes}</span>
                        <FcLike onClick={() => handleLike(_id)} className="text-2xl" />
                    </div>
                </div>
            </div>
            {/* <div className="p-4">
                <Link to={`/upcomming/${_id}`}>
                    <button
                        className="w-full h-12 py-2 text-white bg-orange-500 rounded-lg shadow-none hover:scale-105 focus:scale-105 active:scale-100 transition-transform duration-300 font-bold"
                    >
                        View Details
                    </button>
                </Link>
            </div> */}
        </div>
    );
};

export default Upcomming_Meals;