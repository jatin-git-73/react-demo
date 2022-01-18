import { Step, StepLabel, Stepper, Grid, Button } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IAppState, EmpFormState } from "../redux/types";
import { removeEmp } from "../redux/actions";
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
//array of steps we are going to use
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
//this is to generate next id when a new emp object is added
const getNextId = (state: IAppState) => {
  let next_id = 0;
  //we have employees in list
  if (state.employees.length > 0) {
    //fetch the last employee's id
    next_id = state.employees[state.employees.length - 1].id;
  }
  //generate next employee id
  next_id++;
  return next_id;
};
const getCurEmp = (state: IAppState) => {
  return state.selected_employee;
};

const EmpForm = () => {
  //get the cur step from the store
  const cur_step = useSelector(getCurStep);
  //get the cur emp we are editing
  const cur_emp = useSelector(getCurEmp);
  //to dispatch actions
  const dispatch = useDispatch();
  //get next id
  const next_id = useSelector(getNextId);
  //get list of steps
  const steps = getSteps();
  const [state, setState] = useState({
    errors: [getDefaultErrors(cur_step)],
  } as EmpFormState);

  //just a counter to reflect useEffect
  const [nextstep, setNextStep] = useState(0);

    //this will always return errors of current step
    const getErrors = useCallback(() => {
      let cur_errors = state.errors[cur_step];
      if (cur_errors === undefined) {
        //if there is no erros in state,return default errors for given step
        return getDefaultErrors(cur_step); //by default we assume its not failed
      }
      return cur_errors;
    }, [state.errors, cur_step]);

  //we need to  move to next step if nextstep is changed
  useEffect(() => {
    //no next click performed
    if (nextstep === 0) {
      return;
    }
    //next button is clicked ,get the validaiton errors
    let errors = getErrors();
    if (errors !== undefined && errors.failed === false) {
      dispatch(setStep(cur_step + 1));
    }
  }, [nextstep]);

  const doValidation = useCallback(() => {
    //perform validaiton for current step
    let new_errors = validate(cur_emp, cur_step);
    //get old errors
    let cur_errors = [...state.errors];
    //we are maintining errors in array for each step
    //cur_step here is the index to that errors element
    cur_errors[cur_step] = new_errors;
    //construct new state
    let new_state = { errors: cur_errors };
    //update state
    setState(new_state);
  }, [state, cur_emp, cur_step]);



  const handleNextClick = useCallback(() => {
    console.log("you clicked me");
    if (cur_step < getSteps().length) {
      doValidation();
      setNextStep(nextstep + 1);
    }
  },[nextstep,cur_step,doValidation]);

  const handleSubmitClick = useCallback(() => {
    doValidation();
    let errors = getErrors();
    if (errors.failed === false) {
      let emp = { ...cur_emp };
      if (emp.id > 0) {
        alert("record is updated");
      } else {
        alert("thanks for joining");
      }
      if (emp.id === 0) {
        emp.id = next_id;
        dispatch(addEmp(emp));
      } else {
        dispatch(updateEmp(emp));
      }
      dispatch(setStep(0));
      dispatch(setCurEmp({}));
      dispatch(setPage("list"));
    }
  }, [getErrors,cur_emp,dispatch,doValidation,next_id]);

  const handlePreviousClick = useCallback(() => {
    if (cur_step === 0) return;
    dispatch(setStep(cur_step - 1));
  }, [cur_step,dispatch]);

  const handleRemove = useCallback(() => {
    if (cur_emp.id > 0) {
      dispatch(removeEmp(cur_emp.id));
    }
  }, [cur_emp.id,dispatch]);

  const hanldeExitClick = useCallback(() => {
    dispatch(setStep(0));
    dispatch(setCurEmp({}));
    dispatch(setPage("list"));
  }, [dispatch]);

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
          <Button
            disabled={cur_emp.id > 0}
            onClick={handleRemove}
            variant="contained"
            color="error"
          >
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
            disabled={cur_step === 0}
            onClick={handlePreviousClick}
          >
            {" "}
            Previous{" "}
          </Button>
          <Button variant="outlined" color="error" onClick={hanldeExitClick}>
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
