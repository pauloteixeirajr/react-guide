import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as orderActions from '../../../store/actions/index';
import { checkValidity } from '../../../shared/utility';

const ContactData = (props) => {
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: 'input',
      elementConfig: { type: 'text', placeholder: 'Your Name' },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    email: {
      elementType: 'input',
      elementConfig: { type: 'email', placeholder: 'Your E-mail' },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    street: {
      elementType: 'input',
      elementConfig: { type: 'text', placeholder: 'Street Name' },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    postalCode: {
      elementType: 'input',
      elementConfig: { type: 'text', placeholder: 'ZIP Code' },
      value: '',
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5,
      },
      valid: false,
      touched: false,
    },
    country: {
      elementType: 'input',
      elementConfig: { type: 'text', placeholder: 'Country' },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    deliveryMethod: {
      elementType: 'select',
      elementConfig: {
        options: [
          { value: 'fastest', displayValue: 'Fastest' },
          { value: 'cheapest', displayValue: 'Cheapest' },
        ],
      },
      value: 'fastest',
      validation: {},
      valid: true,
      touched: true,
    },
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const orderHandler = (event) => {
    event.preventDefault();
    const formData = {};

    for (const key in orderForm) {
      formData[key] = orderForm[key].value;
    }

    const order = {
      ingredients: props.ings,
      price: props.price,
      orderData: formData,
      userId: props.userId,
    };

    props.onOrderBurger(order, props.token);
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    const form = { ...orderForm };
    const formEl = { ...form[inputIdentifier] };
    formEl.value = event.target.value;
    formEl.touched = true;
    formEl.valid = checkValidity(formEl.value, formEl.validation);
    form[inputIdentifier] = formEl;

    let formIsValid = true;

    for (const input in form) {
      formIsValid = form[input].valid && formIsValid;
    }
    setOrderForm(form);
    setFormIsValid(formIsValid);
  };

  const formElementsArray = [];
  for (const key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key],
    });
  }

  let form = (
    <div className={classes.ContactData}>
      <h4>Enter your contact data</h4>
      <form onSubmit={orderHandler}>
        {formElementsArray.map((el) => (
          <Input
            changed={(event) => inputChangedHandler(event, el.id)}
            key={el.id}
            elementType={el.config.elementType}
            elementConfig={el.config.elementConfig}
            value={el.config.value}
            shouldValidate={el.config.validation}
            touched={el.config.touched}
            invalid={!el.config.valid}
          />
        ))}
        <Button btnType="Success" disabled={!formIsValid}>
          ORDER
        </Button>
      </form>
    </div>
  );

  if (props.loading) {
    form = <Spinner />;
  }
  return form;
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(orderActions.purchaseBurger(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
