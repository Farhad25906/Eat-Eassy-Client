import { useLoaderData, useParams } from "react-router-dom";
// import { FaLocationArrow } from "react-icons/fa";
import { useEffect, useState } from "react";
import { FcLike } from "react-icons/fc";
// import Swal from "sweetalert2";


import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import useReview from "../../hooks/useReview";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useMeals from "../../hooks/useMeals";
import { useQuery } from "@tanstack/react-query";


const MealDetails = () => {
    const avatarImg = "https://i.ibb.co/cT2y4cB/pic2.jpg"
    const [review, , refetch] = useReview();
    const [menu] = useMeals();
    // const meal = useLoaderData()
    const { id } = useParams()
    const axiosSecure = useAxiosPublic()
    const { user } = useAuth()

    const { data: payments = [] } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`)
            return res.data;
        }
    })

    const isMembershipEmpty = payments.some(payment => payment.email === user.email);
    // console.log(isMembershipEmpty);

    const mealDetails = menu.find(meals => meals._id === id);
    // console.log(mealDetails);

    const { image, price, title, likes, admin_name, description, category, ingredients, post_time } = mealDetails || {};

    const handleMealRequest = async e => {

        const filterReview = review.filter(review =>
            review.food_title === title
        );
        const user_name = user.displayName;
        const user_photo = user.photoURL;
        const user_email = user.email;

        const mealData = {
            title,
            likes,
            filterReview,
            user_name,
            user_photo,
            user_email,
            price,
            status: 'pending',

        }

        console.log(mealData);

        try {
            const { data } = await axios.post(
                'https://b9a12-server-side-eta.vercel.app/mealRequest', mealData)
            console.log(data)
            toast.success('Meal Request Posted Successfully')
            refetch()
        } catch (err) {
            console.log(err)
        }
    }

    const handleReviewSubmit = async e => {
        e.preventDefault()
        const form = e.target
        const review = form.review.value;
        const rating = form.rating.value;
        const user_name = user.displayName;
        const user_photo = user.photoURL;
        const user_email = user.email;

        const reviewData = {
            review,
            rating,
            user_name,
            user_photo,
            user_email,
            food_title: title,
            meal_id: id
        }

        // console.log(reviewData);

        try {
            const { data } = await axios.post(
                'https://b9a12-server-side-eta.vercel.app/reviews', reviewData)
            console.log(data)
            toast.success('Review Posted Successfully')
            refetch()
        } catch (err) {
            console.log(err)
        }
    }

    const filteredFood = review.filter(review =>
        review.food_title === title
    );


    const handleLike = (e) => {
        console.log(e);

        const menuItem = { likes: likes + 1 }
        // console.log(menuItem);
        const menuRes = axiosSecure.patch(`/meals/${e}`, menuItem);
        console.log(menuRes);
        toast.success('Like updated successfully');
        refetch();
    };

    return (
        <div className="max-w-2xl mx-auto overflow-hidden bg-base-100 rounded-lg shadow-md border border-base-200">
            <img className="object-cover w-full h-64" src={image} alt="Article" />

            <div className="p-6">
                <div className="flex flex-col">
                    <span className="text-lg font-medium text-primary uppercase">{category}</span>
                    <h1 className=" mt-2 text-2xl font-semibold text-base-content">{title}</h1>
                    <p className="mt-2 text-lg text-base-content/70">{description}</p>
                </div>

                <div className="mt-4 flex items-start gap-10">
                    <div className="w-[50%]">
                        <h6 className="text-lg font-bold underline text-base-content">Ingredients used</h6>
                        <ul className="text-base-content/80">
                            {ingredients?.map((ingredient, index) => (
                                <li key={index}>*{ingredient}</li>
                            ))}
                        </ul>

                    </div>

                    <div className="w-[50%] flex flex-col gap-5">
                        <div className="mb-2">
                            <h6 className="text-lg font-bold underline mb-2 text-base-content">Meal Posted By</h6>
                            <div className="flex items-center">
                                <img className="object-cover h-10 rounded-full" src="https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=48&q=60" alt="Avatar" />
                                <a className="mx-2 font-semibold text-base-content" tabIndex="0" role="link">{admin_name}</a>
                            </div>
                        </div>
                        <div className="mb-2">
                            <h6 className="text-lg font-bold underline mb-2 text-base-content">Posted Time:</h6>
                            <span className=" text-md text-base-content/70">{post_time}</span>
                        </div>
                    </div>
                </div>
                <div className="flex mb-5">
                    {
                        isMembershipEmpty ?
                            <button

                                onClick={handleMealRequest}
                                className="btn w-10/12 btn-primary text-white font-bold"

                            >
                                Meal Request
                            </button>
                            :
                            <button
                                disabled
                                className="btn w-10/12 btn-primary text-white font-bold"
                            >
                                Meal Request
                            </button>



                    }

                    <div className="flex px-3 items-center">
                        <FcLike onClick={() => handleLike(title)} className="text-4xl mr-2"></FcLike>
                        <p className="font-bold text-lg text-base-content">{likes}</p>
                    </div>
                </div>
                <div>
                    <div className="text-center">
                        <h1 className="font-bold text-2xl underline text-base-content">Reviews from users</h1>
                    </div>
                    <div className="mt-2 text-lg text-base-content/70">
                        {filteredFood.map((review, index) => (
                            <article key={index}>
                                <div className="flex items-center mb-4">
                                    <img className="w-10 h-10 me-4 rounded-full" src={review.user && review.user_photo ? review.user_photo : avatarImg} alt="" />
                                    <div className="font-bold text-base-content">
                                        <p>{review.user_name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                                    <Rating
                                        style={{ maxWidth: 180 }}
                                        value={review.rating}
                                        readOnly
                                    />
                                </div>
                                <p className="mb-3 text-base-content/80">{review.review}</p>

                            </article>
                        ))}

                    </div>
                </div>
            </div>


            <form onSubmit={handleReviewSubmit} >
                <div className="text-center">
                    <h1 className="font-bold text-2xl underline text-base-content">Post Review</h1>
                </div>
                <div className="p-5 w-full ">
                    <input
                        type="text"
                        name="review"
                        className="w-full py-3 px-5 rounded-lg border border-base-300 bg-base-100 shadow-sm focus:outline-none text-base-content placeholder-base-content/40 text-lg font-normal leading-relaxed"
                        placeholder="Write Reviews here...."
                    />

                </div>
                <div className="flex py-3 px-5">
                    <input
                        type="number"
                        name="rating"
                        id="rating"
                        min="1"
                        max="5"
                        required
                        className="w-full py-3 px-5 rounded-lg border border-base-300 bg-base-100 shadow-sm focus:outline-none text-base-content placeholder-base-content/40 text-lg font-normal leading-relaxed"
                    />
                    <input type="submit" value="Submit Comment" className=" w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-primary rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-primary/90 focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-40" />

                </div>
                <div className="flex w-full py-3 px-5">

                </div>
            </form>

        </div>
    );
};

export default MealDetails;