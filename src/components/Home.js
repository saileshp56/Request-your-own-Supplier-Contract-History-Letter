import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import DynamicSearch from "./DynamicSearch";
import arrow from "../images/canadabuy triangle.svg";
const Home = () => {
  return (
    <div className="container">
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={arrow} style={{ width: "2%" }} alt="arrow" />
        <h1>Request your own Supplier Contract History Letter</h1>
      </div>
      <p>
        You can request your own official Supplier Contract History Letter to
        use as a reference when bidding on work. The letter lists the contracts
        that have been awarded to your business by Public Works and Government
        Services Canada (PWGSC). This is a useful service if you need proof of
        having done business with the Government of Canada, for example if you
        want to bid on international opportunities. <br />
        <br />
        You can:
      </p>
      <ol>
        <li>
          <b>Personalize your content:</b> Select which contracts to include in
          your letter, and omit the contracts that you do not want included
        </li>
        <br />

        <li>
          <b>Request the letter:</b> Select which contracts to include in your
          letter, and omit the contracts that you do not want included
        </li>
        <br />
        <li>
          <b>Choose English or French:</b> Select which contracts to include in
          your letter, and omit the contracts that you do not want included
        </li>
        <br />

        <li>
          <b>Get fast delivery:</b> You will receive the document immediately
          upon request
        </li>
      </ol>
      <p>
        Try:
        <br />
        <code>Le Groupe Syntagme inc.</code>
      </p>
      <DynamicSearch />
    </div>
  );
};

export default Home;
