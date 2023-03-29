import styles from "../styles/Home.module.css";

const TextField = (props) => {
  return (
    <input
      className={styles.textField}
      type="text"
      {...props}
      autoComplete="off"
    />
  );
};

export default TextField;
