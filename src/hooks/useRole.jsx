// import useAuth from './useAuth'
// import useAxiosPublic from './useAxiosPublic'
// // import useAxiosSecure from './useAxiosSecure'
// import { useQuery } from '@tanstack/react-query'
// const useRole = () => {
//   const { user, loading } = useAuth()
//   const axiosSecure = useAxiosPublic()

//   const { data: role = '', isLoading } = useQuery({
//     queryKey: ['role', user?.email],
//     enabled: !loading && !!user?.email,
//     queryFn: async () => {
//       const { data } = await axiosSecure(`/users/${user?.email}`)
//       return data.role
//     },
//   })
//   return [role, isLoading]
// }

// export default useRole
