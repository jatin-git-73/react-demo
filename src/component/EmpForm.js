import * as React from "react";
import { Grid,Button, TextField,Paper, Typography } from "@mui/material";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { connect } from "react-redux";
import { setCurEmp, setPage, setStep } from "../redux/actions";
import PersonalDetails from "./Forms/PersonalDetails";
import BankDetails from "./Forms/BankDetails";
import validate from "../validation";
import ProfessonalDetails from "./Forms/ProfessonalDetails";
import CurrentStatus from "./Forms/CurrentStatus";
import ExperienceDetails from "./Forms/ExperienceDetails";
import EducationDetails from "./Forms/EducationDetails";


class EmpForm extends React.Component{
    hanldeExitClick=()=>{
        this.props.setStep(0);
        this.props.setPage("list");
    }
    handlePreviousClick=()=>{
        if(this.props.cur_step==0)return;
        this.props.setStep(this.props.cur_step-1);
    }
    handleNextClick=(flag)=>{
        if(flag)return;
        //move to next step
        this.props.setStep(this.props.cur_step+1);
    }
    render(){
        let errors=validate(this.props.cur_emp,this.props.cur_step);
        const steps = ['Personal Details', 'Bank Details', 'Professional Details',"Current Status","Experience Details","Educational Details"];
        return <>
            <Paper>
                <div style={{
                    padding:'10px'
                }}>
                        <Stepper activeStep={this.props.cur_step}>
                        {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                        );
                        })}
                        </Stepper>
                        { (()=>{
                            switch(this.props.cur_step){
                                case 0:
                                    return <PersonalDetails error={errors} />
                                case 1:
                                    return <BankDetails />
                                case 2:
                                    return <ProfessonalDetails />
                                case 3:
                                    return <CurrentStatus />
                                case 4:
                                    return <ExperienceDetails/>
                                case 5:
                                    return <EducationDetails/>
                                default : 
                                return <h1>invalid step : {this.props.cur_step}</h1>
                            }
                        })()
                        }
                        <Grid container>
                            <Grid item md col='2'>
                                <Button disabled={this.props.cur_emp.id ==0} variant="contained" color='error' >Remove</Button>
                            </Grid>
                            <Grid item md col='8' style={{
                                display:'flex',
                                justifyContent:'space-between'
                            }}>
                                <Button variant="outlined" disabled={this.props.cur_step==0} onClick={this.handlePreviousClick} > Previous </Button>
                                <Button variant="outlined" color='error' onClick={this.hanldeExitClick}  > Exit </Button>
                                <Button variant="contained"  disabled={errors.failed} onClick={()=>this.handleNextClick(errors.failed)} > Next </Button>
                            </Grid>
                            <Grid item md col='2'>
                            <Button disabled={this.props.cur_step+1<steps.length} variant="contained" style={{float:'right'}} >Submit</Button>
                            </Grid>
                        </Grid>
                </div>
            </Paper>
        </>
    }
}


function mapStateToProps(state){
    return {
        cur_step : state.cur_step,
        cur_emp  : state.selected_employee
    }
}
function mapDispatchToProps(dispatch){
    return {
        setPage:(page)=>{return dispatch(setPage(page));},
        setStep:(step)=>{return dispatch(setStep(step));},
        setCurEmp:(emp)=>{return dispatch(setCurEmp(emp));}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(EmpForm);