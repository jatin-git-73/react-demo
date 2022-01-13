import { Paper } from "@mui/material";
import { useSelector } from "react-redux";
import EmpForm from "./Components/EmpForm";
import EmpListPage from "./Components/EmpListPage";
import { IAppState } from "./redux/types";

const getCurrentPage = (state: IAppState) => state.cur_page;

function App() {
  const cur_page = useSelector(getCurrentPage);
  let content = null;
  if (cur_page === "list") {
    content = <EmpListPage />;
  } else if (cur_page === "form") {
    content = <EmpForm />;
  } else {
    content = <>page not found</>;
  }

  return (
    <div style={{ padding: "0px 10% 0px 10% " }}>
      <Paper style={{ marginTop: "25px", padding: "15px" }}> {content} </Paper>
    </div>
  );
}
export default App;
