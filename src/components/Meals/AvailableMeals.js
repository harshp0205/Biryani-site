import { useEffect,useState } from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';



//we have to convert this set of objects of meals in the form of jsx  code to use it in the available meals funciton

// we dont have any props parameter in the available meals function as we wont recieve any props here



const AvailableMeals = () => {

  const [meals, setMeals] = useState([]);
//fetch returns a promise as sending http requests is an asycnhronous thing 
  useEffect(() => {
    const fetchMeals = async() => {
      
      const response = await fetch('https://biryaniapp-d5345-default-rtdb.firebaseio.com/Meals.json');
      const responseData = await response.json();

      const loadedMeals = [];
       
      for(const key in responseData){
        loadedMeals.push({
          
          id:key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
          
        });
      }
      setMeals(loadedMeals);
    };
    fetchMeals();
  }, []);

  //we map the dummy meals list to use the data here

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;