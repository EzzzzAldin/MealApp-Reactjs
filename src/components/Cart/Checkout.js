import { useRef, useState } from "react";

import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChar = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  // Use Ref Hook To Get Value Of Input
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    // Get Value Of Inputs
    const enterdName = nameInputRef.current.value;
    const enterdStreet = streetInputRef.current.value;
    const enterdPostal = postalInputRef.current.value;
    const enterdCity = cityInputRef.current.value;

    // Check If All Values Is Valid
    const enterdNameIsValid = !isEmpty(enterdName);
    const enterdStreetIsValid = !isEmpty(enterdStreet);
    const enterdCityIsValid = !isEmpty(enterdCity);
    const enterdPostalIsValid = isFiveChar(enterdPostal);

    setFormInputValidity({
      name: enterdNameIsValid,
      street: enterdStreetIsValid,
      city: enterdCityIsValid,
      postalCode: enterdPostalIsValid,
    });

    const formIsValid =
      enterdNameIsValid &&
      enterdStreetIsValid &&
      enterdCityIsValid &&
      enterdPostalIsValid;

    if (!formIsValid) return;

    // Submited Data
    props.onConfirm({
      name: enterdName,
      street: enterdStreet,
      postalCode: enterdPostal,
      city: enterdCity,
    });
  };

  const nameControlClasses = `${classes.control} ${
    formInputValidity.name ? "" : classes.invalid
  }`;

  const streetControlClasses = `${classes.control} ${
    formInputValidity.street ? "" : classes.invalid
  }`;
  const postalControlClasses = `${classes.control} ${
    formInputValidity.postalCode ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputValidity.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name && <p>Please Enter Valid Name.</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputValidity.street && <p>Please Enter Valid Street.</p>}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputValidity.postalCode && <p>Please Enter Valid PostalCode.</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValidity.city && <p>Please Enter Valid City.</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
