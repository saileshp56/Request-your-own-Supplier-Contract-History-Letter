import { jsPDF } from "jspdf";

const GeneratePDF = (props) => {
  const doc = new jsPDF();
  doc.setFontSize(12);
  const date = new Date();
  let currentDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  const lineHeight = 10;
  let y = 20;

  const printText = (text, x, maxLineWidth) => {
    const lines = doc.splitTextToSize(text, maxLineWidth);
    lines.forEach((line) => {
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
      doc.text(line, x, y);
      y += lineHeight;
    });
  };

  const introText = `To Whom It May Concern,
This letter was issued to ${props.contracts[0].LegalName} on ${currentDate} by Public Services and Procurement Canada (PSPC), a federal department of the Government of Canada. This letter confirms that the contracts listed within were awarded to ${props.contracts[0].LegalName} for the delivery of goods and/or services to the Government of Canada.

This letter displays contracts awarded by PSPC for goods and/or services to be delivered to the Government of Canada’s departments, agencies or Crown corporations. The contract information in this document is publicly available for download as Contract History on the Government of Canada's Open Government website.

Note this letter was issued to ${props.contracts[0].LegalName} for the sole purpose and use of the Supplier. Any other party presenting this letter that is not from ${props.contracts[0].LegalName} will render this letter null and void. ${props.contracts[0].LegalName} selected the contracts to include in this letter, and therefore, this letter may not represent all of the contracts that they were awarded. ${props.contracts[0].LegalName} may do business under multiple operating names; contracts are listed by supplier operating name.

Clinton Lawrence-Whyte
Director General, Procurement Assistance Canada
Procurement Branch
Public Services and Procurement Canada`;

  printText(introText, 10, 180);

  // Iterate over each contract
  y += 15;
  props.contracts.forEach((contract) => {
    printText(`Operating Name: ${contract.OperatingName}`, 10, 180);
    printText(`Contract Number: ${contract.CONTRACT_NUMBER}`, 10, 180);
    printText(`Total Contract Value (CAD): ${contract.CUM_VALUE}`, 10, 180);
    printText(`Award Date: ${contract.AwardDate}`, 10, 180);
    printText(`Client: ${contract.customer_name_e}`, 10, 180);
    printText(`Description: ${contract.DESC_LEVEL4_EN}`, 10, 180);
    y += lineHeight;
  });

  const glossaryText = `Glossary
Supplier legal name: The legal registered name of a business entity that is also a supplier to the Government of Canada.
Supplier operating name:The name(s) a business entity normally uses when conducting business as a supplier to the Government of Canada.
Contract number: The unique identifier assigned to a contract.
Total contract value (CAD):The total value of the contract from contract award date to present (original plus all amendments).
Original award date:The date on which the contract came into effect.
Client:The department or agency on whose behalf PSPC put the contract in place (The Contract History file labels this field as “End user entity”).
Description:The description of the good or service that corresponds to the Goods and Services Identification Number (GSIN).`;

  printText(glossaryText, 10, 180);

  doc.save(`${props.contracts[0].LegalName} Contract History Letter.pdf`);
  props.offPdfHandler();
};

export default GeneratePDF;
