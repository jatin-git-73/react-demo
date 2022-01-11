import { Step, StepLabel, Stepper, Grid, Button } from "@mui/material";
import { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IAppState, ValidationError } from "../redux/types";
import PersonalDetails from "./Forms/PersonalDetails";
import validate, { getDefaultErrors } from "../Validation";
import BankDetails from "./Forms/BankDetails";
import ProfessonalDetails from "./Forms/ProfessonalDetails";
import CurrentStatus from "./Forms/CurrentStatus";
import ExperienceDetails from "./Forms/ExperienceDetails";
import EducationDetails from "./Forms/EducationDetails";
import {
  addEmp,
  setCurEmp,
  setPage,
  setStep,
  updateEmp,
} from "../redux/actions";
const getSteps = () => {
  return [
    "Personal Details",
    "Bank Details",
    "Professional Details",
    "Current Status",
    "Experience Details",
    "Educational Details",
  ];
};
const getCurStep = (state: IAppState) => {
  return state.cur_step;
};
const getNextId = (state: IAppState) => {
  let next_id = 0;
  if (state.employees.length > 0) {
    next_id = state.employees[state.employees.length - 1].id;
  }
  next_id++;
  return next_id;
};
const getCurEmp = (state: IAppState) => {
  return state.selected_employee;
};
interface empFormState {
  errors: ValidationError[];
}

const EmpForm = () => {
  const cur_step = useSelector(getCurStep);
  const cur_emp = useSelector(getCurEmp);
  const dispatch = useDispatch();
  const next_id = useSelector(getNextId);
  const steps = getSteps();
  const id = 0;
  const [state, setState] = useState({
    errors: [getDefaultErrors(cur_step)],
  } as empFormState);

  //just a counter to reflect useEffect
  const [nextstep, setNextStep] = useState(0);

  useEffect(() => {
    if (nextstep == 0) {
      return;
    }
    let errors = getErrors();
    if (errors !== undefined && errors.failed == false) {
      dispatch(setStep(cur_step + 1));
    }
  }, [nextstep]);

  const doValidation = () => {
    let new_errors = validate(cur_emp, cur_step);
    let cur_errors = [...state.errors];
    cur_errors[cur_step] = new_errors;
    let new_state = { errors: cur_errors };
    setState(new_state);
  };

  const getErrors = () => {
    let cur_errors = state.errors[cur_step];
    if (cur_errors == undefined) {
      return getDefaultErrors(cur_step); //by default we assume its failed
    }
    return cur_errors;
  };
  const handleNextClick = () => {
    if (cur_step < getSteps().length) {
      doValidation();
      setNextStep(nextstep + 1);
    }
  };

  const handleSubmitClick = () => {
    doValidation();
    let errors = getErrors();
    if (errors.failed === false) {
      let emp = { ...cur_emp };
      alert("thanks for joining");

      if (emp.id == 0) {
        emp.id = next_id;
        dispatch(addEmp(emp));
      } else {
        dispatch(updateEmp(emp));
      }
      dispatch(setStep(0));
      dispatch(setCurEmp({}));
      dispatch(setPage("list"));
    }
  };

  const handlePreviousClick = () => {
    if (cur_step == 0) return;
    dispatch(setStep(cur_step - 1));
  };
  return (
    <>
      <Stepper activeStep={cur_step} alternativeLabel>
        {steps.map((label: string, index: number) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {(() => {
        switch (cur_step) {
          case 0:
            return <PersonalDetails errors={getErrors()} />;
          case 1:
            return <BankDetails errors={getErrors()} />;
          case 2:
            return <ProfessonalDetails errors={getErrors()} />;
          case 3:
            return <CurrentStatus errors={getErrors()} />;
          case 4:
            return <ExperienceDetails errors={getErrors()} />;
          case 5:
            return <EducationDetails errors={getErrors()} />;
          default:
            return <h1>invalid step : {cur_step}</h1>;
        }
      })()}

      <Grid container>
        <Grid item md={2}>
          <Button disabled={id == 0} variant="contained" color="error">
            Remove
          </Button>
        </Grid>
        <Grid
          item
          md={8}
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="outlined"
            disabled={cur_step == 0}
            onClick={handlePreviousClick}
          >
            {" "}
            Previous{" "}
          </Button>
          <Button
            variant="outlined"
            color="error"
            // onClick={hanldeExitClick}
          >
            Exit
          </Button>
          <Button
            variant="contained"
            disabled={cur_step + 1 >= steps.length}
            onClick={handleNextClick}
          >
            Next
          </Button>
        </Grid>
        <Grid item md={2}>
          <Button
            disabled={cur_step + 1 < steps.length}
            variant="contained"
            onClick={handleSubmitClick}
            style={{ float: "right" }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
export default EmpForm;
