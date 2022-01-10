import {
  ValidationError,
  IAppState,
  BankDetailsError,
  EmpFormProps,
} from "../../redux/types";
import { useDispatch, useSelector } from "react-redux";
import { Typography, FormLabel, TextField, Grid } from "@mui/material";
import { setEmpData } from "../../redux/actions";

const getCurEmp = (state: IAppState) => {
  return state.selected_employee;
};

export default function (props: EmpFormProps) {
  const cur_emp = useSelector(getCurEmp);
  const dispatch = useDispatch();

  let errors = props.errors as BankDetailsError;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        flexDirection: "column",
        padding: "10px",
        textAlign: "center",
      }}
    >
      <div>
        <Typography variant="h5">Bank Details</Typography>
      </div>
      <Grid container direction="row" justifyContent="space-between">
        <Grid item md={5}>
          <TextField
            fullWidth
            size="small"
            error={errors.account_number !== ""}
            helperText={errors.account_number}
            label="Account Number"
            variant="outlined"
            defaultValue={cur_emp.account_number ? cur_emp.account_number : ""}
            onChange={(e) => {
              dispatch(setEmpData("account_number", e.target.value));
            }}
          />
        </Grid>
        <Grid item md={5}>
          <TextField
            fullWidth
            error={errors.ifsc_code !== ""}
            helperText={errors.ifsc_code}
            label="IFSC Code"
            size="small"
            variant="outlined"
            defaultValue={cur_emp.ifsc_code ? cur_emp.ifsc_code : ""}
            onChange={(e) => {
              dispatch(setEmpData("ifsc_code", e.target.value));
            }}
            style={{
              marginBottom: "10px",
            }}
          />
        </Grid>
        <Grid item md={5}>
          <TextField
            fullWidth
            error={errors.pan_number !== ""}
            helperText={errors.pan_number}
            inputProps={{
              maxLength: 10,
            }}
            onChange={(e) => {
              dispatch(setEmpData("pan_number", e.target.value));
            }}
            defaultValue={cur_emp.pan_number ? cur_emp.pan_number : ""}
            label="PAN Card Number"
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item md={5}>
          <TextField
            fullWidth
            label="Adhaar Card Number"
            variant="outlined"
            size="small"
            onChange={(e) => {
              dispatch(setEmpData("aadhar_number", e.target.value));
            }}
            inputProps={{
              maxLength: 12,
            }}
            defaultValue={cur_emp.aadhar_number ? cur_emp.aadhar_number : ""}
            error={errors.aadhar_number !== ""}
            helperText={errors.aadhar_number}
          />
        </Grid>
      </Grid>
    </div>
  );
}
