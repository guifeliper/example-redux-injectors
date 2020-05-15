import { put } from 'redux-saga/effects';



export default function* getData() {
  try {
    yield put({ type: 'TESTING' });
  } catch (err) {
    yield put({ type: 'TEST' });
  }
}
