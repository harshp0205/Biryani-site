import classes from './MealsSummary.module.css';

const MealsSummary = () => {
  return (

    //this js file just gives the summary in the meals section 
    
    <section className={classes.summary}>
      <h2>Want to eat some delicious Biryani?</h2>
      <p>
        Choose your Biryani and enjoy it with your family and friends. Served in Handi!
      </p>
      <p>
        All the Biryani cooked here has a similar taste as their origin.
      </p>
    </section>
  );
};

export default MealsSummary;