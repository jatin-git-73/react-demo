import { Paper, Typography, Grid, TextField, Button } from "@mui/material";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage, setStep, setCurEmp, removeEmp } from "../redux/actions";
import { IAppState } from "../redux/types";
import EmpList from "./EmpList";
import NoResults from "./NoResults";

const getEmpList = (state: IAppState) => state.employees;

const EmpListPage = () => {
  const dispatch = useDispatch();
  const list = useSelector(getEmpList);
  let [search_query, setSearchQuery] = useState("");

  const showForm = useCallback((emp) => {
    dispatch(setStep(0));
    dispatch(setCurEmp(emp));
    dispatch(setPage("form"));
  }, []);
  const handleEditClick = useCallback((emp) => {
    showForm(emp);
  }, []);
  const handleDeleteClick = useCallback((id) => {
    dispatch(removeEmp(id));
  }, []);
  const handleAddClick = useCallback(() => {
    let new_emp = { id: 0, date_of_birth: new Date() };
    showForm(new_emp);
  }, []);

  return (
    <>
      <Typography variant="h4" align="center" component="div" gutterBottom>
        Albiorix Technology Team
      </Typography>
      <Grid container justifyContent="space-between">
        <Grid item md={5}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "start",
              padding: "10px",
            }}
          >
            <TextField
              size="small"
              defaultValue={search_query}
              onChange={(e) => setSearchQuery(e.target.value)}
              label="Search"
              variant="outlined"
            />
          </div>
        </Grid>
        <Grid item md={1}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "end",
              padding: "10px",
            }}
          >
            <Button variant="contained" onClick={handleAddClick}>
              Add
            </Button>
          </div>
        </Grid>
        <EmpList
          handleDeleteClick={handleDeleteClick}
          handleEditClick={handleEditClick}
          search_query={search_query}
        />
      </Grid>
    </>
  );
};
export default EmpListPage;
