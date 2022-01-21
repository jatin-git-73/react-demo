/** @format */

import {
  EmpFormProps,
  ExperienceDetailsErrors,
  Experience,
} from "../../redux/types";

import ExperienceFrom from "./ExperienceForm";
import { useCallback } from "react";
import {
  Button,
  Typography,
} from "@mui/material";

export default function ExperienceDetails(
  props: EmpFormProps
) {
  const cur_emp = props.cur_emp;
  let errors =
    props.errors as ExperienceDetailsErrors;

  const handleInput = useCallback(
    (name: string, value: object) => {
      props.onChange?.(name, value);
    },
    [props]
  );

  const handleAddClick =
    useCallback(() => {
      let experience: Experience[] = [];
      if (
        Array.isArray(
          cur_emp?.experience
        )
      ) {
        experience = [
          ...(cur_emp?.experience as Experience[]),
        ];
      }
      experience.push({} as Experience);
      handleInput(
        "experience",
        experience
      );
    }, [
      cur_emp?.experience,
      handleInput,
    ]);

  return (
    <div className="Experience-Details-Page">
      <div>
        <br />
        <Typography variant="h5">
          Experience Details
        </Typography>
      </div>
      {cur_emp?.experience &&
        cur_emp?.experience.map(
          (exp, index) => (
            <ExperienceFrom
              key={index}
              index={index}
              errors={
                errors.experience[index]
              }
              onChange={handleInput}
              cur_emp={cur_emp}
              exp={exp}
            />
          )
        )}
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddClick}
        >
          +Add
        </Button>
      </div>
    </div>
  );
}
