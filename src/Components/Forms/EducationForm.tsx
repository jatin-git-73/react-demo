import {
  EmpFormProps,
  Experience,
  EducationDetailsError,
  EducationDetailsErrors,
  IAppState,
  EducationDetails,
} from "../../redux/types";
import { useDispatch, useSelector } from "react-redux";
import { setEmpData } from "../../redux/actions";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useCallback } from "react";
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

interface EducationDetailsProps {
  index: number;
  edu: EducationDetails;
  errors: EducationDetailsError;
}

export default function EducationForm(props: EducationDetailsProps) {
  handleRemoveClcik = () => {
    let education = [...cur_emp.education];
    education.splice(index, 1);
    setEmpData("education", education);
  };
  handleInput = (name, value) => {
    let education = [...cur_emp.education];
    let cur_exp = { ...education[index] };
    cur_exp[name] = value;
    education[index] = cur_exp;
    setEmpData("education", education);
  };
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
      <TextField
        error={errors.course_name ? true : false}
        helperText={errors.course_name}
        label="Course"
        variant="standard"
        defaultValue={edu.course_name ? edu.course_name : ""}
        onChange={(e) => {
          handleInput("course_name", e.target.value);
        }}
      />
      <TextField
        error={errors.university_name ? true : false}
        helperText={errors.university_name}
        label="University Name"
        variant="standard"
        defaultValue={edu.university_name ? edu.university_name : ""}
        onChange={(e) => {
          handleInput("university_name", e.target.value);
        }}
        style={{
          marginBottom: "10px",
        }}
      />

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileDatePicker
          label="Passed on"
          value={edu.last_date ? edu.last_date : new Date()}
          onChange={(newValue) => {
            handleInput("last_date", newValue);
          }}
          renderInput={(params) => {
            return (
              <>
                <TextField
                  // helperText={errors.last_date}
                  variant="standard"
                  {...params}
                />
                <Typography align="left" color={"red"} variant="caption">
                  {errors.last_date}
                </Typography>
              </>
            );
          }}
        />
      </LocalizationProvider>
      <TextField
        label="Grade"
        variant="standard"
        onChange={(e) => {
          handleInput("grade", e.target.value);
        }}
        defaultValue={edu.grade ? edu.grade : ""}
        error={errors.grade ? true : false}
        helperText={errors.grade}
      />
      <div style={{ display: "flex", padding: "10px" }}>
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
