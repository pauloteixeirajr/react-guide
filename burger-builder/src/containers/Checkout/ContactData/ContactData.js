import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: { type: 'text', placeholder: 'Your Name' },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
      },
      email: {
        elementType: 'input',
        elementConfig: { type: 'email', placeholder: 'Your E-mail' },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
      },
      street: {
        elementType: 'input',
        elementConfig: { type: 'text', placeholder: 'Street Name' },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
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
      },
      country: {
        elementType: 'input',
        elementConfig: { type: 'text', placeholder: 'Country' },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
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
      },
    },
    price: 0,
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};

    for (const key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
    };

    axios
      .post('/orders.json', order)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const form = { ...this.state.orderForm };
    const formEl = { ...form[inputIdentifier] };
    formEl.value = event.target.value;
    formEl.valid = this.checkValidity(formEl.value, formEl.validation);
    form[inputIdentifier] = formEl;
    console.log(formEl);
    this.setState({ orderForm: form });
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  render() {
    const formElementsArray = [];
    for (const key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        <form onSubmit={this.orderHandler}>
          {formElementsArray.map((el) => (
            <Input
              changed={(event) => this.inputChangedHandler(event, el.id)}
              key={el.id}
              elementType={el.config.elementType}
              elementConfig={el.config.elementConfig}
              value={el.config.value}
            />
          ))}
          <Button btnType="Success">ORDER</Button>
        </form>
      </div>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return form;
  }
}

export default ContactData;
