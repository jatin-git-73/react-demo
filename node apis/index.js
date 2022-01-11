const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }))
const port = 4000;
//this is our emp list
let emp_list = [];
//to get emp list
app.get("/", (req, res) => {
  let response = {
    status: "okay",
    list: emp_list,
  };
  res.send(response);
});

//insert emp to list
app.post("/add", (req, res) => {
  let status = "okay";
  let message = "";
  if (req.body.emp !== undefined) {
    emp_list.push(req.body.emp);
    message = "added";
  } else {
    status = "error";
    message = "invalid request";
  }

  res.send({
    message,
    status,
  });
  // res.send(JSON.stringify(req));
});

//update emp to list
app.post("/update", (req, res) => {
  let status = "okay";
  let message = "";
  let index = "index";
  if (
    req.body.emp !== undefined &&
    req.body.emp.id >= 0 &&
    emp_list.length > 0
  ) {
    index = emp_list.findIndex((t) => t.id == req.body.emp.id);
    // emp_list.splice(index, 1, req.body.emp);
    emp_list[index] = req.body.emp;
    message = "updated";
  } else {
    status = "error";
    message = "invalid request";
  }
  res.send({
    message,
    status,
    emp_list,
    index,
  });
});

//delete emp to list
app.post("/delete", (req, res) => {
  let status = "okay";
  let message = "";
  if (req.body.id !== undefined && req.body.id >= 0 && emp_list.length > 0) {
    let index = emp_list.findIndex((t) => t.id == req.id);
    emp_list.splice(index, 1);
    message = "deleted";
  } else {
    status = "error";
    message = "invalid request";
  }
  res.send({
    message,
    status,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
