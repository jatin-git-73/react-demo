import { Paper, Typography ,Grid,TextField,Button,TableContainer,Table,TableHead,TableRow,TableCell,TableBody} from "@mui/material";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage ,setStep,setCurEmp} from "../redux/actions";
import { IAppState } from "../redux/types";
import NoResults from "./NoResults";

const getEmpList=(state:IAppState)=>state.employees

interface EmpListProps{
    search_query:string
}
const EmpList=(props:EmpListProps)=>{
    const dispatch = useDispatch();
    const list=useSelector(getEmpList);
    if(list.length==0){
        //show empty state
        return <NoResults  search_query={props.search_query} result_count={list.length} />
    }
    return <TableContainer component={Paper}>
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
                list.map((row) => (
                    <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {row.first_name} {row.last_name}
                    </TableCell>
                    <TableCell align="right">{row.designation}</TableCell>
                    <TableCell align="right">{row.department}</TableCell>
                    <TableCell align="right">
                        {/* <Button variant='contained' color='error' onClick={()=>this.handleDeleteClick(row.id)} > Delete </Button>&nbsp;
                        <Button variant='contained' onClick={()=>{this.handleEditClick(row)}} color='primary' > Edit</Button> */}
                    </TableCell>
                    </TableRow>
                ))
            }
        </TableBody>
    </Table>
    </TableContainer>
}
export default EmpList;