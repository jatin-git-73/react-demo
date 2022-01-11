import axios from "axios";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { FETCH_EMP_LIST, SET_EMP_LIST } from "../redux/actionTypes";
const api_url = "http://localhost:4000";

export function* fetchEmpList(action) {
  try {
    const list = yield axios(api_url + "/")
      .then((res) => {
        console.log("res", res.data);
        return res.data;
      })
      .then((res) => {
        if (res.status == "okay") {
          return res.list;
        } else {
          throw Error(res.message);
        }
      });
    // const user = yield call(Api.fetchUser, action.payload.userId);
    yield put({ type: SET_EMP_LIST, payload: list });
  } catch (e) {
    console.log("error", e);
    yield put({ type: "EMP_LIST_FETCH_FAILED", message: e.message });
  }
}

export default function* mySaga() {
  yield takeEvery(FETCH_EMP_LIST, fetchEmpList);
}
