import React, { useState } from "react";
import UploadOrderNotesFile from "./UploadOrderNotesFile";

function DownloadOrderNotes({
  showDownload,
  setShowDownload,
  user,
  response,
  setResponse,
  getImageUrl,
  getImageFile
  
}) {
  const [inputList, setInputList] = useState([{ name: "", file: "" }]);
  const [fileName, setFileName] = useState();
  const [index, setIndex] = useState();
  const [result, setResult] = useState([])
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };
  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
    const dataList = [...response];
    dataList.splice(index, 1);
    setResponse(dataList);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { name: "", file: "" }]);
  };

  function mergeData(childData) {
    response.push(childData);
    setResponse(response);
  }
  function getImageUrl(childData) {
    var data = inputList.map((d) => d)[index];
    data.file = childData;
    var newdata = [...result, childData]
    setResult(newdata)
  }


  return (
    <>
      {inputList.map((x, i) => {
        return (
          <div key={i} className="name-panel">
            <div className="col-file-12">
              <div className="label-tag">
                Name
                {/* <span>*</span> */}
              </div>
              <div className="input-tag">
                <input
                  name="name"
                  value={x.name}
                  onChange={(e) => handleInputChange(e, i)}
                />
              </div>
            </div>
            <div className="col-file-12">
              <div className="label-tag">
                File
              </div>
             
              {x.file && (
                <div className="upload-icon">
                  <a href={x.file} target = "_blank">
                  <img src="https://data.portl.live/wp-content/plugins/wc-frontend-manager/includes/libs/upload/images/uploads.ico" alt="icon" />
                  </a>
                </div>
              )}
              
              {!x.file && (
                <div className="input-tag">
                  <button
                    onClick={() => {
                      setShowDownload(true);
                      setFileName(x.name);
                      setIndex(i);
                    }}
                  >
                    upload
                  </button>
                </div>
              )}
              {x.file && (
                <div className="input-tag">
                  <button
                    onClick={() => {
                      x.file = '';
                      setInputList([...inputList]);
        
                    }}
                  >
                    Remove
                  </button>
                </div>
              )

              }
            </div>
            <div className="btn-box">
              {inputList.length - 1 === i && (
                <button onClick={handleAddClick} className="plus-icon">+</button>
              )}
              {inputList.length !== 1 && (
                <button className="cross-icon" onClick={() => handleRemoveClick(i)}>
                  +
                </button>
              )}
            </div>
          </div>
        );
      })}
      {showDownload && (
        <UploadOrderNotesFile
          show={showDownload}
          setShowDownload={setShowDownload}
          user={user}
          name={fileName}
          mergeData={mergeData}
          getImageUrl={getImageUrl}
          getImageFile={getImageFile}
        />
      )}
    </>
  );
}
export default DownloadOrderNotes;
