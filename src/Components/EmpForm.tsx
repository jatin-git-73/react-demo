/** @format */

import {
  Step,
  StepLabel,
  Stepper,
  Grid,
  Button,
} from "@mui/material";
import {
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import {
  IAppState,
  EmpFormState,
} from "../redux/types";
import {
  fetchEmpyList,
  removeEmp,
  saveCurEmp,
  saveEmp,
} from "../redux/actions";
import PersonalDetails from "./Forms/PersonalDetails";
import validate, {
  getDefaultErrors,
} from "../Validation";
import BankDetails from "./Forms/BankDetails";
import ProfessonalDetails from "./Forms/ProfessonalDetails";
import CurrentStatus from "./Forms/CurrentStatus";
import ExperienceDetails from "./Forms/ExperienceDetails";
import EducationDetails from "./Forms/EducationDetails";
import {
  setCurEmp,
  setPage,
  setStep,
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
const getCurStep = (
  state: IAppState
) => {
  return state.cur_step;
};
//this is to generate next id when a new emp object is added

const getCurEmp = (
  state: IAppState
) => {
  return state.selected_employee;
};

const EmpForm = () => {
  let cur_emp = useSelector(getCurEmp);
  let [empData, setEmpData] =
    useState(cur_emp);
  let handleFormDataChange =
    useCallback(
      (name: string, val: object) => {
        let cur_data = { ...empData };
        (cur_data as any)[name] = val;
        setEmpData(cur_data);
      },
      [empData]
    );
  //get the cur step from the store
  const cur_step =
    useSelector(getCurStep);

  //to dispatch actions
  const dispatch = useDispatch();
  //get next id
  //get list of steps
  const steps = getSteps();
  const [state, setState] = useState({
    errors: [
      getDefaultErrors(cur_step),
    ],
  } as EmpFormState);

  //just a counter to reflect useEffect
  const [nextstep, setNextStep] =
    useState(0);

  //this will always return errors of current step
  const getErrors = useCallback(() => {
    let cur_errors =
      state.errors[cur_step];
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
    if (
      errors !== undefined &&
      errors.failed === false
    ) {
      dispatch(setStep(cur_step + 1));
    }
  }, [nextstep]);

  const doValidation =
    useCallback(() => {
      //perform validaiton for current step
      let new_errors = validate(
        empData,
        cur_step
      );
      //get old errors
      let cur_errors = [
        ...state.errors,
      ];
      //we are maintining errors in array for each step
      //cur_step here is the index to that errors element
      cur_errors[cur_step] = new_errors;
      //construct new state
      let new_state = {
        errors: cur_errors,
      };
      //update state
      setState(new_state);
    }, [state, empData, cur_step]);

  const handleNextClick =
    useCallback(() => {
      if (
        cur_step < getSteps().length
      ) {
        doValidation();
        setNextStep(nextstep + 1);
      }
    }, [
      nextstep,
      cur_step,
      doValidation,
    ]);

  const handleSubmitClick =
    useCallback(() => {
      let errors = validate(
        empData,
        cur_step
      );
      if (errors.failed === false) {
        let emp = empData;
        if (emp.id === 0) {
          dispatch(saveEmp(emp));
          alert("thanks for joining");
        } else {
          dispatch(saveCurEmp(emp));
          alert("record is updated");
        }
        dispatch(fetchEmpyList());
        dispatch(setStep(0));
        dispatch(setCurEmp({}));
        dispatch(setPage("list"));
      } else {
        let cur_errors = [
          ...state.errors,
        ];
        //we are maintining errors in array for each step
        //cur_step here is the index to that errors element
        cur_errors[cur_step] = errors;
        //construct new state
        let new_state = {
          errors: cur_errors,
        };
        //update state
        setState(new_state);
      }
    }, [
      cur_step,
      empData,
      dispatch,
      state.errors,
    ]);

  const handlePreviousClick =
    useCallback(() => {
      if (cur_step === 0) return;
      dispatch(setStep(cur_step - 1));
    }, [cur_step, dispatch]);

  const handleRemove =
    useCallback(() => {
      if (empData.id > 0) {
        dispatch(removeEmp(empData.id));
      }
    }, [empData.id, dispatch]);

  const hanldeExitClick =
    useCallback(() => {
      dispatch(setStep(0));
      dispatch(setCurEmp({}));
      dispatch(setPage("list"));
    }, [dispatch]);

  return (
    <>
      <Stepper
        activeStep={cur_step}
        alternativeLabel
      >
        {steps.map(
          (
            label: string,
            index: number
          ) => {
            return (
              <Step key={label}>
                <StepLabel>
                  {label}
                </StepLabel>
              </Step>
            );
          }
        )}
      </Stepper>
      {(() => {
        switch (cur_step) {
          case 0:
            return (
              <PersonalDetails
                cur_emp={empData}
                onChange={
                  handleFormDataChange
                }
                errors={getErrors()}
              />
            );
          case 1:
            return (
              <BankDetails
                cur_emp={empData}
                onChange={
                  handleFormDataChange
                }
                errors={getErrors()}
              />
            );
          case 2:
            return (
              <ProfessonalDetails
                errors={getErrors()}
                cur_emp={empData}
                onChange={
                  handleFormDataChange
                }
              />
            );
          case 3:
            return (
              <CurrentStatus
                errors={getErrors()}
                cur_emp={empData}
                onChange={
                  handleFormDataChange
                }
              />
            );
          case 4:
            return (
              <ExperienceDetails
                cur_emp={empData}
                onChange={
                  handleFormDataChange
                }
                errors={getErrors()}
              />
            );
          case 5:
            return (
              <EducationDetails
                cur_emp={empData}
                onChange={
                  handleFormDataChange
                }
                errors={getErrors()}
              />
            );
          default:
            return (
              <h1>
                invalid step :{" "}
                {cur_step}
              </h1>
            );
        }
      })()}

      <Grid container>
        <Grid item md={2}>
          <Button
            disabled={empData.id > 0}
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
          className="Emp-form-footer"
        >
          <Button
            variant="outlined"
            disabled={cur_step === 0}
            onClick={
              handlePreviousClick
            }
          >
            {" "}
            Previous{" "}
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={hanldeExitClick}
          >
            Exit
          </Button>
          <Button
            variant="contained"
            disabled={
              cur_step + 1 >=
              steps.length
            }
            onClick={handleNextClick}
          >
            Next
          </Button>
        </Grid>
        <Grid item md={2}>
          <Button
            disabled={
              cur_step + 1 <
              steps.length
            }
            variant="contained"
            onClick={handleSubmitClick}
            className="Emp-Form-Submit"
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
export default EmpForm;
