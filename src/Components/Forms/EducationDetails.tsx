import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import {
  EmpFormProps,
  EducationDetailsErrors,
  IAppState,
  Experience,
  EducationDetails,
} from "../../redux/types";

import EducationForm from "./EducationForm";

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
import { setEmpData } from "../../redux/actions";

const getCurEmp = (state: IAppState) => {
  return state.selected_employee;
};

export default function EducationDetailsPage(props: EmpFormProps) {
  const cur_emp = useSelector(getCurEmp);
  let errors = props.errors as EducationDetailsErrors;
  const dispatch = useDispatch();
  const handleAddClick = () => {
    let education: EducationDetails[] = [];

    if (cur_emp.education && Array.isArray(cur_emp.education)) {
      education = [...cur_emp.education];
    }
    education.push({} as EducationDetails);
    handleInput("education", education);
  };

  const handleInput = useCallback((name: string, value: object) => {
    dispatch(setEmpData(name, value));
  }, []);

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
        <Typography variant="h5"> Education Details</Typography>
      </div>
      {cur_emp.education !== undefined &&
        cur_emp.education.map((edu, index) => (
          <EducationForm
            index={index}
            key={index}
            errors={errors.education[index]}
            edu={edu}
          />
        ))}
      <div>
        <Button variant="contained" color="primary" onClick={handleAddClick}>
          +Add
        </Button>
      </div>
    </div>
  );
}
