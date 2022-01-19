/** @format */

import {
  ADD_EMP,
  REMOVE_EMP,
  SET_CUR_PAGE,
  SET_CUR_STEP,
  SET_EMP_DATA,
  SET_SELECTED_EMP,
  UPDATE_EMP,
} from "./actionTypes";

export function setPage(
  page: string = "list"
) {
  return {
    type: SET_CUR_PAGE,
    payload: page,
  };
}

export function setStep(
  step: number = 0
) {
  return {
    type: SET_CUR_STEP,
    payload: step,
  };
}

export function setCurEmp(emp: object) {
  return {
    type: SET_SELECTED_EMP,
    payload: emp,
  };
}

export function setEmpData(
  name: string,
  value: any
) {
  return {
    type: SET_EMP_DATA,
    payload: {
      name: name,
      value: value,
    },
  };
}

export function addEmp(emp: object) {
  return {
    type: ADD_EMP,
    payload: emp,
  };
}

export function updateEmp(emp: object) {
  return {
    type: UPDATE_EMP,
    payload: emp,
  };
}

export function removeEmp(id: number) {
  return {
    type: REMOVE_EMP,
    payload: id,
  };
}
