/** @format */

import {
  Typography,
  FormLabel,
  TextField,
  Grid,
} from "@mui/material";
import { useCallback } from "react";

import {
  EmployeeNodeVaule,
  PersonalDetailsError,
  EmpFormProps,
  Employee,
} from "../../redux/types";

import MobileDatePicker from "@mui/lab/MobileDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

//get the photo of employee
const getPhoto = (state: Employee) => {
  return (
    state.photo || "images/no-pic.svg"
  );
};

const PersonalDetails = (
  props: EmpFormProps
) => {
  const photo = getPhoto(
    props?.cur_emp as Employee
  );
  const cur_emp = props.cur_emp;

  //to handle change event of form elements
  const handleInput = useCallback(
    (
      name: string,
      value: EmployeeNodeVaule
    ) => {
      props.onChange?.(name, value);
    },
    [props]
  );

  //to handle photo upload event of
  const handleFileUpload = useCallback(
    (evt) => {
      var files = evt.target.files;
      for (
        var i = 0, f: Blob;
        i < files.length;
        i++
      ) {
        f = files[i];
        if (!f.type.match("image.*")) {
          continue;
        }
        var reader = new FileReader();
        reader.onload = ((theFile) => {
          return (e) => {
            handleInput(
              "photo",
              (e.target as any).result
            );
          };
        })(f);
        reader.readAsDataURL(f);
      }
    },
    [handleInput]
  );

  let errors =
    props.errors as PersonalDetailsError;
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          flexDirection: "column",
          padding: "10px",
          textAlign: "center",
        }}
      >
        <div>
          <Typography variant="h5">
            Personal Details
          </Typography>
        </div>
        <div>
          <FormLabel>
            Profile picture
          </FormLabel>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <img
            width="200"
            src={photo}
            alt="profile-pic"
          />
          <input
            type="file"
            onChange={handleFileUpload}
          />
        </div>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
        >
          <Grid item md={5}>
            <TextField
              size="small"
              fullWidth
              error={
                errors.first_name !== ""
              }
              helperText={
                errors.first_name
              }
              label="First Name"
              variant="outlined"
              defaultValue={
                cur_emp?.first_name
                  ? cur_emp?.first_name
                  : ""
              }
              onChange={(e) => {
                handleInput(
                  "first_name",
                  e.target.value
                );
              }}
            />
          </Grid>
          <Grid item md={5}>
            <TextField
              size="small"
              fullWidth
              error={
                errors.last_name !== ""
              }
              helperText={
                errors.last_name
              }
              label="Last Name"
              variant="outlined"
              defaultValue={
                cur_emp?.last_name
                  ? cur_emp?.last_name
                  : ""
              }
              onChange={(e) => {
                handleInput(
                  "last_name",
                  e.target.value
                );
              }}
              style={{
                marginBottom: "10px",
              }}
            />
          </Grid>

          <Grid item md={5}>
            <TextField
              fullWidth
              size="small"
              error={
                errors.phone !== ""
              }
              helperText={errors.phone}
              inputProps={{
                maxLength: 10,
              }}
              onChange={(e) => {
                handleInput(
                  "phone",
                  e.target.value
                );
              }}
              defaultValue={
                cur_emp?.phone
                  ? cur_emp?.phone
                  : ""
              }
              label="Phone"
              variant="outlined"
            />
          </Grid>
          <Grid item md={5}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              size="small"
              onChange={(e) => {
                handleInput(
                  "email",
                  e.target.value
                );
              }}
              defaultValue={
                cur_emp?.email
                  ? cur_emp?.email
                  : ""
              }
              error={
                errors.email !== ""
              }
              helperText={errors.email}
            />
          </Grid>
          <Grid
            item
            md={5}
            style={{
              marginTop: "10px",
            }}
          >
            <LocalizationProvider
              dateAdapter={
                AdapterDateFns
              }
            >
              <MobileDatePicker
                label="Date of Birth"
                value={
                  cur_emp?.date_of_birth
                    ? new Date(
                        cur_emp?.date_of_birth
                      )
                    : new Date()
                }
                onChange={(
                  newValue
                ) => {
                  handleInput(
                    "date_of_birth",
                    newValue
                  );
                }}
                renderInput={(
                  params
                ) => {
                  return (
                    <>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        {...params}
                      />
                      <Typography
                        align="left"
                        color={"red"}
                        variant="caption"
                      >
                        {
                          errors.date_of_birth
                        }
                      </Typography>
                    </>
                  );
                }}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </div>
    </>
  );
};
export default PersonalDetails;
