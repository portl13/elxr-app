import React, { useEffect } from "react";

import { Dialog, Paper, Typography } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  OutcomeStatus,
  resetDialogState /*setSuccessDialog*/,
} from "../../store/features/dialog/dialog-slice";

export const ActionOutcomeDialog = () => {
  const actionOutcome = useAppSelector((state) => state.dialog.actionOutcome);

  const dispatch = useAppDispatch();

  /*
    useEffect(() => {
        dispatch(setSuccessDialog("Test dialog"));
    }, [])
     */

  useEffect(() => {
    // Self-closing
    if (
      actionOutcome.outcomeStatus !== OutcomeStatus.Unspecified ||
      actionOutcome.outcomeMessage !== ""
    )
      setTimeout(() => {
        dispatch(resetDialogState());
      }, 2000);
  }, [actionOutcome]);

  return (
    <div className="ActionOutcomeDialog">
      <Dialog
        open={
          actionOutcome.outcomeStatus !== OutcomeStatus.Unspecified &&
          actionOutcome.outcomeMessage !== ""
        }
      >
        <Paper className="dialog-content">
          <Typography
            variant="body1"
            padding={2}
            textAlign="center"
            // color={actionOutcome === Outcome.Success ? "darkgreen" : "darkred"}
          >
            {actionOutcome.outcomeMessage}
          </Typography>
        </Paper>
      </Dialog>
    </div>
  );
};
