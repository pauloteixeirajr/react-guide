import classes from './Card.module.css';

const Card = ({ children, className, ...props }) => {
  return (
    <div className={`${classes.card} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;
