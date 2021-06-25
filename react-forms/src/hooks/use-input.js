import { useState } from 'react';

const useInput = validateValue => {
  const [value, setValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const isValid = validateValue(value);
  const hasError = !isValid && isTouched;

  const inputChangeHandler = event => {
    setValue(event.target.value);
    setIsTouched(true);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setValue('');
    setIsTouched(false);
  };

  return [value, hasError, inputChangeHandler, inputBlurHandler, reset];
};

export default useInput;
