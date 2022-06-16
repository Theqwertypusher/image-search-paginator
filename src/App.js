import "./App.css";

import ANIMALS from "./animals";
import { useState, useEffect } from "react";
import { usePagination } from "./usePagination";

function App() {
  const [filteredSet, setFilteredSet] = useState(ANIMALS);

  const {
    currentData,
    currentPage,
    maxPage,
    pageSize,
    handlePageChange,
    handleSizeChange,
  } = usePagination(filteredSet, 1);

  console.log(currentData());

  const handleSearchChange = (val) => {
    let newSet;
    if (!val || val === "") {
      newSet = ANIMALS;
    } else {
      newSet = ANIMALS.filter((el) => {
        return el.label.includes(val.toLowerCase());
      });
    }

    setFilteredSet(newSet);
  };

  // onChange
  const onChange = (e) => {
    const input = e.target.type;
    let val = e.target.value;
    if (input === "number") handleSizeChange(val);
    if (input === "text") handleSearchChange(val);
    if (input === "range") handlePageChange(++val);
  };

  const getPageIndexes = () => {
    console.log("log pageSize", pageSize);

    const totalItems = filteredSet.length;
    let startIdx = currentPage * pageSize;
    let endIdx = (currentPage + 1) * 2 - 1;

    // prevent over indexing of current page
    if (endIdx > totalItems) endIdx = totalItems;
    if (startIdx > totalItems) {
      startIdx = totalItems - pageSize;
    }
    if (endIdx > totalItems) {
      endIdx = totalItems;
    }

    const text =
      pageSize === 1
        ? `${startIdx} of ${endIdx}`
        : `${startIdx} - ${endIdx} of ${totalItems}`;

    console.log("log text", text);
  };

  // onKeyDown

  return (
    // DO NOT CHANGE THE HTML STRUCTURE. TESTS RELY ON IT TO WORK.
    <div className="App">
      <div className="image-viewer">
        <div className="image-viewer-images">
          {currentData().map((el) => (
            <figure className="image-viewer-image-with-caption" key={el.label}>
              <img alt={el.label} className="image-viewer-image" src={el.url} />
              <figcaption
                data-testid="caption"
                className="image-viewer-caption"
              >
                {el.label}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="image-viewer-controls">
          <div className="image-viewer-control">
            <label htmlFor="image-viewer-page-slider">Page</label>
            <input
              id="image-viewer-page-slider"
              className="image-viewer-page-slider"
              type="range"
              min={0}
              max={maxPage - 1}
              value={currentPage - 1}
              onChange={onChange}
            />
            <label
              data-testid="shown-image-range"
              htmlFor="image-viewer-page-slider"
            >
              {getPageIndexes()}
            </label>
          </div>
          <div className="image-viewer-control">
            <input
              id="image-viewer-pagesize-input"
              className="image-viewer-pagesize-input"
              type="number"
              min={1}
              max={filteredSet.length}
              value={pageSize}
              onChange={onChange}
            />
            <label htmlFor="image-viewer-pagesize-input">per page</label>
          </div>
          <div className="image-viewer-control">
            <input
              type="text"
              className="image-viewer-search"
              placeholder="Search"
              onChange={onChange}
            />
          </div>
        </div>
      </div>

      {/* TODO: Render fullscreen dialog inside this div*/}
      <div role="dialog" />
    </div>
  );
}

export default App;
