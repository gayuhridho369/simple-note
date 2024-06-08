import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "./index.module.css";

export default function NoteHeader({ onSearchKeyword }) {
  const [seearchValue, setSearchValue] = useState("");

  const debounceTimeoutRef = useRef(null);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      onSearchKeyword(value);
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.noteHeader}>
      <h1 className={styles.title}>Simple Note</h1>
      <div className={styles.searchInput}>
        <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />

        <input
          type="text"
          placeholder="Search note..."
          className={styles.searchInputField}
          value={seearchValue}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
}
