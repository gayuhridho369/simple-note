import { useEffect, useState } from "react";
import styles from "./App.module.css";
import NoteHeader from "./components/NoteHeader";
import NoteList from "./components/NoteList";
import NoteAddNew from "./components/NoteAddNew";
import NotePreview from "./components/NotePreview";

const DEFAULT_PREVIEW = {
  type: "",
  open: false,
  note: {},
  id: null,
};

function App() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [previewData, setPreviewData] = useState(DEFAULT_PREVIEW);
  const [filteredList, setFiteredList] = useState([]);

  const noteListLocalStorage = JSON.parse(
    window.localStorage.getItem("simple-note")
  );

  const [noteList, setNoteList] = useState(
    !noteListLocalStorage?.length ? [] : noteListLocalStorage
  );

  const handleSearchKeyword = (value) => {
    setSearchKeyword(value);
  };

  const openPreview = (type = "", open = false, note = {}, id = null) => {
    setPreviewData({ type, open, note, id });
  };

  const closePreview = () => {
    setPreviewData(DEFAULT_PREVIEW);
  };

  const addNote = (note) => {
    setNoteList((prev) => [
      ...prev,
      {
        ...note,
        id: noteList.length > 0 ? noteList[noteList.length - 1].id + 1 : 1,
      },
    ]);
  };

  const updateNote = (id, note) => {
    const noteTemp = [...noteList];
    const updateNote = noteTemp.findIndex((item) => item.id === id);
    noteTemp[updateNote] = note;
    setNoteList(noteTemp);
  };

  const deleteNote = (id) => {
    const noteTemp = [...noteList];
    const deleteNote = noteTemp.findIndex((item) => item.id === id);
    noteTemp.splice(deleteNote, 1);
    setNoteList(noteTemp);
  };

  useEffect(() => {
    let filteredListNew = noteList;

    if (searchKeyword) {
      if (searchKeyword.trim() === "") return;

      const noteTemp = noteList.filter((item) =>
        item.title.toLowerCase().includes(searchKeyword.toLowerCase())
      );
      filteredListNew = noteTemp;
    }

    setFiteredList(filteredListNew);
    window.localStorage.setItem("simple-note", JSON.stringify(noteList));
  }, [searchKeyword, noteList]);

  return (
    <div className={styles.container}>
      <NoteHeader onSearchKeyword={handleSearchKeyword} />

      <section className={styles.content}>
        <NoteAddNew openPreview={openPreview} />
        <NoteList
          noteList={filteredList}
          deleteNote={deleteNote}
          openPreview={openPreview}
        />
      </section>

      <NotePreview
        previewData={previewData}
        addNote={addNote}
        updateNote={updateNote}
        onClose={closePreview}
      />
    </div>
  );
}

export default App;
