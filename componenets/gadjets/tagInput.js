import React, { useEffect, useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";

export default function TagInput(props) {
  const { initailTags, handleChange } = props;
  console.log(initailTags);
  const [tags, setTags] = useState([...initailTags]);
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

  console.log(tags);

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
