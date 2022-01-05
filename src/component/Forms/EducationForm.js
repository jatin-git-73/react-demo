import * as React from "react";
import { connect } from "react-redux";
import { Grid,Button, TextField,Paper, Typography, FormLabel } from "@mui/material";
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { setEmpData } from "../../redux/actions";
import validate from "../../validation";

class EducationForm extends React.Component{
  constructor(props){
    super(props)
    this.state={};
  }
  handleRemoveClcik=()=>{
    let education=[...this.props.cur_emp.education] ;
    education.splice(this.props.index,1);
    this.props.setEmpData("education",education);       
  }
  handleInput=(name,value)=>{
    let education=[...this.props.cur_emp.education]
    let cur_exp={...education[this.props.index]};
    cur_exp[name] = value;
    education[this.props.index]=cur_exp;
    this.props.setEmpData("education",education)
  }
  render(){
        let errors = this.props.errors;
        if(errors==undefined){
          errors={};
        }
        return <div 
        style={{
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                flexDirection: 'column',
                padding: '10px',
                textAlign: 'center',
                border:'1px solid lightgray',
                marginTop:'10px'
        }}
        >

                    <TextField error={errors.company_name!==undefined} helperText={errors.company_name} label="Company" variant="standard"
                    defaultValue={this.props.edu.company_name?this.props.edu.company_name:''}
                    onChange={(e)=>{
                            this.handleInput("company_name",e.target.value)
                    }}
                    />
                    <TextField error={errors.designation!==undefined} helperText={errors.designation}  label="Designation" variant="standard" 
                    defaultValue={this.props.edu.designation?this.props.edu.designation:''}
                    onChange={(e)=>{
                        this.handleInput("designation",e.target.value)
                    }}
                    style={{
                        marginBottom:'10px',
                    }}
                    />
                          
                    <TextField  
                     error={errors.department!==undefined} helperText={errors.department}
                     onChange={(e)=>{
                        this.handleInput("department",e.target.value)
                    }}
                     defaultValue={this.props.edu.department?this.props.edu.department:''}
                    label="Department" variant="standard" />

                    <TextField  label="CTC" variant="standard"
                        onChange={(e)=>{
                            this.handleInput("ctc",e.target.value)
                        }}
                     defaultValue={this.props.edu.ctc?this.props.edu.ctc:''}
                    error={errors.ctc!==undefined} helperText={errors.ctc}
                    />
                     <LocalizationProvider dateAdapter={AdapterDateFns} >
                            <MobileDatePicker
                            label="From"
                            value={this.props.edu.join_date?this.props.edu.join_date:new Date()}
                            onChange={(newValue) => {
                                this.handleInput("join_date",newValue)
                            }}
                            renderInput={(params) => {
                                return <>
                                <TextField 
                                // helperText={errors.join_date}
                                variant="standard"  {...params} />
                                <Typography align="left" color={'red'} variant='caption' >{errors.join_date}</Typography>
                                </>
                            }
                            
                            }
                            />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDateFns} >
                            <MobileDatePicker
                            label="To"
                            value={this.props.edu.last_date?this.props.edu.last_date:new Date()}
                            onChange={(newValue) => {
                                this.handleInput("last_date",newValue)
                            }}
                            renderInput={(params) => {
                                return <>
                                <TextField 
                                // helperText={errors.last_date}
                                variant="standard"  {...params} />
                                <Typography align="left" color={'red'} variant='caption' >{errors.last_date}</Typography>
                                </>
                            }
                            
                            }
                            />
                    </LocalizationProvider>
                    <div style={{display:'flex',padding:'10px'}}>
                      <Button variant="contained" color='secondary' onClick={this.handleRemoveClcik}>Remove</Button>
                    </div>
               </div>
  }
}
function mapStateToProps(state){
  console.log("cur_emp",state.selected_employee)
  return {
      cur_emp:state.selected_employee,
      cur_step : state.cur_step
  };
}
function mapDispatchToProps(dispatch){
  return {
      setEmpData:(name,value)=>dispatch(setEmpData(name,value)),
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(EducationForm)
