import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.css";

export default function NoteAddNew({ openPreview }) {
  return (
    <div className={styles.noteAddNew} onClick={() => openPreview("add", true)}>
      <div className={styles.iconWrapper}>
        <FontAwesomeIcon icon={faPlusCircle} className={styles.iconAdd} />
      </div>
    </div>
  );
}
