import React from "react";

const Button = ({ onClick, text }) => {
  console.log(`Rendering button. onclick=${onclick}`);
  return (
    <>
      <button onClick={onClick}>{text}</button>
    </>
  );
};

export default Button;
