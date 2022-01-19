/** @format */

import {
  EducationDetailsError,
  EducationDetails,
  Employee,
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

interface EducationDetailsProps {
  index: number;
  edu: EducationDetails;
  errors: EducationDetailsError;
  onChange?: Function;
  cur_emp?: Employee;
}

export default function EducationForm(
  props: EducationDetailsProps
) {
  let errors =
    (props.errors as EducationDetailsError) ||
    {};
  const cur_emp = props.cur_emp;

  const handleRemoveClcik =
    useCallback(() => {
      let education = [
        ...(cur_emp?.education as EducationDetails[]),
      ];
      education.splice(props.index, 1);
      props.onChange?.(
        "education",
        education
      );
    }, [props, cur_emp?.education]);

  const handleInput = useCallback(
    (
      name: string,
      value: string | Date | null
    ) => {
      let education = [
        ...(cur_emp?.education as EducationDetails[]),
      ];
      let cur_exp = {
        ...education[props.index],
        ...{ [name]: value },
      };
      education[props.index] = cur_exp;
      props.onChange?.(
        "education",
        education
      );
    },
    [cur_emp?.education, props]
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
        justifyContent="space-between"
        container
      >
        <Grid md={5} item>
          <TextField
            fullWidth
            size="small"
            error={
              errors.course_name
                ? true
                : false
            }
            helperText={
              errors.course_name
            }
            label="Course"
            variant="outlined"
            defaultValue={
              props.edu.course_name
                ? props.edu.course_name
                : ""
            }
            onChange={(e) => {
              handleInput(
                "course_name",
                e.target.value
              );
            }}
          />
        </Grid>
        <Grid md={5} item>
          <TextField
            fullWidth
            size="small"
            error={
              errors.university_name
                ? true
                : false
            }
            helperText={
              errors.university_name
            }
            label="University Name"
            variant="outlined"
            defaultValue={
              props.edu.university_name
                ? props.edu
                    .university_name
                : ""
            }
            onChange={(e) => {
              handleInput(
                "university_name",
                e.target.value
              );
            }}
            style={{
              marginBottom: "10px",
            }}
          />
        </Grid>
        <Grid md={5} item>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
          >
            <MobileDatePicker
              label="Passed on"
              value={
                props.edu.last_date
                  ? props.edu.last_date
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
                      size="small"
                      // helperText={errors.last_date}
                      variant="outlined"
                      {...params}
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
        <Grid md={5} item>
          <TextField
            fullWidth
            size="small"
            label="Grade"
            variant="outlined"
            onChange={(e) => {
              handleInput(
                "grade",
                e.target.value
              );
            }}
            defaultValue={
              props.edu.grade
                ? props.edu.grade
                : ""
            }
            error={
              errors.grade
                ? true
                : false
            }
            helperText={errors.grade}
          />
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
          onClick={handleRemoveClcik}
        >
          Remove
        </Button>
      </div>
    </div>
  );
}
