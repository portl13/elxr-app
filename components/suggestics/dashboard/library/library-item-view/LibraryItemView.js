import React from "react";

import {
  AppBar,
  Button,
  Dialog,
  Paper,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { NavigateBefore } from "@material-ui/icons";
import { useAppDispatch, useAppSelector } from "../../../../../store/store";
import { setLibraryItem } from "../../../../../store/features/library/library-slice";
import ReactPlayer from "react-player";
import { Document, Page, pdfjs } from "react-pdf";

export const LibraryItemView = () => {
  const selectedLibraryItem = useAppSelector(
    (state) => state.library.selectedLibraryItem
  );

  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setLibraryItem({}));
  };

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

  const [pageNumber, setPageNumber] = React.useState(null);
  const [numPages, setNumPages] = React.useState(null);

  const onDocumentLoadSuccess = (pdf) => {
    setNumPages(pdf.numPages);
    setPageNumber(1);
  };

  return (
    <div className="LibraryItemView">
      <Dialog
        fullScreen
        open={!!selectedLibraryItem.title}
        onClose={handleClose}
      >
        <AppBar
          sx={{ position: "relative", marginBottom: 2 }}
          color="transparent"
        >
          <Toolbar>
            <Button
              variant="text"
              size={"large"}
              fullWidth
              color="warning"
              startIcon={<NavigateBefore />}
              onClick={handleClose}
            >
              <Typography alignSelf={"center"}>Back</Typography>
            </Button>
          </Toolbar>
        </AppBar>
        <Paper>
          <Typography
            variant="h5"
            padding={2}
            paddingBottom={0}
            component="div"
            textAlign="center"
          >
            {selectedLibraryItem.title}
          </Typography>
          <Typography variant="body2" padding={2} textAlign="left">
            {"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor " +
              "incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud " +
              "exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute " +
              "irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla " +
              "pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia " +
              "deserunt mollit anim id est laborum."}
          </Typography>
          {selectedLibraryItem.type === "video" && (
            <ReactPlayer
              width={"100%"}
              url={selectedLibraryItem.source}
              controls
            />
          )}
          {selectedLibraryItem.type === "pdf" && (
            <>
              <Document
                file={selectedLibraryItem.source}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page pageNumber={pageNumber} />
              </Document>
              <p>
                Page {pageNumber} of {numPages}
              </p>
            </>
          )}
        </Paper>
      </Dialog>
    </div>
  );
};
