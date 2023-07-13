import React, { useState, useEffect, useRef } from "react";
import Papa from "papaparse";
import NameList from "./NameList";
import ContractList from "./ContractList";
import GeneratePdf from "./GeneratePdf";

function DynamicSearch() {
  let ds = useRef(new Map());
  const [searchQuery, setSearchQuery] = useState("");
  const [toShow, setToShow] = useState([]);
  const [companyData, setCompanyData] = useState(undefined);
  const [genPdf, setGenPdf] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const displayPdfHandler = (items) => {
    if (items.length == 0) {
      alert("Please select a contract to download!");
      return;
    }
    // console.log(items);
    setGenPdf(items);
  };

  const offPdfHandler = () => {
    setGenPdf(undefined);
  };

  const displayCompanyHandler = (name) => {
    // console.log("disp handler", ds, " and here's name", name);
    let toPass = ds.current.get(name);
    // console.log(toPass);
    setCompanyData(toPass);
  };

  const handleSearch = async () => {
    setLoading(true);
    ds.current = new Map();
    const lowerCaseSearchQuery = searchQuery.toLowerCase();

    for (let i = 1; i <= 20; i++) {
      const response = await fetch(`./part-${i}.csv`);
      const text = await response.text();
      const results = Papa.parse(text, { header: true });
      const data = results.data;

      const filteredData = data.filter((row) => {
        let included;
        if (row && row.OperatingName) {
          included =
            row.OperatingName.toLowerCase().includes(lowerCaseSearchQuery);
          if (included && !ds.current.has(row.OperatingName.toLowerCase())) {
            // unique and found
            ds.current.set(row.OperatingName.toLowerCase(), [row]);
          } else if (included) {
            // and in seen
            let temp = ds.current.get(row.OperatingName.toLowerCase());
            temp.push(row);
            ds.current.set(row.OperatingName.toLowerCase(), temp);
          }
        }
      });
      // console.log(filteredData);
    }

    // console.log(ds);

    setToShow(ds.current);

    setGenPdf(undefined);
    setCompanyData(undefined);
    setLoading(false);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {loading && <h1>Loading...this may take a while!</h1>}
      {!loading && !genPdf && !companyData && (
        <NameList data={toShow} displayCompanyHandler={displayCompanyHandler} />
      )}
      {!loading && !genPdf && companyData && (
        <ContractList
          data={companyData}
          displayPdfHandler={displayPdfHandler}
        />
      )}
      {!loading && genPdf && (
        <GeneratePdf contracts={genPdf} offPdfHandler={offPdfHandler} />
      )}
    </div>
  );
}

export default DynamicSearch;
