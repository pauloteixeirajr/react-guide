import { useRef, useState } from 'react';

const SimpleInput = props => {
  const nameInputRef = useRef();
  const [name, setName] = useState('initialState');

  const nameInputChangeHandler = event => {
    setName(event.target.value);
  };

  const formSubmissionHandler = event => {
    event.preventDefault();
    const refValue = nameInputRef.current.value;

    console.log(name, refValue);
  };

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className="form-control">
        <label htmlFor="name">Your Name</label>
        <input
          ref={nameInputRef}
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
        />
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
