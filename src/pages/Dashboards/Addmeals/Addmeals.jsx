import { useForm } from "react-hook-form";
import SharedTitle from "../../../Components/Shared/Sharedtitle/SharedTitle";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const Addmeals = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()
    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


    const onSubmit = async (data) => {

        console.log(data, image_hosting_api)
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        console.log(res);
        if (res.data.success) {
            // now send the menu item data to the server with the image url
            const mealItem = {
                title: data.name,
                category: data.category,
                price: parseFloat(data.price),
                ingredients: data.ingrediants,
                image: res.data.data.display_url,
                description: data.recipe,
                likes: parseFloat(data.likes),
                rating: data.ratings,
                admin_name: user.displayName,
                email: user?.email,
                admin_photo: user?.photoURL
            }
            console.log(mealItem);

            const mealRes = await axiosPublic.post('/meals', mealItem);
            console.log(mealRes.data)
            if (mealRes.data.insertedId) {
                // show success popup
                reset();
                toast.success(`${data.name} is added to the meal.`)

            }
        }
        // console.log( 'with image url', res.data);
    };
    return (
        <div>
            <SharedTitle heading="Add Meals" subHeading="Add Meals For Your  Users"></SharedTitle>
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className="form-control w-full my-2">
                    <label className="label">
                        <span className="label-text">Meal Name*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Meal Name"
                        {...register('name', { required: true })}
                        required
                        className="input input-bordered w-full" />
                </div>
                <div className="flex gap-6">
                    {/* category */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Category*</span>
                        </label>
                        <select defaultValue="default" {...register('category', { required: true })}
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
                        <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
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
                            {...register('ingrediants', { required: true })}
                            className="input input-bordered w-full" />
                    </div>
                </div>
                <div className="flex gap-6">
                    {/* likes */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Likes*</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Likes"
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
                            {...register('ratings', { required: true })}
                            className="input input-bordered w-full" />
                    </div>
                </div>

                {/* recipe details */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Meal Description</span>
                    </label>
                    <textarea {...register('recipe')} className="textarea textarea-bordered h-24" placeholder="Meal Description"></textarea>
                </div>

                <div className="w-full">
                    <button className="btn w-full bg-orange-500 text-white font-bold mt-5">
                        Add Meal
                    </button>
                </div>



            </form>
        </div>
    );
};

export default Addmeals;