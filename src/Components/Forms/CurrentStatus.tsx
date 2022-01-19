/** @format */

import {
  CurrentStatusError,
  EmpFormProps,
} from "../../redux/types";

import { useCallback } from "react";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

import {
  Grid,
  TextField,
  Typography,
} from "@mui/material";

export default function CurrentStatus(
  props: EmpFormProps
) {
  const cur_emp = props.cur_emp;
  const handleInput = useCallback(
    (name, value) => {
      props.onChange?.(name, value);
    },
    [props]
  );
  let errors =
    props.errors as CurrentStatusError;
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
        <Typography variant="h5">
          Current Status
        </Typography>
      </div>
      <Grid
        container
        justifyContent="space-between"
        flexDirection="row"
      >
        <Grid item md={5}>
          <TextField
            size="small"
            fullWidth
            error={
              errors.company_name !== ""
            }
            helperText={
              errors.company_name
            }
            label="Company"
            variant="outlined"
            defaultValue={
              cur_emp?.company_name
                ? cur_emp?.company_name
                : ""
            }
            onChange={(e) => {
              handleInput(
                "company_name",
                e.target.value
              );
            }}
          />
        </Grid>
        <Grid item md={5}>
          <TextField
            size="small"
            fullWidth
            error={
              errors.designation !== ""
            }
            helperText={
              errors.designation
            }
            label="Designation"
            variant="outlined"
            defaultValue={
              cur_emp?.designation
                ? cur_emp?.designation
                : ""
            }
            onChange={(e) => {
              handleInput(
                "designation",
                e.target.value
              );
            }}
            style={{
              marginBottom: "10px",
            }}
          />
        </Grid>
        <Grid item md={5}>
          <TextField
            size="small"
            fullWidth
            error={
              errors.department !== ""
            }
            helperText={
              errors.department
            }
            onChange={(e) => {
              handleInput(
                "department",
                e.target.value
              );
            }}
            defaultValue={
              cur_emp?.department
                ? cur_emp?.department
                : ""
            }
            label="Department"
            variant="outlined"
          />
        </Grid>
        <Grid item md={5}>
          <TextField
            size="small"
            fullWidth
            label="CTC"
            variant="outlined"
            onChange={(e) => {
              handleInput(
                "ctc",
                e.target.value
              );
            }}
            defaultValue={
              cur_emp?.ctc
                ? cur_emp?.ctc
                : ""
            }
            error={errors.ctc !== ""}
            helperText={errors.ctc}
          />
        </Grid>
        <Grid
          item
          md={5}
          style={{ marginTop: "10px" }}
        >
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
          >
            <MobileDatePicker
              label="Working from"
              value={
                cur_emp?.join_date
                  ? cur_emp?.join_date
                  : new Date()
              }
              onChange={(newValue) => {
                handleInput(
                  "join_date",
                  newValue
                );
              }}
              renderInput={(params) => {
                return (
                  <>
                    <TextField
                      size="small"
                      fullWidth
                      variant="outlined"
                      {...params}
                    />
                    <Typography
                      align="left"
                      color={"red"}
                      variant="caption"
                    >
                      {errors.join_date}
                    </Typography>
                  </>
                );
              }}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
    </div>
  );
}
