import React from "react";
import DownloadCardDetail from "./DownloadCardDetail";
function DownloadCard({ result }) {
  return (
    <>
      <div className="datatable-ui">
        <div className="row-head">
          <div className="download-list-1">PRODUCT</div>
          <div className="download-list-2">DOWNLOADS REMAINING</div>
          <div className="download-list-3">EXPIRES</div>
          <div className="download-list-4">DOWNLOAD</div>
        </div>
        {result?.map((d) => (
          <DownloadCardDetail result={d} />
        ))}
      </div>
    </>
  );
}
export default DownloadCard;
