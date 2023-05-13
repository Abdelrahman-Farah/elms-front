import { redirect } from "react-router-dom";

export function getAuthToken() {
  return localStorage.getItem('access_token');
}

export function checkAuth() {
  if (localStorage.getItem('access_token')) {
    return true;
  } else {
    return false;
  }
}

export function logout() {
  localStorage.removeItem('access_token');
  redirect('/');
  window.location.reload();
}