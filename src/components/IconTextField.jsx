import styles from "../styles/Home.module.css";

const IconTextField = ({ icon, ...otherProps }) => {
  return (
    <div className={styles.iconTextField}>
      <input type="text" autoComplete="off" {...otherProps}></input>
      {icon}
    </div>
  );
};

export default IconTextField;
