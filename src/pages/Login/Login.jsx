import { Link, useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import toast from 'react-hot-toast'
import SocialLogin from '../../Components/Shared/SocialLogin/SocialLogin'
import { useForm } from 'react-hook-form'
import backgroundImage from '../../assets/bg.jpeg';
const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location?.state || '/'
  const { signIn, setLoading } = useAuth()
  // const [email, setEmail] = useState('')
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const onSubmit = async data => {
    console.log(data);
    const email = data.email;
    const password = data.password
    console.log(email, password);
    signIn(email, password)
      .then(result => {
        const user = result.user;
        // console.log(user);
        toast.success('Log in Successful');
        navigate(from, { replace: true });
      })
      .catch(error => {
        // Handle the error here
        console.error('Sign in error:', error);
        toast.error('An error occurred while signing in');
      });
  }

  // const handleSubmit = async e => {
  //   e.preventDefault()
  //   const form = e.target
  //   const email = form.email.value
  //   const password = form.password.value

  //   try {
  //     setLoading(true)
  //     // 1. sign in user
  //     await signIn(email, password)
  //     navigate(from)
  //     toast.success('Login Successful')
  //   } catch (err) {
  //     console.log(err)
  //     toast.error(err.message)
  //     setLoading(false)
  //   }
  // }



  return (
    <div className='flex justify-center items-center min-h-screen' style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 text-base-content bg-base-100/95 shadow-xl'>
        <div className='mb-2 text-center'>
          <h1 className='my-3 text-4xl font-bold text-primary'>Sign In</h1>
          <p className='text-sm text-base-content/70'>Welcome to Eateassy</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="card-body p-0">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email"  {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
            {errors.email && <span className="text-error mt-1">Email is required</span>}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input type="password"  {...register("password", {
              required: true,
            })} placeholder="password" className="input input-bordered" />


          </div>
          <div className="form-control mt-6">
            <input className="btn btn-primary text-white" type="submit" value="Sign In" />
          </div>
        </form>

        <div className='flex flex-col items-center pt-4 space-x-1'>

          <p className='px-3 text-sm text-base-content/70'>
            Login with social accounts
          </p>
          <div className='flex pt-4'>
            <SocialLogin></SocialLogin>
          </div>
          <p className='px-6 text-sm text-center text-base-content mt-4'>
            Don&apos;t have an account yet?{' '}
            <Link
              to='/signup'
              className='hover:underline text-primary font-bold'
            >
              Sign up
            </Link>
            .
          </p>
        </div>


      </div>
    </div>
  )
}

export default Login
