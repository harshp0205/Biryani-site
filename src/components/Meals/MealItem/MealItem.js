import { useContext } from 'react';
import MealItemForm from './MealItemForm';
import classes from './MealItem.module.css';
import CartContext from '../../../store/cart-context';

// the mealItem function takes props as a pareameter as it recieves the props

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);
  const price = `Rs ${props.price}`;

  const addToCartHandler= amount => {
    cartCtx.addItem({
      id: props.id,
      name: props.name ,
      amount: amount,
      price: props.price
    });

  };
  return (
    //we get the name, description anf the price of the items through props
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler}  />
      </div>
    </li>
  );
};

export default MealItem;