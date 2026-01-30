/* eslint-disable react/prop-types */
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

import MealsCategory from '../../../Components/Shared/Shared/MealsCategory'
import SharedTitle from '../../../Components/Shared/Sharedtitle/SharedTitle'
import useMeals from '../../../hooks/useMeals'
import Spinner from '../../../Components/Shared/Spinner/Spinner'
const TabCategories = () => {

    const [meals,loading] = useMeals();
    if (loading) {
        return <Spinner />;
    }
    return (
        <Tabs className='bg-white p-5'>
            <div className=''>
               <SharedTitle heading="Food We Are Offering" subHeading="Best Meal Suggesion In town"></SharedTitle>
                
                <div className='flex items-center justify-center'>
                    <TabList>
                        <Tab>All</Tab>
                        <Tab>Breakfast</Tab>
                        <Tab>Lunch</Tab>
                        <Tab>Dinner</Tab>
                       
                    </TabList>
                </div>
                <TabPanel>
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-10 '>
                        {meals
                        .slice(0,3)
                            .map(meal => (
                                <MealsCategory key={meal._id} meal={meal} />
                            ))}
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-10 '>
                        {meals
                            .filter(r => r.category === 'Breakfast')
                            .slice(0,3)
                            .map(meal => (
                                <MealsCategory key={meal._id} meal={meal} />
                            ))}
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-10 '>
                        {meals
                            .filter(r => r.category === 'Lunch')
                            .slice(0,3)
                            .map(meal => (
                                <MealsCategory key={meal._id} meal={meal} />
                            ))}
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-10 '>
                        {meals
                            .filter(r => r.category === 'Dinner')
                            .slice(0,3)
                            .map(meal => (
                                <MealsCategory key={meal._id} meal={meal} />
                            ))}
                    </div>
                </TabPanel>

            </div>
        </Tabs>
    )
}

export default TabCategories