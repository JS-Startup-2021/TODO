import { call, fork, put, takeEvery } from "redux-saga/effects";

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

function* getTasksApi(action) {
  try {
    const tasks = yield call(getApi);
    // console.log(getApi());
    yield put({ type: "GET_TASKS_SUCCES", tasks: tasks });
  } catch (e) {
    yield put({ type: "GET_TASKS_FAILED", message: e.message });
  }
}

function addApi(data) {
  // console.log(data);
  return fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data.payload),
  })
    .then((response) => response.json())
    .catch((err) => console.log("err: ", err));
}

function* addTasksApi(action) {
  try {
    const tasks = yield call(addApi, action);
    yield put({ type: "POST_TASKS_SUCCES", tasks: tasks });
  } catch (e) {
    yield put({ type: "POST_TASKS_FAILED", message: e.message });
  }
}

function setApi(data) {
  //console.log(data);

  return fetch(`http://localhost:3000/tasks/${data.payload.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      task: data.payload.task,
      isCompleted: true,
    }),
  })
    .then((response) => response.json())
    .catch((err) => console.log("err: ", err));
}

function* setTasksApi(action) {
  // console.log(action);
  try {
    const tasks = yield call(setApi, action);
    yield put({ type: "PUT_TASKS_SUCCES", tasks: tasks });
  } catch (e) {
    yield put({ type: "PUT_TASKS_FAILED", message: e.message });
  }
}

function removeApi(data) {
  console.log(data.payload.id);
  return fetch(`http://localhost:3000/tasks/${data.payload.id}`, {
    method: "DELETE",
  }).then((response) => response.json());
}

function* removeTasksApi(action) {
  try {
    const tasks = yield call(removeApi, action);
    console.log(action.payload);
    yield put({ type: "DELETE_TASKS_SUCCES", tasks: action.payload });
  } catch (e) {
    yield put({ type: "DELETE_TASKS_FAILED", message: e.message });
  }
}

function* watchFetchlists() {
  yield takeEvery("GET_TASKS_REQUESTED", getTasksApi);
}
function* watchAddTodo() {
  yield takeEvery("POST_TASKS_REQUESTED", addTasksApi);
}
function* watchEditTodo() {
  yield takeEvery("PUT_TASKS_REQUESTED", setTasksApi);
}

function* watchDeleteTodo() {
  yield takeEvery("DELETE_TASKS_REQUESTED", removeTasksApi);
}

export default [
  watchFetchlists(),
  watchAddTodo(),
  watchEditTodo(),
  watchDeleteTodo(),
];
