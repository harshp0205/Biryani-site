import { Fragment } from 'react';
import ReactDOM from 'react-dom';

import classes from './Modal.module.css';


//we have the backdrop and the overlay as both will recieve data so used a props as a parameter and for this we have to make a separate div in the index.html 
// to use the portals fot the overlay and the backdrop we import rect DOM 

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

//we create the portal elemeent as we also want to give the place where the overlays and the backdrop will show

const portalElement = document.getElementById('overlays');
// * this jsx code here goves a backdrop behind the main overlay section that is behind it

//and the jsx code for modal overlay gives the section where the amount and the cart is shown
const Modal = (props) => {
  return (
    <Fragment>
        

      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;



//the use of react portal here is to render the child components outside the normal dom without breaking the hierarchy
