/** @format */

import {
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import {
  useCallback,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import {
  setPage,
  setStep,
  setCurEmp,
  removeEmp,
} from "../redux/actions";
import EmpList from "./EmpList";

const EmpListPage = () => {
  const dispatch = useDispatch();
  let [search_query, setSearchQuery] =
    useState("");

  const showForm = useCallback(
    (emp) => {
      dispatch(setStep(0));
      dispatch(setCurEmp(emp));
      dispatch(setPage("form"));
    },
    [dispatch]
  );
  const handleEditClick = useCallback(
    (emp) => {
      showForm(emp);
    },
    [showForm]
  );
  const handleDeleteClick = useCallback(
    (id) => {
      dispatch(removeEmp(id));
    },
    [dispatch]
  );
  const handleAddClick =
    useCallback(() => {
      let new_emp = {
        id: 0,
        date_of_birth: new Date(),
      };
      showForm(new_emp);
    }, [showForm]);

  return (
    <>
      <Typography
        variant="h4"
        align="center"
        component="div"
        gutterBottom
      >
        Albiorix Technology Team
      </Typography>
      <Grid
        container
        justifyContent="space-between"
      >
        <Grid item md={5}>
          <div className="Emp-SearchBox-Container">
            <TextField
              size="small"
              defaultValue={
                search_query
              }
              onChange={(e) =>
                setSearchQuery(
                  e.target.value
                )
              }
              label="Search"
              variant="outlined"
            />
          </div>
        </Grid>
        <Grid item md={1}>
          <div className="Emp-Add-Button-Container">
            <Button
              variant="contained"
              onClick={handleAddClick}
            >
              Add
            </Button>
          </div>
        </Grid>
        <Grid item md={12}>
          <EmpList
            handleDeleteClick={
              handleDeleteClick
            }
            handleEditClick={
              handleEditClick
            }
            search_query={search_query}
          />
        </Grid>
      </Grid>
    </>
  );
};
export default EmpListPage;
