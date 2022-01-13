import {
  EmpFormProps,
  ProfessionDetailsError,
  IAppState,
} from "../../redux/types";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { setEmpData } from "../../redux/actions";
import {
  Chip,
  ListItemText,
  TextField,
  Select,
  Typography,
  FormLabel,
  MenuItem,
} from "@mui/material";

const getCurEmp = (state: IAppState) => {
  return state.selected_employee;
};
const skills = ["Javascript", "HTML", "CSS", "JAVA", "PHP", "LARAVEL"];
export default function ProfessonalDetails(props: EmpFormProps) {
  const cur_emp = useSelector(getCurEmp);
  let errors = props.errors as ProfessionDetailsError;
  const dispatch = useDispatch();
  const handleInput = useCallback(
    (name, value) => {
      dispatch(setEmpData(name, value));
    },
    [dispatch]
  );
  const handleFileUpload = useCallback(
    (evt) => {
      var files = evt.target.files;
      for (var i = 0, f; (f = files[i]); i++) {
        var reader = new FileReader();
        reader.onload = ((theFile) => {
          return (e) => {
            handleInput("resume", (e.target as any).result);
          };
        })(f);
        reader.readAsDataURL(f);
      }
    },
    [handleInput]
  );

  const handleSkillDelete = useCallback(
    (skill: string) => {
      let skills = [...cur_emp.skills];
      let index = skills.indexOf(skill);
      skills.splice(index, 1);
      handleInput("skills", skills);
    },
    [cur_emp.skills, handleInput]
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
      }}
    >
      <div>
        <Typography variant="h5">Professional Details</Typography>
      </div>
      <div>
        <FormLabel>Resume</FormLabel>
      </div>
      <div>
        <input type="file" onChange={handleFileUpload} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ width: "49%" }}>
          <TextField
            size="small"
            fullWidth
            error={errors.exp_year !== ""}
            helperText={errors.exp_year}
            label="Years"
            variant="outlined"
            defaultValue={cur_emp.exp_year ? cur_emp.exp_year : ""}
            inputProps={{
              type: "number",
              min: 0,
            }}
            onChange={(e) => {
              dispatch(setEmpData("exp_year", e.target.value));
            }}
          />
        </div>
        <div style={{ width: "49%" }}>
          <TextField
            size="small"
            fullWidth
            error={errors.exp_month !== ""}
            helperText={errors.exp_month}
            label="Months"
            variant="outlined"
            inputProps={{
              type: "number",
              min: 0,
              max: 11,
            }}
            defaultValue={cur_emp.exp_month ? cur_emp.exp_month : ""}
            onChange={(e) => {
              dispatch(setEmpData("exp_month", e.target.value));
            }}
          />
        </div>
      </div>
      <div style={{ padding: "10px" }}>
        <FormLabel style={{ float: "left" }}>Skills</FormLabel>
        <div>
          {cur_emp.skills !== undefined &&
            cur_emp.skills.map((item, index) => (
              <Chip
                key={index}
                clickable
                label={item}
                onDelete={() => {
                  handleSkillDelete(item);
                }}
              />
            ))}
        </div>
      </div>

      <Select
        variant="outlined"
        renderValue={() => {
          return null;
        }}
        onChange={(e) => {
          let skills: string[] = [];
          if (Array.isArray(cur_emp.skills)) {
            skills = [...cur_emp.skills];
          }
          if (!skills.includes((e.target as any).value)) {
            skills.push((e.target as any).value);
          }
          handleInput("skills", skills);
        }}
      >
        {skills.map((name) => (
          <MenuItem key={name} value={name}>
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
      <Typography variant="caption" textAlign="left" color="red">
        {errors.skills}
      </Typography>
    </div>
  );
}
