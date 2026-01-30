import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useMeals = () => {
    const axiosPublic = useAxiosPublic();
    
    const {data: menu = [], isPending: loading, refetch} = useQuery({
        queryKey: ['menu'], 
        queryFn: async() =>{
            const res = await axiosPublic.get('/meals');
            return res.data;
        }
    })

    return [menu, loading,refetch]
}

export default useMeals;