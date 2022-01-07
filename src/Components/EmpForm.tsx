import { Step, StepLabel, Stepper, Grid, Button } from "@mui/material";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IAppState, ValidationError } from "../redux/types";
import PersonalDetails from "./Forms/PersonalDetails";
import validate from "../Validation";
import { setStep } from "../redux/actions";

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
const getCurEmp = (state: IAppState) => {
  return state.selected_employee;
};



const EmpForm = () => {
  const cur_step = useSelector(getCurStep);
  const cur_emp = useSelector(getCurEmp);
  const dispatch =useDispatch();
  const steps = getSteps();
  const id = 0;
  const [errors, setErrors] = useState<Array<ValidationError>>([]) ;

  const doValidation = useCallback(() => {
    let new_errors = validate(cur_emp, cur_step);
     let cur_errors=[...errors];
     cur_errors[cur_step-1]=new_errors
    setErrors(cur_errors);
  });

const getErrors= useCallback(()=>{
        let cur_errors = errors[cur_step-1];
        if(cur_errors==undefined){
            return {failed:false}
        }
        return cur_errors;
    },[]);

  const handleNextClick = useCallback(
      () => {
        if (cur_step < getSteps().length) {
          doValidation();
          let cur_errors = getErrors();
          if (cur_errors.failed ==false) {
            //move to next step
            dispatch(setStep(cur_step + 1))
          }
        }
      },[]
  );
  console.log("errors",errors)
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
          // case 1:
          //     return <BankDetails errors={errors}  />
          // case 2:
          //     return <ProfessonalDetails errors={errors}  />
          // case 3:
          //     return <CurrentStatus errors={errors}   />
          // case 4:
          //     return <ExperienceDetails errors={errors}  />
          // case 5:
          //     return <EducationDetails errors={errors}  />
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
            // onClick={handlePreviousClick}
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
            // onClick={handleSubmitClick}
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
