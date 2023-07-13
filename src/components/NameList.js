import React from "react";

const NameList = (props) => {
  const list = Array.from(props.data.keys()).map((key) => {
    const item = props.data.get(key)[0];

    return (
      <div
        key={key}
        className="list-item"
        onClick={() => {
          props.displayCompanyHandler(item.OperatingName.toLowerCase());
        }}
      >
        <h2>{item.LegalName}</h2>
        <p>Supplier Operating Name: {item.OperatingName}</p>
      </div>
    );
  });

  return <div className="list-container">{list}</div>;
};

export default NameList;
