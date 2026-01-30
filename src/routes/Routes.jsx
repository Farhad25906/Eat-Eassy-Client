import { createBrowserRouter } from 'react-router-dom'
import Main from '../Layouts/Main'
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/Error/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/Signup/SignUp'
import MealDetails from '../pages/MealDetails/MealDetails'
import Meal from '../pages/Meals/Meal'
import Dashboard from '../Layouts/Dashboard';
import ManageUser from '../pages/Dashboards/ManageUser/ManageUser'
import Addmeals from '../pages/Dashboards/Addmeals/Addmeals'
import Managemeals from '../pages/Dashboards/ManageMeals/Managemeals'
import AllReviews from '../pages/Dashboards/AllReviews/AllReviews'
import Profile from '../pages/Dashboards/Profile/Profile'
import UpcommingMeals from '../pages/Dashboards/UpcommingMeals/UpcommingMeals'
import Upcomming from '../pages/Upcomming/Upcomming'
import UpdateMeal from '../pages/Dashboards/ManageMeals/UpdateMeal'
import MyReviews from '../pages/Dashboards/MyReviews/MyReviews'
import MealRequest from '../pages/Dashboards/MealRequest/MealRequest'
import Payment from '../pages/Dashboards/Payment/Payment'
import PaymentHistory from '../pages/Dashboards/PaymentHistory/PaymentHistory'
import AllUpcomming from '../pages/Dashboards/AllUpcomming/AllUpcomming'
import PrivateRoute from './PrivateRoute'
import ServedMeals from '../pages/Dashboards/ServedMeals/ServedMeals'
import AdminRoute from './AdminRoute'



export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/upcommingMeals',
        element: <Upcomming />,
      },
      {
        path: '/allMeals',
        element: <Meal />,
      },
      {
        path: '/meal/:id',
        element: <PrivateRoute>
          <MealDetails />
        </PrivateRoute>,
      }

    ],
  },
  {
    path: 'dashboard',
    element: <Dashboard></Dashboard>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'allUsers',
        element: <AdminRoute><ManageUser></ManageUser></AdminRoute>
      },
      {
        path: 'addMeals',
        element: <AdminRoute><Addmeals></Addmeals></AdminRoute>
      },
      {
        path: 'allMeals',
        element: <AdminRoute><Managemeals></Managemeals></AdminRoute>
      },
      {
        path: 'allReviews',
        element: <AdminRoute><AllReviews></AllReviews></AdminRoute>
      },
      {
        path: 'profile',
        element: <Profile></Profile>
      },
      {
        path: 'upcomingMeals',
        element: <UpcommingMeals></UpcommingMeals>
      },
      {
        path: 'allupcomingMeals',
        
        element: <AllUpcomming></AllUpcomming>
      },
      {
        path: 'updatemeal/:id',
        element: <UpdateMeal></UpdateMeal>,
      },
      {
        path: 'myReviews',
        element: <MyReviews></MyReviews>
      },
      {
        path: 'requestedMeals',
        element: <MealRequest></MealRequest>
      },
      {
        path: 'payment',
        element: <Payment></Payment>
      },
      {
        path: 'serveMeals',
        element:<AdminRoute><ServedMeals></ServedMeals></AdminRoute>
      },
      {
        path: 'paymentHistory',
        element: <PaymentHistory></PaymentHistory>
      }
    ]
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
])
