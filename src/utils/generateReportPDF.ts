// utils/generateReportPDF.ts
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import AppLogo from "../../assets/logos/App_Logo.png"; // adjust relative path

interface Report {
  reportID: string;
  patientName: string;
  gender: string;
  age: number;
  numDrugs: number;
  xerostomiaScore: number;
  acbScore: number;
  drugs: { name: string; acb: number }[];
  schirmerTest?: number;
  sfr?: number;
  usfr?: number;
}

export const generateReportPDF = (report: Report) => {
  const doc = new jsPDF();

  // Add logo
  doc.addImage(AppLogo, "PNG", 10, 10, 30, 30);

  // Title
  doc.setFontSize(20);
  doc.text("Patient Report Summary", 50, 25);

  doc.setFontSize(12);
  doc.text(`Report ID: ${report.reportID}`, 10, 50);
  doc.text(`Patient Name: ${report.patientName}`, 10, 60);
  doc.text(`Gender: ${report.gender}`, 10, 70);
  doc.text(`Age: ${report.age}`, 10, 80);
  doc.text(`Number of Drugs: ${report.numDrugs}`, 10, 90);
  doc.text(`Xerostomia Score: ${report.xerostomiaScore}`, 10, 100);
  doc.text(`ACB Score: ${report.acbScore}`, 10, 110);

  // Conditional tests
  if (report.schirmerTest !== undefined) {
    doc.text(`Schirmer Test: ${report.schirmerTest}`, 10, 120);
  }
  if (report.sfr !== undefined) {
    doc.text(`SFR: ${report.sfr}`, 10, 130);
  }
  if (report.usfr !== undefined) {
    doc.text(`USFR: ${report.usfr}`, 10, 140);
  }

  // Drugs Table
  autoTable(doc, {
    startY: 150,
    head: [["Drug Name", "ACB Score"]],
    body: report.drugs.map((drug) => [drug.name, drug.acb.toString()]),
  });

  // Save PDF
  doc.save(`Report_${report.reportID}.pdf`);
};
