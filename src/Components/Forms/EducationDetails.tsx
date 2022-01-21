/** @format */
import { useCallback } from "react";
import {
  EmpFormProps,
  EducationDetailsErrors,
  EducationDetails,
} from "../../redux/types";

import EducationForm from "./EducationForm";

import {
  Button,
  Typography,
} from "@mui/material";

export default function EducationDetailsPage(
  props: EmpFormProps
) {
  const cur_emp = props.cur_emp;
  let errors =
    props.errors as EducationDetailsErrors;
  const handleInput = useCallback(
    (name: string, value: object) => {
      props.onChange?.(name, value);
    },
    [props]
  );
  const handleAddClick =
    useCallback(() => {
      let education: EducationDetails[] =
        [];

      if (
        cur_emp?.education &&
        Array.isArray(cur_emp.education)
      ) {
        education = [
          ...cur_emp.education,
        ];
      }
      education.push(
        {} as EducationDetails
      );
      handleInput(
        "education",
        education
      );
    }, [
      cur_emp?.education,
      handleInput,
    ]);

  return (
    <div className="Education-Details-Page">
      <div>
        <Typography variant="h5">
          {" "}
          Education Details
        </Typography>
      </div>
      {cur_emp?.education !==
        undefined &&
        cur_emp.education.map(
          (edu, index) => (
            <EducationForm
              index={index}
              key={index}
              errors={
                errors.education[index]
              }
              onChange={handleInput}
              cur_emp={cur_emp}
              edu={edu}
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
