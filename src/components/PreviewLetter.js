import React, { useRef } from "react";
import html2pdf from "html2pdf.js";
import "../styles/PreviewLetter.css";

const PreviewLetter = (props) => {
  const contentRef = useRef(null);
  const downloadPdf = () => {
    const opt = {
      margin: 1,
      filename: `${props.contracts[0].LegalName} Contract History Letter.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().from(contentRef.current).set(opt).save();
  };

  const date = new Date();
  let currentDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  const tableTitle = `Contracts awarded to supplier operating name: ${props.contracts[0].OperatingName}`;

  const title = `Supplier contract history letter for ${props.contracts[0].LegalName}`;
  const introText = `To Whom It May Concern,
This letter was issued to ${props.contracts[0].LegalName} on ${currentDate} by Public Services and Procurement Canada (PSPC), a federal department of the Government of Canada. This letter confirms that the contracts listed within were awarded to ${props.contracts[0].LegalName} for the delivery of goods and/or services to the Government of Canada.

This letter displays contracts awarded by PSPC for goods and/or services to be delivered to the Government of Canada’s departments, agencies or Crown corporations. The contract information in this document is publicly available for download as Contract History on the Government of Canada's Open Government website.

Note this letter was issued to ${props.contracts[0].LegalName} for the sole purpose and use of the Supplier. Any other party presenting this letter that is not from ${props.contracts[0].LegalName} will render this letter null and void. ${props.contracts[0].LegalName} selected the contracts to include in this letter, and therefore, this letter may not represent all of the contracts that they were awarded. ${props.contracts[0].LegalName} may do business under multiple operating names; contracts are listed by supplier operating name.

Clinton Lawrence-Whyte
Director General, Procurement Assistance Canada
Procurement Branch
Public Services and Procurement Canada`;

  const glossaryText = `Supplier legal name: The legal registered name of a business entity that is also a supplier to the Government of Canada.
Supplier operating name: The name(s) a business entity normally uses when conducting business as a supplier to the Government of Canada.
Contract number: The unique identifier assigned to a contract.
Total contract value (CAD): The total value of the contract from contract award date to present (original plus all amendments).
Original award date: The date on which the contract came into effect.
Client: The department or agency on whose behalf PSPC put the contract in place (The Contract History file labels this field as “End user entity”).
Description: The description of the good or service that corresponds to the Goods and Services Identification Number (GSIN).`;
  const glossaryDisplay = glossaryText.split("\n");
  // console.log(props.contracts);
  return (
    <div className="content-with-watermark">
      <div style={{ position: "relative", zIndex: 2 }}>
        <div ref={contentRef}>
          <h1>{title}</h1>
          <p>{introText}</p>
          <h2>{tableTitle}</h2>

          <table>
            <tr>
              <th>Contract Number</th>
              <th>Total Contract Value (CAD)</th>
              <th>Award Date</th>
              <th>Client</th>
              <th>Description</th>
            </tr>
            {props.contracts.map((contract) => {
              let dollarValue = parseFloat(contract.CUM_VALUE).toLocaleString(
                "en-US",
                {
                  style: "currency",
                  currency: "USD",
                }
              );

              return (
                <tr>
                  <th>{contract.CONTRACT_NUMBER}</th>
                  <th>{dollarValue}</th>
                  <th>{contract.AwardDate}</th>
                  <th>{contract.customer_name_e}</th>
                  <th>{contract.DESC_LEVEL4_EN}</th>
                </tr>
              );
            })}
          </table>
          <br />

          <p>Glossary:</p>
          {glossaryDisplay.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <button className="download-button" onClick={downloadPdf}>
          Download My Letter
        </button>
      </div>
    </div>
  );
};

export default PreviewLetter;
