import { all } from "redux-saga/effects";

import listsagas from "./taskSaga";

export default function* rootSaga() {
  yield all([...listsagas]);
}
