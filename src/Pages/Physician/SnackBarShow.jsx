import { Snackbar, Alert } from "@mui/material";
import React from "react";

function SnackBarShow(message, setMessage, error) {
  console.log('reach hereeeeee......', message, error);
  return <Snackbar className="float-end" open={!!message} autoHideDuration={6000} onClose={() => setMessage("")}>
    <Alert onClose={() => setMessage("")} severity={error ? "error" : "success"}>
      {message}
    </Alert>
  </Snackbar>;
}

export default SnackBarShow;