/** @format */

import {
  Paper,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useSelector } from "react-redux";
import { IAppState } from "../redux/types";
import NoResults from "./NoResults";

const getEmpList = (state: IAppState) =>
  state.employees;

interface EmpListProps {
  search_query: string;
  handleEditClick: Function;
  handleDeleteClick: Function;
}
const EmpList = (
  props: EmpListProps
) => {
  let list = useSelector(getEmpList);

  if (props.search_query !== "") {
    list = list.filter(
      (t) =>
        t.first_name.includes(
          props.search_query
        ) ||
        t.last_name.includes(
          props.search_query
        ) ||
        t.company_name.includes(
          props.search_query
        ) ||
        t.designation.includes(
          props.search_query
        ) ||
        t.department.includes(
          props.search_query
        )
    );
  }
  if (list.length === 0) {
    //show empty state
    return (
      <NoResults
        search_query={
          props.search_query
        }
        result_count={list.length}
      />
    );
  }
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650 }}
        size="small"
        aria-label="a dense table"
      >
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">
              Designation
            </TableCell>
            <TableCell align="right">
              Department
            </TableCell>
            <TableCell align="right">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((row) => (
            <TableRow
              key={row.id}
              sx={{
                "&:last-child td, &:last-child th":
                  { border: 0 },
              }}
            >
              <TableCell
                component="th"
                scope="row"
              >
                {row.id}
              </TableCell>
              <TableCell
                component="th"
                scope="row"
              >
                {row.first_name}{" "}
                {row.last_name}
              </TableCell>
              <TableCell align="right">
                {row.designation}
              </TableCell>
              <TableCell align="right">
                {row.department}
              </TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  color="error"
                  onClick={() =>
                    props.handleDeleteClick(
                      row.id
                    )
                  }
                >
                  {" "}
                  Delete{" "}
                </Button>
                &nbsp;
                <Button
                  variant="contained"
                  onClick={() => {
                    props.handleEditClick(
                      row
                    );
                  }}
                  color="primary"
                >
                  {" "}
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default EmpList;
