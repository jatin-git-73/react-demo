import {
  EmpFormProps,
  ExperienceDetailsErrors,
  IAppState,
  Experience,
} from "../../redux/types";
import { setEmpData } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import ExperienceFrom from "./ExperienceForm";
import { useCallback } from "react";
import { Button, Typography } from "@mui/material";

const getCurEmp = (state: IAppState) => {
  return state.selected_employee;
};
export default function ExperienceDetails(props: EmpFormProps) {
  const cur_emp = useSelector(getCurEmp);
  let errors = props.errors as ExperienceDetailsErrors;
  const dispatch = useDispatch();
  const handleInput = useCallback(
    (name: string, value: object) => {
      dispatch(setEmpData(name, value));
    },
    [dispatch]
  );

  const handleAddClick = useCallback(() => {
    let experience: Experience[] = [];
    if (Array.isArray(cur_emp.experience)) {
      experience = [...cur_emp.experience];
    }
    experience.push({} as Experience);
    handleInput("experience", experience);
  }, [cur_emp.experience, handleInput]);

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
        <br />
        <Typography variant="h5"> Experience Details</Typography>
      </div>
      {cur_emp.experience !== undefined &&
        cur_emp.experience.map((exp, index) => (
          <ExperienceFrom
            key={index}
            index={index}
            errors={errors.experience[index]}
            exp={exp}
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
