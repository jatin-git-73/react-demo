import * as React from "react";
import { connect } from "react-redux";
import { Grid,Button, TextField,Paper, Typography, FormLabel } from "@mui/material";
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { setEmpData } from "../../redux/actions";

class PersonalDetails extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
        return <div 
        style={{
display: 'flex',
justifyContent: 'center',
alignContent: 'center',
flexDirection: 'column',
padding: '10px',
textAlign: 'center'
        }}
        >
                    <div>
                        <Typography variant='h5'>Personal Details</Typography>
                    </div>
                    <div>
                        <FormLabel>
                            Profile picture
                        </FormLabel>
                    </div>
                    <div>
                        <input type='file'  />
                    </div>

                    <TextField error={this.props.error.first_name!==undefined} helperText={this.props.error.first_name} label="First Name" variant="standard"
                    defaultValue={this.props.cur_emp.first_name?this.props.cur_emp.first_name:''}
                    onChange={(e)=>{
                            this.props.setEmpData("first_name",e.target.value)
                    }}
                    />
                    <TextField error={this.props.error.last_name!==undefined} helperText={this.props.error.last_name}  label="Last Name" variant="standard" 
                    defaultValue={this.props.cur_emp.last_name?this.props.cur_emp.last_name:''}
                    onChange={(e)=>{
                        this.props.setEmpData("last_name",e.target.value)
                    }}
                    style={{
                        marginBottom:'10px',
                    }}
                    />
                            <LocalizationProvider dateAdapter={AdapterDateFns} >
                            <MobileDatePicker
                            label="Date of Birth"
                            value={this.props.cur_emp.dob?this.props.cur_emp.dob:new Date()}
                            onChange={(newValue) => {
                                this.props.setEmpData("dob",newValue)
                            // setValue(newValue);
                            }}
                            renderInput={(params) => <TextField 
                                error={this.props.error.date_of_birth!==undefined} helperText={this.props.error.date_of_birth}
                                variant="standard"  {...params} />}
                            />
                            </LocalizationProvider>
                    <TextField  
                     error={this.props.error.phone!==undefined} helperText={this.props.error.phone}
                     inputProps={{
                        maxLength: 10,
                      }}
                     onChange={(e)=>{
                        this.props.setEmpData("phone",e.target.value)
                    }}
                     defaultValue={this.props.cur_emp.phone?this.props.cur_emp.phone:''}
                    label="Phone" variant="standard" />
                    <TextField  label="Email" variant="standard"
                        onChange={(e)=>{
                            this.props.setEmpData("email",e.target.value)
                        }}
                     defaultValue={this.props.cur_emp.email?this.props.cur_emp.email:''}
                    error={this.props.error.email!==undefined} helperText={this.props.error.email}
                    />
               </div>
  }
}
function mapStateToProps(state){
  return {
      cur_emp:state.selected_employee
  };
}
function mapDispatchToProps(dispatch){
  return {
      setEmpData:(name,value)=>dispatch(setEmpData(name,value)),
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(PersonalDetails)
