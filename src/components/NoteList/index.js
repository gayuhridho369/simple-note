import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { formatCurrentDateTime } from "../../utils/date";
import styles from "./index.module.css";

export default function NoteList({ noteList, openPreview, deleteNote }) {
  const handleClickCard = (event, note) => {
    if (["svg", "path"].includes(event.target.nodeName)) return;
    openPreview("view", true, note, note.id);
  };

  const handleConfirmDelete = (noteId) => {
    if (window.confirm("Are you sure want to delete this note?")) {
      deleteNote(noteId);
    }
  };

  return noteList.map((note, index) => (
    <div
      key={index}
      className={styles.noteList}
      style={{ borderTopColor: note.color }}
      onClick={(event) => handleClickCard(event, note)}
    >
      <h2 className={styles.title}>{note.title}</h2>
      <p className={styles.body}> {note.body}</p>

      <div className={styles.footer}>
        <p className={styles.datetime}>
          {formatCurrentDateTime(note.lastUpdate)}
        </p>
        <FontAwesomeIcon
          icon={faTrash}
          className={styles.delete}
          onClick={() => handleConfirmDelete(note.id)}
        />
      </div>
    </div>
  ));
}
