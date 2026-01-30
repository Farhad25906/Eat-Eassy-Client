// import { useLoaderData } from "react-router-dom";
import { useParams } from "react-router-dom";
import SharedTitle from "../../../Components/Shared/Sharedtitle/SharedTitle";
import { useForm } from "react-hook-form";
import useMeals from "../../../hooks/useMeals";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateMeal = () => {
    // const items = useLoaderData();
    const { id } = useParams()
    const [menu, , refetch] = useMeals()
    const { register, handleSubmit, reset } = useForm();

    const mealDetails = menu.find(meals => meals._id === id);
    const { _id, title, category, description, rating, price, likes, ingredients } = mealDetails
    console.log(mealDetails);

    const axiosPublic = useAxiosPublic();
    // const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        console.log(data)
        // image upload to imgbb and then get an url
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        console.log(res);
        if (res.data.success) {
            const menuItem = {
                title: data.title,
                category: data.category,
                rating: data.rating,
                likes: data.likes,
                ingredients: data.ingredients,
                price: parseFloat(data.price),
                description: data.description,
                image: res.data.data.display_url,
            }
            console.log(menuItem);

            const menuRes = await axiosPublic.patch(`/meals/${_id}`, menuItem);
            console.log(menuRes.data)
            if (menuRes.data.modifiedCount > 0) {
                // show success popup
                // reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is updated to the menu.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        console.log('with image url', res.data);
    };

    return (
        <div>
            <div>
                <SharedTitle heading="Update Meals" subHeading="Update For Your  Meals"></SharedTitle>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="form-control w-full my-2">
                        <label className="label">
                            <span className="label-text">Meal Name*</span>
                        </label>
                        <input
                            type="text"
                            defaultValue={title}
                            placeholder="Meal Name"
                            {...register('title', { required: true })}
                            required
                            className="input input-bordered w-full" />
                    </div>
                    <div className="flex gap-6">
                        {/* category */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Category*</span>
                            </label>
                            <select defaultValue={category} {...register('category', { required: true })}
                                className="select select-bordered w-full">
                                <option disabled value="default">Select a category</option>
                                <option value="salad">Breakfast</option>
                                <option value="pizza">Lunch</option>
                                <option value="soup">Dinner</option>
                            </select>
                        </div>
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text">upload image*</span>
                            </label>
                            <input  {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
                        </div>

                    </div>

                    <div className="flex gap-6">
                        {/* price */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Price*</span>
                            </label>
                            <input
                                type="number"
                                defaultValue={price}
                                placeholder="Price"
                                {...register('price', { required: true })}
                                className="input input-bordered w-full" />
                        </div>
                        {/* Ingrediants */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Ingrediants*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Ingrediants"
                                defaultValue={ingredients}
                                {...register('ingrediants', { required: true })}
                                className="input input-bordered w-full" />
                        </div>
                    </div>
                    <div className="flex gap-6">
                        {/* likes */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Likes</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Likes"
                                defaultValue={likes}
                                {...register('likes', { required: true })}
                                className="input input-bordered w-full" />
                        </div>
                        {/* Ratings */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Ratings*</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Ratings"
                                defaultValue={rating}
                                {...register('rating', { required: true })}
                                className="input input-bordered w-full" />
                        </div>
                    </div>

                    {/* recipe details */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Meal Description</span>
                        </label>
                        <textarea defaultValue={description} {...register('description')} className="textarea textarea-bordered h-24" placeholder="Meal Description"></textarea>
                    </div>

                    <div className="w-full">
                        <button className="btn w-full bg-orange-500 text-white font-bold mt-5">
                            Add Meal
                        </button>
                    </div>



                </form>
            </div>
        </div>
    );
};

export default UpdateMeal;