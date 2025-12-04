import Cookies from "js-cookie";

export const getAccessToken = () => {
  return Cookies.get("accessToken");
};
export const setAccessToken = (data) => {
  return Cookies.set("accessToken", data);
};
export const clearAccessToken = () => {
  return Cookies.remove("accessToken", { path: "/" });
};