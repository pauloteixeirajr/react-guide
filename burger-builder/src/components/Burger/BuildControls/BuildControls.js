import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    {controls.map((control) => {
      return (
        <BuildControl
          added={() => props.ingredientAdded(control.type)}
          key={control.type}
          label={control.label}
        />
      );
    })}
  </div>
);

export default buildControls;
