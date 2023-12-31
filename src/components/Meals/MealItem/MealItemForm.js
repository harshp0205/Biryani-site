import { useRef,useState } from 'react';

import Input from '../../UI/input';
import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {

  const [amountisValid, setamountisValid]=useState(true);
  const amountInputRef = useRef();

  const submitHandler = event =>{
    event.preventDefault();

    // the current. value property holds the value in the ref that is currently  passed through the input 

    const enteredAmount= amountInputRef.current.value;
    // this value is always a string and we want the number so we have to convert it into number
    const enteredAmountNumber= +enteredAmount;

    if(
      enteredAmount.trim().length === 0 || enteredAmountNumber< 1 || enteredAmountNumber >5
    ){
      setamountisValid(false);
    }
    
    //we pass the props as we dont want to use the context here 
    
    props.onAddToCart(enteredAmountNumber);
    
  //we want to change to the string to number to pass it on to the input function to the input.js 
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label='Amount'
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>+ Add</button>
      {!amountisValid &&<p>Please enter a valid amount(1-5)</p>}
    </form>
  );
};

export default MealItemForm;