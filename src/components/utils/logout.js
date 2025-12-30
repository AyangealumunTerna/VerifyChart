export const logout = (navigate) => {
  localStorage.removeItem("role"); // end session only
  navigate("/login", { replace: true });
};
