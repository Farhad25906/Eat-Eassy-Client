import Banner from "./Banner/Banner";
// import CategoryRooms from "./Tabs/CategoryRooms";
import MealsTab from "./Meals/MealsTab";
import PlanCard from "./PlanCard/PlanCard";
import Products from "./Products/Products";
import Sepecial from "./Special/Sepecial";


const Home = () => {
    
    return (
        <div>
            <Banner></Banner>
            <Products></Products>
            <MealsTab></MealsTab>
            <PlanCard></PlanCard>
            <Sepecial></Sepecial>
        </div>
    );
};

export default Home;