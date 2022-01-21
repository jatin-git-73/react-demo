/** @format */

import {
  EmpFormProps,
  ProfessionDetailsError,
} from "../../redux/types";
import { useCallback } from "react";
import {
  Chip,
  ListItemText,
  TextField,
  Select,
  Typography,
  FormLabel,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

//skills
const skills = [
  "Javascript",
  "HTML",
  "CSS",
  "JAVA",
  "PHP",
  "LARAVEL",
];
export default function ProfessonalDetails(
  props: EmpFormProps
) {
  const cur_emp = props.cur_emp;
  let errors =
    props.errors as ProfessionDetailsError;
  const handleInput = useCallback(
    (name, value) => {
      props.onChange?.(name, value);
    },
    [props]
  );
  const handleFileUpload = useCallback(
    (evt) => {
      var files = evt.target.files;
      for (
        var i = 0, f;
        (f = files[i]);
        i++
      ) {
        var reader = new FileReader();
        reader.onload = ((theFile) => {
          return (e) => {
            handleInput(
              "resume",
              (e.target as any).result
            );
          };
        })(f);
        reader.readAsDataURL(f);
      }
    },
    [handleInput]
  );

  const handleSkillDelete = useCallback(
    (index: number) => {
      //current list of skills
      let skills = [
        ...(cur_emp?.skills as string[]),
      ];
      //delete it
      skills.splice(index, 1);
      //updae the state
      handleInput("skills", skills);
    },
    [cur_emp?.skills]
  );

  return (
    <div className="Professional-Details-Page">
      <div>
        <Typography variant="h5">
          Professional Details
        </Typography>
      </div>
      <div>
        <FormLabel>Resume</FormLabel>
      </div>
      <div>
        <input
          type="file"
          onChange={handleFileUpload}
        />
      </div>
      <div className="Professional-details-grid">
        <div className="Grid-1">
          <TextField
            size="small"
            fullWidth
            error={
              errors.exp_year !== ""
            }
            helperText={errors.exp_year}
            label="Years"
            variant="outlined"
            defaultValue={
              cur_emp?.exp_year
                ? cur_emp?.exp_year
                : ""
            }
            inputProps={{
              type: "number",
              min: 0,
            }}
            onChange={(e) => {
              handleInput(
                "exp_year",
                e.target.value
              );
            }}
          />
        </div>
        <div className="Grid-1">
          <TextField
            size="small"
            fullWidth
            error={
              errors.exp_month !== ""
            }
            helperText={
              errors.exp_month
            }
            label="Months"
            variant="outlined"
            inputProps={{
              type: "number",
              min: 0,
              max: 11,
            }}
            defaultValue={
              cur_emp?.exp_month
                ? cur_emp?.exp_month
                : ""
            }
            onChange={(e) => {
              handleInput(
                "exp_month",
                e.target.value
              );
            }}
          />
        </div>
      </div>
      <div>
        <FormLabel className="Float-Left">
          Skills
        </FormLabel>
        <div>
          {cur_emp?.skills !==
            undefined &&
            cur_emp?.skills.map(
              (item, index) => (
                <Chip
                  key={index}
                  clickable
                  label={item}
                  onDelete={() => {
                    handleSkillDelete(
                      index
                    );
                  }}
                />
              )
            )}
        </div>
      </div>
      <FormControl fullWidth>
        <InputLabel id="skills-label">
          skills
        </InputLabel>

        <Select
          defaultValue={""}
          labelId="skills-label"
          variant="standard"
          renderValue={() => {
            return null;
          }}
          onChange={(e) => {
            let skills: string[] = [];
            if (
              Array.isArray(
                cur_emp?.skills
              )
            ) {
              skills = [
                ...(cur_emp?.skills as string[]),
              ];
            }
            if (
              !skills.includes(
                (e.target as any).value
              )
            ) {
              skills.push(
                (e.target as any).value
              );
            }
            handleInput(
              "skills",
              skills
            );
          }}
        >
          {skills.map((name) => (
            <MenuItem
              key={name}
              value={name}
            >
              <ListItemText
                primary={name}
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography
        variant="caption"
        textAlign="left"
        color="red"
      >
        {errors.skills}
      </Typography>
    </div>
  );
}
