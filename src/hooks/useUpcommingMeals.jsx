import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useUpcommingMeals = () => {
    const axiosPublic = useAxiosPublic();
    
    const {data: upcommingMeals = [], isPending: loading, refetch} = useQuery({
        queryKey: ['upcommingMeals'], 
        queryFn: async() =>{
            const res = await axiosPublic.get('/upcomming');
            return res.data;
        }
    })

    return [upcommingMeals, loading,refetch]
};

export default useUpcommingMeals;