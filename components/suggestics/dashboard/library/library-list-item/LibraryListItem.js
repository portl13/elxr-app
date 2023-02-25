import React from "react";

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
// import genericThumbnail from "../../../../images/elxr_logo_transparent_no_text.png"
import { useAppDispatch, useAppSelector } from "../../../../../store/store";
import {
  setLibraryItem,
  LibraryItem,
} from "../../../../../store/features/library/library-slice";

export const LibraryListItem = (props) => {
  const dispatch = useAppDispatch();

  return (
    <div className="LibraryListItem">
      <Card sx={{ minWidth: 200 }}>
        <CardActionArea onClick={() => dispatch(setLibraryItem(props.item))}>
          <CardMedia
            component="img"
            height="200"
            image={props.item.thumbnail ? props.item.thumbnail : null}
            alt={props.item.title}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              textAlign="left"
              sx={{ height: 50 }}
            >
              {props.item.title}
            </Typography>
          </CardContent>
        </CardActionArea>
        {/*<CardActions style={{justifyContent: "flex-end"}}>*/}
        {/*</CardActions>*/}
      </Card>
    </div>
  );
};
