import { call, put, takeEvery } from "redux-saga/effects";

const apiUrl = "http://localhost:3000/tasks";

function getApi() {
  return (
    fetch(apiUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      //   .then((data) => console.log(data))
      .catch((err) => console.log("err: ", err))
  );
}

function* fetchTasks(action) {
  try {
    const tasks = yield call(getApi);
    // console.log(getApi());
    yield put({ type: "GET_TASKS_SUCCES", tasks: tasks });
  } catch (e) {
    yield put({ type: "GET_TASKS_FAILED", message: e.message });
  }
}

function* taskSaga() {
  yield takeEvery("GET_TASKS_REQUESTED", fetchTasks);
}

export default taskSaga;
