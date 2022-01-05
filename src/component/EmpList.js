import { Grid,Button, TextField,Paper, Typography } from "@mui/material";
import * as React from "react";
import { connect } from "react-redux";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { setCurEmp, setPage, setStep } from "../redux/actions";

class EmpList extends React.Component{

    handleAddClick=()=>{
        this.props.setStep(0);//since we are adding
        let new_emp={id:0,date_of_birth:new Date()};
        this.props.setCurEmp(new_emp);
        this.props.setPage("form")//show the form
    }

    render(){
       return <>
            <Paper>
            <Typography variant="h4" align="center" component="div" gutterBottom>
                Albiorix Technology Team
             </Typography>
             <Grid container justifyContent='space-between' >
                    <Grid item md col='1' >
                    <div style={{
                            display:'flex',
                            flexDirection:'row',
                            justifyContent:'start',
                            padding:'10px'
                        }}>
                        <TextField  label="Outlined" variant="outlined" />
                        </div>
                    </Grid>
                    <Grid item md col='1'  >
                        <div style={{
                            display:'flex',
                            flexDirection:'row',
                            justifyContent:'end',
                            padding:'10px'
                        }}>
                            <Button variant="contained" onClick={this.handleAddClick} >Add</Button>
                        </div>
                    </Grid>
             </Grid>

                            <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="right">Designation</TableCell>
                                    <TableCell align="right">Department</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        this.props.list.length==0?
                                        <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row" colSpan={4}>
                                                No records found
                                            </TableCell>
                                        </TableRow>
                                        :
                                        this.props.list.map((row) => (
                                            <TableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                            <TableCell component="th" scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row.calories}</TableCell>
                                            <TableCell align="right">{row.fat}</TableCell>
                                            <TableCell align="right">{row.carbs}</TableCell>
                                            <TableCell align="right">{row.protein}</TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                            </TableContainer>
            </Paper>
       </> 
    }
}
function mapStateToProps(state){
    return {
        list:state.employees
    }
}
function mapDispatchToProps(dispatch){
    return {
        setPage:(page)=>{return dispatch(setPage(page));},
        setStep:(step)=>{return dispatch(setStep(step));},
        setCurEmp:(emp)=>{return dispatch(setCurEmp(emp));}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(EmpList);