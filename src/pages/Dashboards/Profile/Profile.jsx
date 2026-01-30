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
        data: meals = [], refetch,
    } = useQuery({
        queryKey: ['meals', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/meals/${user?.email}`);
            return data;
        },
    });
    console.log(meals)


    const { data: payments = [], isLoading } = useQuery({
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
        <div className="max-w-sm mx-auto bg-base-100 rounded-lg overflow-hidden shadow-lg border border-base-200" >
            <div className="border-b border-base-200 px-4 pb-6">
                <div className="text-center my-4">
                    <img
                        className="h-32 w-32 rounded-full border-4 border-base-100 ring ring-primary ring-offset-base-100 ring-offset-2 mx-auto my-4"
                        src={user?.photoURL}
                        alt=""
                    />
                    <div className="py-2">
                        <h3 className="font-bold text-2xl text-base-content mb-1">{user?.displayName}</h3>
                        <div className="inline-flex text-base-content/70 items-center">
                            {user?.email}
                        </div>
                    </div>
                </div>
                <div className="flex gap-2 px-2">
                    <button className="flex-1 rounded-full bg-primary text-white antialiased font-bold hover:bg-primary/90 px-4 py-2 transition-colors">
                        Meals: {meals?.length}
                    </button>
                    <button className="flex-1 rounded-full border-2 border-base-300 font-semibold text-base-content px-4 py-2">
                        {profile?.membership || 'Free'}
                    </button>
                </div>
            </div>
        </div >
    );
};

export default Profile;
