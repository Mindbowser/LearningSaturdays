// import { takeLatest } from "redux-saga/effects";
// import * as actionTypes from "../actions/actionTypes";
// import * as ProviderMiddleWare from "./providerSagas";
// import * as PatientMiddleware from "./patientSagas";
// import * as ClientMiddleware from "./clientSagas";

// export default function* mySaga() {
//   yield takeLatest(
//     actionTypes.GET_ALL_PROVIDERS,
//     ProviderMiddleWare.getAllProviderSagaCall
//   );

//   yield takeLatest(
//     actionTypes.GET_PROVIDERS_TO_DOWNLOAD,
//     ProviderMiddleWare.getAllProviderToDownloadSagaCall
//   );

//   yield takeLatest(
//     actionTypes.GET_ALL_PATIENTS,
//     PatientMiddleware.getAllPatientsSagaCall
//   );

//   yield takeLatest(
//     actionTypes.GET_ALL_PATIENTS_PAGINATION,
//     PatientMiddleware.getAllPatientsPaginationSagaCall
//   );

//   yield takeLatest(
//     actionTypes.GET_ALL_CLIENTS,
//     ClientMiddleware.getAllClientsSagaCall
//   );

// }
