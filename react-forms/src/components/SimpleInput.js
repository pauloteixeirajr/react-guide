import { useState } from 'react';

const SimpleInput = props => {
  const [name, setName] = useState('initialState');

  const nameInputChangeHandler = event => {
    setName(event.target.value);
  };

  const formSubmissionHandler = event => {
    event.preventDefault();

    console.log(name);
  };

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className="form-control">
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" onChange={nameInputChangeHandler} />
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
