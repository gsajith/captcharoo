import styles from "../styles/Slider.module.css";
import * as Slider from "@radix-ui/react-slider";

const Component = (props) => {
  return (
    <Slider.Root className={styles.sliderRoot} {...props}>
      <Slider.Track className={styles.sliderTrack}>
        <Slider.Range className={styles.sliderRange} />
      </Slider.Track>
      <Slider.Thumb className={styles.sliderThumb} />
    </Slider.Root>
  );
};

export default Component;
