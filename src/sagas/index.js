/** @format */

import axios from "axios";
import {
  put,
  takeEvery,
} from "redux-saga/effects";

import {
  ADD_EMP,
  DELETE_EMP,
  FETCH_EMP_LIST,
  REMOVE_EMP,
  SAVE_NEW_EMP,
  SET_EMP_LIST,
  UPDATE_CUR_EMP,
} from "../redux/actionTypes";

const api_url = "http://localhost:4000";

export function* updateUserSaga(
  action
) {
  try {
    yield axios
      .post(api_url + "/update", {
        emp: action.payload,
      })
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        if (res.status === "okay") {
          return res.list;
        } else {
          throw Error(res.message);
        }
      });
    yield put({
      type: ADD_EMP,
      payload: action.payload,
    });
  } catch (e) {
    alert("unable to save data:");
  }
}

export function* addUserSaga(action) {
  try {
    yield axios
      .post(api_url + "/add", {
        emp: action.payload,
      })
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        if (res.status === "okay") {
          return res.list;
        } else {
          throw Error(res.message);
        }
      });
    yield put({
      type: ADD_EMP,
      payload: action.payload,
    });
  } catch (e) {
    alert("unable to save data:");
  }
}

export function* deleteUserSaga(
  action
) {
  try {
    yield axios
      .post(api_url + "/delete", {
        id: action.payload,
      })
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        if (res.status === "okay") {
          return res.list;
        } else {
          throw Error(res.message);
        }
      });
    yield put({
      type: DELETE_EMP,
      payload: action.payload,
    });
  } catch (e) {
    alert("unable to delete employee");
  }
}

export function* fetchEmpList(action) {
  try {
    let list = yield axios(
      api_url + "/"
    )
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        if (res.status === "okay") {
          return res.list;
        } else {
          throw Error(res.message);
        }
      });

    list = list.map((t) => {
      t.date_of_birth = new Date(
        t.date_of_birth
      );
      return t;
    });
    // const user = yield call(Api.fetchUser, action.payload.userId);
    yield put({
      type: SET_EMP_LIST,
      payload: list,
    });
  } catch (e) {
    alert("unable to fetch list data:");
    yield put({
      type: "EMP_LIST_FETCH_FAILED",
      message: e.message,
    });
  }
}

export default function* mySaga() {
  yield takeEvery(
    FETCH_EMP_LIST,
    fetchEmpList
  );

  yield takeEvery(
    SAVE_NEW_EMP,
    addUserSaga
  );

  yield takeEvery(
    UPDATE_CUR_EMP,
    updateUserSaga
  );

  yield takeEvery(
    REMOVE_EMP,
    deleteUserSaga
  );
}
