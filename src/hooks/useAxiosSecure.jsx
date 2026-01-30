import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'https://b9a12-server-side-eta.vercel.app'
})
const useAxiosSecure = () => {

    return axiosSecure;
};

export default useAxiosSecure;