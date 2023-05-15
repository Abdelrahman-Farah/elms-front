import classes from './Card.module.css';

const Card = props => {
  const styles = classes.card + ' ' + props.className;
  return <div className={styles}>{props.children}</div>;
};

export default Card;
