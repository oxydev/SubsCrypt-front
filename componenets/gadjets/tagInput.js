import React, { useEffect, useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";

//ُThe component for generating the input field for plan characteristics
export default function TagInput(props) {
  const { initailTags, handleChange } = props;
  const [tags, setTags] = useState([...initailTags]);
  const KeyCodes = {
    comma: 188,
    enter: 13,
  };

  const delimiters = [KeyCodes.comma, KeyCodes.enter];

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

  // console.log(tags);

  return (
    <div className="TagInput">
      <ReactTags
        tags={initailTags}
        handleDelete={handleDelete}
        placeholder="Add new characteristic"
        handleAddition={handleAddition}
        delimiters={delimiters}
      />
    </div>
  );
}
