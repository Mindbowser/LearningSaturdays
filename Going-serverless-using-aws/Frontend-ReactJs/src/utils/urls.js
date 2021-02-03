// let apiVersion = "http://3.135.6.61:8000";
//let apiVersion = "https://w930aq8q57.execute-api.us-east-2.amazonaws.com";

let apiVersion = process.env.REACT_APP_API_URL;
console.log(process.env);

//provider urls
export const getAllProvidersPageUrl = `${apiVersion}/dev/GetAllProvidersPage?isForward=`;
export const saveProviderUrl = `${apiVersion}/dev/SaveProvider`;
export const deleteProviderUrl = `${apiVersion}/dev/DeleteProvider`;
export const getAllProvidersUrl = `${apiVersion}/dev/GetAllProviders`;
export const getAllPatientsByProviderIdURL = `${apiVersion}/dev/GetAllPatientsByProviderId?providerId=`;

//patients url
export const getAllPatientsUrl = `${apiVersion}/dev/GetAllPatients`;
export const getAllPatientsPageUrl = `${apiVersion}/dev/GetAllPatientsPage?isForward=`;
export const uploadCSVURL = `${apiVersion}/dev/UploadCsvSurgeryProvider`;
export const getAllPatientsByProviderURL = `${apiVersion}/dev/GetAllPatientsByProvider?email=`;

//client urls
export const saveClientUrl = `${apiVersion}/dev/SaveClient`;
export const getAllClientsUrl = `${apiVersion}/dev/GetAllClients`;
export const deleteClientUrl = `${apiVersion}/dev/DeleteClient`;
export const getAllPatientsAndProvidersByClientUrl = `${apiVersion}/dev/GetAllPatientsAndProvidersByClient?clientId=`;

//refrence sheet urls
export const saveReferenceSheetUrl = `${apiVersion}/dev/SaveReferenceSheetDetails`;
export const getReportsUrl = `${apiVersion}/dev/download?`;

//authentication url
export const signUpUrl = `https://v58qex9vph.execute-api.us-east-2.amazonaws.com/dev/user-info`;
