import { Fragment } from 'react';

import HeaderCartButton from './HeaderCartButton';
import mealsImage from '../../assets/mealImage.jpg';
import classes from './Header.module.css';

const Header = (props) => {
  return (

    //we passed the onClick=props.onShowCart because the cart is included in the header section and we want to see that on click 
    // so we send props function

    <Fragment>
      <header className={classes.header}>
        <h1>Handi Biryani</h1>
        <HeaderCartButton onClick={props.onShowCart}/>
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt='A table full of delicious food!' />
      </div>
    </Fragment>
  );
};

export default Header;