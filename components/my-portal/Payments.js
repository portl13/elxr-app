import React from "react";
import { Button, Progress, Alert } from 'reactstrap';
//import jsPDF from "jspdf"

function Payments() {
  //  function pdfGenerate(){
  //    var doc = new jsPDF('landscape','px','a4','false')
  //    console.log("body:",document.body)
  //     doc.html(document.body, {
  //       callback: function () {
  //        doc.save();
  //       },
  //       margin: [30,30,30,30]
          
  //  });  
  //  }
  return (
    <>
    <div className="wcfm-collapse-content">
      <div className="wcfm-top-element-container pl-0">
          <h4 className="text-uppercase text-primary channel-title">Payments</h4>
      </div>
      <hr className="line-title w-100 mt-4 mb-1" />
      <div className="coming-soon-text">
          Coming Soon...
      </div>
    </div>
      {/* <button onClick={()=>pdfGenerate()}>Downlaod file</button> */}
    </>
  );
}
export default Payments
