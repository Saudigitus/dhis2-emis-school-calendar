import React from "react";
import styles from "./Text.module.css";
import { SubtitleProps } from "../../types/text/SubtitleTypes";

function Subtitle(props: SubtitleProps): React.ReactElement {
  const { label, color } = props;

  return <h6 style={color ? { color: color } : {}} className={styles.subTitle}>{label}</h6>;
}

export default Subtitle;
