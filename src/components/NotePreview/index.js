import React, { useEffect, useState } from "react";
import styles from "./index.module.css";

const DEFAULT_NOTE_DATA = {
  id: null,
  title: "Title Here",
  body: "",
  color: "#A3A3A3",
};

export default function NotePreviewData({
  previewData,
  onClose,
  addNote,
  updateNote,
}) {
  const [noteData, setNoteData] = useState(DEFAULT_NOTE_DATA);

  const isAdd = previewData.type === "add";

  useEffect(() => {
    setNoteData(DEFAULT_NOTE_DATA);

    const { id, title, body, color } = previewData.note;

    if (previewData.type === "view") {
      setNoteData({
        id,
        title,
        body,
        color,
      });
    }
  }, [previewData.note, previewData.type]);

  const handleSubmit = () => {
    const payload = {
      id: noteData.id,
      title: noteData.title,
      body: noteData.body,
      color: noteData.color,
      lastUpdate: new Date(),
    };

    isAdd ? addNote(payload) : updateNote(previewData.id, payload);
    onClose();
    setNoteData(DEFAULT_NOTE_DATA);
  };

  if (!previewData.open) {
    return null;
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalContent}
        style={{ borderTopColor: noteData.color }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.modalClose} onClick={onClose}>
          &times;
        </button>

        <form
          className={styles.modalText}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className={styles.title}>
            <input
              type="text"
              name="title"
              value={noteData.title}
              onChange={(e) =>
                setNoteData((prev) => ({ ...prev, title: e.target.value }))
              }
              autoFocus
            />
          </div>
          <div className={styles.description}>
            <textarea
              name="body"
              placeholder="Note description..."
              onChange={(e) =>
                setNoteData((prev) => ({ ...prev, body: e.target.value }))
              }
              value={noteData.body}
            />
          </div>
          <div className={styles.footer}>
            <div>
              <input
                type="color"
                value={noteData.color}
                onChange={(e) =>
                  setNoteData((prev) => ({ ...prev, color: e.target.value }))
                }
              />
            </div>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
