import axios from "axios";
import { retrieveToken, saveToken } from "./utils/localStorage";
import { Auth } from "aws-amplify";

export const PROD = "PRODUCTION";
export const QA = "QA";
export const DEV = "DEVELOPMENT";
export let ENV;
export const LOCAL = "LOCAL";

axios.defaults.headers.post["Content-Type"] = "application/json";
const instance = axios.create({
  baseURL: `${window.location.protocol}//`
});
instance.all = axios.all;
instance.spread = axios.spread;

axios.interceptors.request.use(config => {
  const token = `Bearer ${retrieveToken()}`;
  config.headers.Authorization = token;
  return config;
});

instance.interceptors.request.use(config => {
  const token = `Bearer ${retrieveToken()}`;
  config.headers.Authorization = token;
  return config;
});

instance.interceptors.response.use(
  response => {
    return response;
  },
  function(error) {
    const originalRequest = error.config;
    return new Promise((resolve, reject) => {
      if (error.response.status === 401) {
        Auth.currentSession()
          .then(session => {
            var refreshToken = session.getRefreshToken();
            Auth.currentAuthenticatedUser().then(res => {
              res.refreshSession(refreshToken, (err, data) => {
                if (err) {
                  localStorage.clear();
                  Auth.signOut();
                  window.location.pathname = "/login";
                } else {
                  saveToken(
                    data.accessToken.jwtToken,
                    data.refreshToken.token,
                    data.idToken.jwtToken
                  );

                  instance.defaults.headers.common["Authorization"] =
                    "Bearer " + retrieveToken();

                  return resolve(instance(originalRequest));
                }
              });
            });
          })
          .catch(() => {
            // No logged-in user: don't set auth header
            localStorage.clear();
            Auth.signOut();
            window.location.pathname = "/login";
            // resolve(config);
          });
      } else {
        console.log(error);
        return reject(error);
      }
    });
  }
);

export default instance;
