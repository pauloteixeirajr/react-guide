import Button from '../Button/Button';
import Card from '../Card/Card';
import classes from './ErrorModal.module.css';

const ErrorModal = ({ title, message, onClose }) => {
  return (
    <div>
      <div className={classes.backdrop} onClick={onClose} />
      <Card className={classes.modal}>
        <header className={classes.header}>
          <h2>{title}</h2>
        </header>
        <div className={classes.content}>
          <p>{message}</p>
        </div>
        <footer className={classes.actions}>
          <Button onClick={onClose}>Okay</Button>
        </footer>
      </Card>
    </div>
  );
};

export default ErrorModal;
