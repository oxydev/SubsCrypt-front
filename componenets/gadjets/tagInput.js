import React, { useEffect, useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";

export default function TagInput(props) {
  const [tags, setTags] = useState([]);
  const { handleChange } = props;
  const KeyCodes = {
    comma: 188,
    enter: 13,
  };
  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  // const tagstate = {
  //     tags: [
  //         { id: "Thailand", text: "Thailand" },
  //         { id: "India", text: "India" }
  //      ],

  function handleDelete(i) {
    const tagsList = tags;
    setTags(tagsList.filter((tag, index) => index !== i));
  }

  function handleAddition(tag) {
    setTags([...tags, tag]);
  }

  useEffect(() => {
    handleChange("characteristics", tags);
  }, [tags]);

  return (
    <div className="TagInput">
      <ReactTags
        tags={tags}
        handleDelete={handleDelete}
        placeholder="Add new characteristic"
        handleAddition={handleAddition}
        delimiters={delimiters}
      />
    </div>
  );
}
