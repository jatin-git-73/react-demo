import produce from "immer";
import { AnyAction } from "redux";
import {
  SET_CUR_PAGE,
  SET_CUR_STEP,
  SET_SELECTED_EMP,
  SET_EMP_DATA,
  ADD_EMP,
  UPDATE_EMP,
  REMOVE_EMP,
} from "./actionTypes";
import { IAppState, Employee } from "./types";

const initialState: IAppState = {
  employees: [], //list of employees
  cur_page: "list", //to dicide page
  selected_employee: {} as Employee, //to perform add edit
  cur_step: 0,
};

function mainReducer(state: IAppState = initialState, action: AnyAction) {
  switch (action.type) {
    case REMOVE_EMP:
      return produce(state, (draft) => {
        let index = draft.employees.findIndex((t) => t.id == action.payload);
        draft.employees.splice(index, 1);
      });
    case UPDATE_EMP:
      return produce(state, (draft) => {
        let id = action.payload.id;
        let index = draft.employees.findIndex((t) => t.id == id);
        if (index < 0) index = 0;
        draft.employees[index] = draft.selected_employee;
      });
    case ADD_EMP:
      return produce(state, (draft) => {
        draft.employees.push(action.payload);
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
        draft.selected_employee = action.payload;
      });

    case SET_EMP_DATA:
      return produce(state, (draft) => {
        (draft.selected_employee as any)[action.payload.name] =
          action.payload.value;
      });
  }
  return state;
}
export default mainReducer;
