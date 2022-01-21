/** @format */

import produce from "immer"; //for immutability
import { AnyAction } from "redux";
import {
  SET_CUR_PAGE,
  SET_CUR_STEP,
  SET_SELECTED_EMP,
  SET_EMP_DATA,
  ADD_EMP,
  UPDATE_EMP,
  SET_EMP_LIST,
  DELETE_EMP,
} from "./actionTypes";
import {
  IAppState,
  Employee,
} from "./types";

//initial state of app
const initialState: IAppState = {
  employees: [], //list of employees
  cur_page: "list", //to dicide page
  selected_employee: {} as Employee, //to perform add edit
  cur_step: 0, //if form is open ,indicates the current step
};

const getNextId = (
  state: IAppState
) => {
  let next_id = 0;
  //we have employees in list
  if (state.employees.length > 0) {
    //fetch the last employee's id
    next_id =
      state.employees[
        state.employees.length - 1
      ].id;
  }
  //generate next employee id
  next_id++;
  return next_id;
};

function mainReducer(
  state: IAppState = initialState,
  action: AnyAction
) {
  switch (action.type) {
    case SET_EMP_LIST:
      return produce(state, (draft) => {
        draft.employees =
          action.payload;
      });
    case DELETE_EMP:
      return produce(state, (draft) => {
        //filter all the employees for which id not matched
        draft.employees =
          draft.employees.filter(
            (t) =>
              t.id !== action.payload
          );
      });
    case UPDATE_EMP:
      return produce(state, (draft) => {
        let id = action.payload.id;
        //find index of employee
        let index =
          draft.employees.findIndex(
            (t) => t.id === id
          );
        //if index found ,replace old value with new one
        if (index >= 0) {
          draft.employees[index] = {
            ...action.payload,
          };
        }
      });
    case ADD_EMP:
      return produce(state, (draft) => {
        if (
          action.payload.emp.id === 0
        ) {
          action.payload.id =
            getNextId(state);
        }

        //push new  emp object, in list
        draft.employees.push(
          action.payload
        );
      });
    case SET_CUR_PAGE:
      return produce(state, (draft) => {
        draft.cur_page = action.payload;
      });
    case SET_CUR_STEP:
      return produce(state, (draft) => {
        draft.cur_step = action.payload;
      });
    case SET_SELECTED_EMP:
      return produce(state, (draft) => {
        draft.selected_employee =
          action.payload;
      });

    case SET_EMP_DATA:
      return produce(state, (draft) => {
        (
          draft.selected_employee as any
        )[action.payload.name] =
          action.payload.value;
      });
  }
  return state;
}
export default mainReducer;
