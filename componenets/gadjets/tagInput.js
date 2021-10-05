import React, { useEffect, useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";

// const StyledReactTags = styled.div`
//   //ReactTags__tags
//   //ReactTags__tagInput
//   //ReactTags__tagInputField
//   //ReactTags__selected
//   //ReactTags__selected ReactTags__tag
//   //ReactTags__selected ReactTags__remove
//   //ReactTags__suggestions
//   //ReactTags__activeSuggestion
//   //ReactTags__editTagInput
//   //ReactTags__editTagInputField
//   //ReactTags__clearAll
//
//   .react-tags-wrapper {
//     position: relative;
//   }
//   .ReactTags__selected {
//     display: flex;
//     align-items: center;
//     flex-wrap: wrap;
//     justify-content: flex-start;
//     min-height: 54px;
//     padding: 10px 10px 0;
//     border: 1px solid ${({ theme }) => theme.Gray.gray_5};
//     border-radius: ${({ theme }) => theme.BorderRadius.borderRadiusRegular};
//   }
//   .ReactTags__tag {
//     display: block;
//     background-color: ${({ theme }) => theme.Color.purple};
//     height: 28px;
//     border-radius: 14px;
//     font-weight: ${({ theme }) => theme.Weight.fontWeightLight};
//     font-size: ${({ theme }) => theme.FontSize.fontSizeBodyVerySmall};
//     color: ${({ theme }) => theme.Color.white};
//     line-height: 30px;
//     padding: 0 10px;
//     z-index: 5;
//     margin: 0 6px 10px;
//     display: flex;
//     align-items: center;
//     flex-shrink: 0;
//   }
//   .ReactTags__tagInput {
//     flex-grow: 1;
//   }
//   .ReactTags__tagInputField {
//     border: none !important;
//     margin: 0 6px 10px !important;
//     height: unset !important;
//     padding: 0 !important;
//   }
//   .ReactTags__remove {
//     background-color: transparent;
//     color: ${({ theme }) => theme.Color.white};
//     outline: none;
//     border: none;
//   }
// `;

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
