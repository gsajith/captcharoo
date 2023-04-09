import styles from "../styles/Home.module.css";

const TextField = ({ className, ...otherProps }) => {
  return (
    <input
      className={`${styles.textField} ${className}`}
      type="text"
      autoComplete="off"
      {...otherProps}
    />
  );
};

export default TextField;
