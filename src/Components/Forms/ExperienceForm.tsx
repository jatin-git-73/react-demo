/** @format */

import {
  ExperienceDetailsError,
  ExperienceFormProps,
  Experience,
} from "../../redux/types";

import MobileDatePicker from "@mui/lab/MobileDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useCallback } from "react";
import {
  Grid,
  Button,
  TextField,
  Typography,
} from "@mui/material";

export default function ExperienceForm(
  props: ExperienceFormProps
) {
  let errors =
    (props.errors as ExperienceDetailsError) ||
    {};

  const cur_emp = props.cur_emp;

  const handleRemoveClick =
    useCallback(() => {
      let experience = [
        ...(cur_emp?.experience as Experience[]),
      ];
      experience.splice(props.index, 1);
      props.onChange?.(
        "experience",
        experience
      );
    }, [cur_emp?.experience, props]);

  const handleInput = useCallback(
    (name, value) => {
      let experience = [
        ...(cur_emp?.experience as Experience[]),
      ];
      let cur_exp = {
        ...experience[props.index],
        ...{ [name]: value },
      };
      experience[props.index] = cur_exp;
      props.onChange?.(
        "experience",
        experience
      );
    },
    [cur_emp?.experience, props]
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        flexDirection: "column",
        padding: "10px",
        textAlign: "center",
        border: "1px solid lightgray",
        marginTop: "10px",
      }}
    >
      <Grid
        container
        justifyContent={"space-between"}
      >
        <Grid item md={5}>
          <TextField
            fullWidth
            error={
              errors.company_name
                ? true
                : false
            }
            helperText={
              errors.company_name
            }
            label="Company"
            variant="outlined"
            size="small"
            defaultValue={
              props.exp.company_name
                ? props.exp.company_name
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
            fullWidth
            error={
              errors.designation
                ? true
                : false
            }
            helperText={
              errors.designation
            }
            label="Designation"
            variant="outlined"
            size="small"
            defaultValue={
              props.exp.designation
                ? props.exp.designation
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
            fullWidth
            error={
              errors.department
                ? true
                : false
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
              props.exp.department
                ? props.exp.department
                : ""
            }
            label="Department"
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item md={5}>
          <TextField
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
              props.exp.ctc
                ? props.exp.ctc
                : ""
            }
            error={
              errors.ctc ? true : false
            }
            helperText={errors.ctc}
            size="small"
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
              label="From"
              value={
                props.exp.join_date
                  ? props.exp.join_date
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
                      fullWidth
                      variant="outlined"
                      size="small"
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
        <Grid
          item
          md={5}
          style={{ marginTop: "10px" }}
        >
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
          >
            <MobileDatePicker
              label="To"
              value={
                props.exp.last_date
                  ? props.exp.last_date
                  : new Date()
              }
              onChange={(newValue) => {
                handleInput(
                  "last_date",
                  newValue
                );
              }}
              renderInput={(params) => {
                return (
                  <>
                    <TextField
                      fullWidth
                      // helperText={errors.last_date}
                      variant="outlined"
                      {...params}
                      size="small"
                    />
                    <Typography
                      align="left"
                      color={"red"}
                      variant="caption"
                    >
                      {errors.last_date}
                    </Typography>
                  </>
                );
              }}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>

      <div
        style={{
          display: "flex",
          padding: "10px",
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={handleRemoveClick}
        >
          Remove
        </Button>
      </div>
    </div>
  );
}
