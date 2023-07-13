import React, { useState, useEffect, useRef } from "react";

const ContractList = (props) => {
  const [list, setList] = useState([]);
  const [selectedContracts, setSelectedContracts] = useState([]);
  let allContracts = useRef([]);

  useEffect(() => {
    let ds = new Map();

    props.data.forEach((item) => {
      if (ds.has(item.CONTRACT_NUMBER)) {
        let curr_amendment = ds.get(item.CONTRACT_NUMBER).CONTRACT_AMENDMENT;
        if (parseInt(curr_amendment) < parseInt(item.CONTRACT_AMENDMENT)) {
          ds.set(item.CONTRACT_NUMBER, item);
        }
      } else {
        ds.set(item.CONTRACT_NUMBER, item);
      }
    });
    allContracts.current = Array.from(ds.values());

    const temp = Array.from(ds.values()).map((item) => {
      return (
        <div key={item.CONTRACT_NUMBER} className="list-item">
          <input
            type="checkbox"
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedContracts((prev) => [...prev, item]);
              } else {
                setSelectedContracts((prev) =>
                  prev.filter(
                    (contract) =>
                      contract.CONTRACT_NUMBER !== item.CONTRACT_NUMBER
                  )
                );
              }
            }}
          />
          <h2>{item.OperatingName}</h2>
          <p>Contract Number: {item.CONTRACT_NUMBER}</p>
          <p>Total Contract Value (CAD): ${item.CUM_VALUE}</p>
          <p>Award Date: {item.AwardDate}</p>
          <p>Client: {item.customer_name_e}</p>
          <p>Description: {item.DESC_LEVEL4_EN}</p>
        </div>
      );
    });
    setList(temp);
  }, [props.data]);

  return (
    <div className="list-container">
      <button
        className="download-button"
        onClick={() => props.displayPdfHandler(selectedContracts)}
      >
        Download Selected Contracts
      </button>
      <button
        className="download-all-button"
        onClick={() => props.displayPdfHandler(allContracts.current)}
      >
        Download All Contracts
      </button>

      {list}
      <button
        className="download-button"
        onClick={() => props.displayPdfHandler(selectedContracts)}
      >
        Download Selected Contracts
      </button>
    </div>
  );
};

export default ContractList;
