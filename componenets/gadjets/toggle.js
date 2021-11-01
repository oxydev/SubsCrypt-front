import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Cookies from "js-cookie";
import { useRouter } from "next/dist/client/router";

const CheckedIcon = () => <>📚</>;
const UncheckedIcon = () => <>👩‍💻</>;

const ToggleButton = (props) => {
  const router = useRouter();
  const [toggle, setToggle] = useState(true);
  const { defaultChecked, onChange, disabled, className } = props;

  useEffect(() => {
    if (defaultChecked) {
      setToggle(defaultChecked);
    }
  }, [defaultChecked]);

  useEffect(() => {
    if (Cookies.get("tutorial") == "off") {
      setToggle(false);
    }
  }, []);

  const triggerToggle = () => {
    if (disabled) {
      return;
    }

    if (toggle) {
      Cookies.set("tutorial", "off");
      onChange("end");
    } else {
      Cookies.set("tutorial", "on");
      onChange("start");
    }

    setToggle(!toggle);
  };

  const getIcon = (type) => {
    const { icons } = props;
    if (!icons) {
      return null;
    }

    return icons[type] === undefined
      ? ToggleButton.defaultProps.icons[type]
      : icons[type];
  };

  const toggleClasses = classNames(
    "wrg-toggle",
    {
      "wrg-toggle--checked": toggle,
      "wrg-toggle--disabled": disabled,
    },
    className
  );

  return (
    <div className="title">
      Tutorial
      <div onClick={triggerToggle} className={toggleClasses}>
        <div className="wrg-toggle-container">
          <div className="wrg-toggle-check">
            {/* <span>{getIcon('checked')}</span> */}
          </div>
          <div className="wrg-toggle-uncheck">
            {/* <span>{getIcon('unchecked')}</span> */}
          </div>
        </div>
        <div className="wrg-toggle-circle"></div>
        <input
          type="checkbox"
          aria-label="Toggle Button"
          className="wrg-toggle-input"
        />
      </div>
    </div>
  );
};

ToggleButton.defaultProps = {
  icons: {
    checked: <CheckedIcon />,
    unchecked: <UncheckedIcon />,
  },
};

ToggleButton.propTypes = {
  disabled: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
  icons: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      checked: PropTypes.node,
      unchecked: PropTypes.node,
    }),
  ]),
};

export default ToggleButton;
