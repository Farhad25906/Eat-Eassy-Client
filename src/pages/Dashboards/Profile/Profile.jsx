import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
// import useAxiosPublic from "../../../hooks/useAxiosPublic";
// import useRole from "../../../hooks/useRole";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
// import useMeals from "../../../hooks/useMeals";
import Spinner from "../../../Components/Shared/Spinner/Spinner";


const Profile = () => {
    const { user } = useAuth()
    // const [role,isLoading] = useRole()
    const axiosSecure = useAxiosPublic()

    // console.log(user.email);

    const {
        data: meals = [],refetch,
    } = useQuery({
        queryKey: ['meals', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/meals/${user?.email}`);
            return data;
        },
    });
    console.log(meals)


    const { data: payments = [], isLoading} = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user?.email}`)
            return res.data;
        }
    })

    const profile = payments.find(payment => payment.email === user?.email);

    if (isLoading) {
        return <Spinner />;
    }
    return (
        <div className="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg" >
            <div className="border-b px-4 pb-6">
                <div className="text-center my-4">
                    <img
                        className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
                        src={user?.photoURL}
                        alt=""
                    />
                    <div className="py-2">
                        <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">{user?.displayName}</h3>
                        <div className="inline-flex text-gray-700 dark:text-gray-300 items-center">
                            {user?.email}
                        </div>
                    </div>
                </div>
                <div className="flex gap-2 px-2">
                    <button className="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2">
                        {meals?.length}
                    </button>
                    <button className="flex-1 rounded-full border-2 border-gray-400 dark:border-gray-700 font-semibold text-black dark:text-white px-4 py-2">
                        {profile?.membership}
                    </button>
                </div>
            </div>
        </div >
    );
};

export default Profile;
