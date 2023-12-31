import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

//helper functions used for validating the form

const isEmpty = value => value.trim()=== '';
const isNotSix = value => value.trim().length !== 6;

const Checkout = (props) => {

     const [formValidity , setFromvalidity] = useState({
        name:true,
        address: true,
        city: true,
        pin: true

     });

    const nameInputref = useRef();
    const addressInputref = useRef();
    const pinInputref = useRef();
    const cityInputref = useRef();



  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputref.current.value;
    const enteredAddress = addressInputref.current.value;
    const enteredPin = pinInputref.current.value;
    const enteredCity = cityInputref.current.value;

    const enteredNameIsvalid = !isEmpty(enteredName);
    const enteredAddressIsvalid = !isEmpty(enteredAddress);
    const enteredCityIsvalid = !isEmpty(enteredCity);
    const enteredPinIsvalid = !isNotSix(enteredPin);
    
     setFromvalidity({
        name:enteredNameIsvalid,
        address: enteredAddressIsvalid,
        city: enteredCityIsvalid,
        pin:enteredPinIsvalid
     });

    const formIsValid = enteredAddressIsvalid && enteredAddressIsvalid && enteredCityIsvalid && enteredPinIsvalid;

    if(!formIsValid){
        return;
    }

    props.onConfirm({
        name: enteredName,
        address: enteredAddress,
        pin: enteredPin,
        city: enteredCity
    })

  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`{classes.control} ${formValidity.name ? '' : classes.invalid }`} >
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputref}/>
        {!formValidity.name && <p>Please enter a valid name</p>}
      </div>
      <div className={`{classes.control} ${formValidity.address ? '' : classes.invalid }`} >
        <label htmlFor='address'>Address</label>
        <input type='text' id='address'ref={addressInputref} />
         {!formValidity.address && <p>Please enter a valid address</p>}
      </div>
      <div className={`{classes.control} ${formValidity.pin ? '' : classes.invalid }`} >
        <label htmlFor='pin'>Pincode</label>
        <input type='text' id='pin'ref={pinInputref} />
        {!formValidity.pin && <p>Please enter a 6-digit Pincode</p>}
      </div>
      <div className={`{classes.control} ${formValidity.city ? '' : classes.invalid }`} >
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputref}/>
        {!formValidity.city && <p>Please enter a valid City</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;