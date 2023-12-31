import React from 'react';
import { forwardRef } from 'react';
import classes from './input.module.css';

//we use the forward ref to the input as we want the forwadded ref to change dynamically the inut from the MealItemForm.js 

const Input = forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  );
});

export default Input;