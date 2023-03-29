import styles from "../styles/Home.module.css";

const IconTextField = (props) => {
  return (
    <div className={styles.iconTextField}>
      <input type="text" {...props} autoComplete="off"></input>
      {props.icon}
    </div>
  );
};

export default IconTextField;
