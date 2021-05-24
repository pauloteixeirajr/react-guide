import React from 'react';

const withClass = (WrappedComponent, className) => {
  return (props) => (
    // {...props} passes unknown props to the wrapped component
    <div className={className}>
      <WrappedComponent {...props} />
    </div>
  );
};

export default withClass;
