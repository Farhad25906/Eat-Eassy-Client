import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useReview = () => {
    const axiosPublic = useAxiosPublic();
    
    const {data: review = [], isPending: loading, refetch} = useQuery({
        queryKey: ['review'], 
        queryFn: async() =>{
            const res = await axiosPublic.get('/reviews');
            return res.data;
        }
    })

    return [review, loading,refetch]
};

export default useReview;