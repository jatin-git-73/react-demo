import { CurrentStatusError, EmpFormProps, IAppState } from "../../redux/types";
import { useDispatch, useSelector } from "react-redux";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { setEmpData } from "../../redux/actions";

import {
  Grid,
  Button,
  Chip,
  ListItemText,
  TextField,
  Paper,
  Select,
  Typography,
  FormLabel,
  MenuItem,
  Badge,
} from "@mui/material";

const getCurEmp = (state: IAppState) => {
  return state.selected_employee;
};
export default function CurrentStatus(props: EmpFormProps) {
  const cur_emp = useSelector(getCurEmp);
  let errors = props.errors as CurrentStatusError;
  const dispatch = useDispatch();
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
        <Typography variant="h5">Current Status</Typography>
      </div>
      <TextField
        error={errors.company_name !== ""}
        helperText={errors.company_name}
        label="Company"
        variant="standard"
        defaultValue={cur_emp.company_name ? cur_emp.company_name : ""}
        onChange={(e) => {
          dispatch(setEmpData("company_name", e.target.value));
        }}
      />
      <TextField
        error={errors.designation !== ""}
        helperText={errors.designation}
        label="Designation"
        variant="standard"
        defaultValue={cur_emp.designation ? cur_emp.designation : ""}
        onChange={(e) => {
          dispatch(setEmpData("designation", e.target.value));
        }}
        style={{
          marginBottom: "10px",
        }}
      />

      <TextField
        error={errors.department !== ""}
        helperText={errors.department}
        onChange={(e) => {
          dispatch(setEmpData("department", e.target.value));
        }}
        defaultValue={cur_emp.department ? cur_emp.department : ""}
        label="Department"
        variant="standard"
      />

      <TextField
        label="CTC"
        variant="standard"
        onChange={(e) => {
          dispatch(setEmpData("ctc", e.target.value));
        }}
        defaultValue={cur_emp.ctc ? cur_emp.ctc : ""}
        error={errors.ctc !== ""}
        helperText={errors.ctc}
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileDatePicker
          label="Working from"
          value={cur_emp.join_date ? cur_emp.join_date : new Date()}
          onChange={(newValue) => {
            dispatch(setEmpData("join_date", newValue));
          }}
          renderInput={(params) => {
            return (
              <>
                <TextField
                  // helperText={errors.join_date}
                  variant="standard"
                  {...params}
                />
                <Typography align="left" color={"red"} variant="caption">
                  {errors.join_date}
                </Typography>
              </>
            );
          }}
        />
      </LocalizationProvider>
    </div>
  );
}
