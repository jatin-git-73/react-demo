/** @format */

import {
  BankDetailsError,
  EmpFormProps,
  EmployeeNodeVaule,
} from "../../redux/types";
import {
  Typography,
  TextField,
  Grid,
} from "@mui/material";
import { useCallback } from "react";

export default function BankDetails(
  props: EmpFormProps
) {
  const cur_emp = props.cur_emp;

  const handleInput = useCallback(
    (
      name: string,
      value: EmployeeNodeVaule
    ) => {
      props.onChange?.(name, value);
    },
    [props]
  );

  let errors =
    props.errors as BankDetailsError;
  return (
    <div className="Bank-Details-Form">
      <div>
        <Typography variant="h5">
          Bank Details
        </Typography>
      </div>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
      >
        <Grid
          item
          md={5}
          className="Margin-Top"
        >
          <TextField
            fullWidth
            size="small"
            error={
              errors.account_number !==
              ""
            }
            helperText={
              errors.account_number
            }
            label="Account Number"
            variant="outlined"
            defaultValue={
              cur_emp?.account_number
                ? cur_emp?.account_number
                : ""
            }
            onChange={(e) => {
              handleInput(
                "account_number",
                e.target.value
              );
            }}
          />
        </Grid>
        <Grid
          item
          md={5}
          className="Margin-Top"
        >
          <TextField
            fullWidth
            error={
              errors.ifsc_code !== ""
            }
            helperText={
              errors.ifsc_code
            }
            label="IFSC Code"
            size="small"
            variant="outlined"
            defaultValue={
              cur_emp?.ifsc_code
                ? cur_emp?.ifsc_code
                : ""
            }
            onChange={(e) => {
              handleInput(
                "ifsc_code",
                e.target.value
              );
            }}
          />
        </Grid>
        <Grid
          item
          md={5}
          className="Margin-Top"
        >
          <TextField
            fullWidth
            error={
              errors.pan_number !== ""
            }
            helperText={
              errors.pan_number
            }
            inputProps={{
              maxLength: 10,
            }}
            onChange={(e) => {
              handleInput(
                "pan_number",
                e.target.value
              );
            }}
            defaultValue={
              cur_emp?.pan_number
                ? cur_emp?.pan_number
                : ""
            }
            label="PAN Card Number"
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid
          item
          md={5}
          className="Margin-Top"
        >
          <TextField
            fullWidth
            label="Adhaar Card Number"
            variant="outlined"
            size="small"
            onChange={(e) => {
              handleInput(
                "aadhar_number",
                e.target.value
              );
            }}
            inputProps={{
              maxLength: 12,
            }}
            defaultValue={
              cur_emp?.aadhar_number
                ? cur_emp?.aadhar_number
                : ""
            }
            error={
              errors.aadhar_number !==
              ""
            }
            helperText={
              errors.aadhar_number
            }
          />
        </Grid>
      </Grid>
    </div>
  );
}
