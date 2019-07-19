import React from "react";
import "./styles.css";

Container.defaultProps = {
  size: "big", // {fullWith, big, medium, small}
  style: {},
  className: ""
};

export default function Container({ className, size, children }) {
  const getClassName = () => {
    const className = ["os_container"];
    className.push(`os_container_${size}`);
    if (className) className.push(className);

    return className.join(" ");
  };

  return <div className={getClassName()}>{children}</div>;
}
