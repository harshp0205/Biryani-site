import { useContext , useState, Fragment} from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

const Cart = (props) => {

    const [isCheckout, setIsCheckout] =useState(false);

    const   [submitting, setSubmititng] = useState(false);

    const [didSubmit, setDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = `Rs${cartCtx.totalAmount}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };


  const orderHandler = () =>{
    setIsCheckout(true);

  };

  const SubmitHandler = async (data) => { 

    setSubmititng(true);

    await  fetch('https://biryaniapp-d5345-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: data,
        orderedItems: cartCtx.items
      })
  });
  setSubmititng(false);
  setDidSubmit(true);
  cartCtx.clearCart();
  };

//we use the cartItems to convert the cartItems to the JSX elements
                               
  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          // the bind here as bind pre configures as a function for future execution and basically llow youo to preconfigure the argument which is item.id and the item here
          
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions =(
    <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
      </div>
  );

  const finalModal = (<Fragment>{cartItems}
  <div className={classes.total}>
    <span>Total Amount</span>
    <span>{totalAmount}</span>
  </div>
  {isCheckout && <Checkout onConfirm= {SubmitHandler} onCancel = {props.onClose}></Checkout>}

  {!isCheckout && modalActions }
  </Fragment>
  );

  const isSubmitting = <p>Ordering your food</p>

  const didSubmitcontent= <Fragment><p>Ordered.</p>
  <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
        
      </div>
  </Fragment>

  return (
    <Modal onClose={props.onClose}>
      {!submitting && !didSubmit&&  finalModal}
      {submitting &&isSubmitting}
      {didSubmit && !submitting && didSubmitcontent}
      
    </Modal>
  );
}; 

export default Cart;