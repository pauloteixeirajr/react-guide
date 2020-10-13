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
      },
      email: {
        elementType: 'input',
        elementConfig: { type: 'email', placeholder: 'Your E-mail' },
        value: '',
      },
      street: {
        elementType: 'input',
        elementConfig: { type: 'text', placeholder: 'Street Name' },
        value: '',
      },
      postalCode: {
        elementType: 'input',
        elementConfig: { type: 'text', placeholder: 'ZIP Code' },
        value: '',
      },
      country: {
        elementType: 'input',
        elementConfig: { type: 'text', placeholder: 'Country' },
        value: '',
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ],
        },
        value: '',
      },
    },
    price: 0,
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Paulo',
        address: {
          street: 'TestStreet 1',
          zipCode: '2545454',
          country: 'Ireland',
        },
        email: 'test@test.com',
      },
      deliveryMethod: 'fastest',
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
        <form>
          {formElementsArray.map((el) => (
            <Input
              key={el.id}
              elementType={el.config.elementType}
              elementConfig={el.config.elementConfig}
              value={el.config.value}
            />
          ))}
          <Button btnType="Success" clicked={this.orderHandler}>
            ORDER
          </Button>
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
