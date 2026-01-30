import Upcomming_Meals from "../../Components/Shared/Shared/Upcomming_Meals";
import SharedTitle from "../../Components/Shared/Sharedtitle/SharedTitle";
import useUpcommingMeals from "../../hooks/useUpcommingMeals";



const Upcomming = () => {
    const [upcommingMeals,loading,refetch] = useUpcommingMeals()
    console.log(upcommingMeals);
    return (
        <div>
            <SharedTitle heading="Upcomming Meals" subHeading="Meals We Are Adding"></SharedTitle>
            <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {
                    upcommingMeals.map(meal => (
                        <Upcomming_Meals key={meal._id} refetch={refetch} loading={loading} meal={meal} />
                    ))
                }
            </div>
        </div>
    );
};

export default Upcomming;