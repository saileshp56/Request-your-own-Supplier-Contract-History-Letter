import React from "react";

const NameList = (props) => {
  console.log("yo", props);

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
        <p>Code: {item.Code}</p>
      </div>
    );
  });

  console.log(props.data);

  return <div className="list-container">{list}</div>;
};

export default NameList;
