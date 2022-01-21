/** @format */

import { Paper } from "@mui/material";
import { useEffect } from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import EmpForm from "./Components/EmpForm";
import EmpListPage from "./Components/EmpListPage";
import { fetchEmpyList } from "./redux/actions";
import { IAppState } from "./redux/types";
import "./App.css";

const getCurrentPage = (
  state: IAppState
) => state.cur_page;

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEmpyList());
  }, []);
  const cur_page = useSelector(
    getCurrentPage
  );
  let content = null;
  if (cur_page === "list") {
    content = <EmpListPage />;
  } else if (cur_page === "form") {
    content = <EmpForm />;
  } else {
    content = <>page not found</>;
  }

  return (
    <div className="App">
      <Paper className="App-container">
        {content}
      </Paper>
    </div>
  );
}
export default App;
