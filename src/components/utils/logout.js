// utils/logout.js
export const logout = async (arg) => {
  // Support BOTH call styles
  const navigate =
    typeof arg === "function"
      ? arg
      : typeof arg === "object"
      ? arg.navigate
      : null;

  const setVendor =
    typeof arg === "object" ? arg.setVendor : null;

  try {
    await fetch("https://verifycart.onrender.com/api/auth/vendor/logout", {
      method: "POST",
      credentials: "include",
    });

    // Clear ALL auth data
    localStorage.removeItem("vendor");
    localStorage.removeItem("vendorId");
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    if (setVendor) setVendor(null);

    if (navigate) {
      navigate("/login", { replace: true });
    }
  } catch (error) {
    console.error("Logout failed:", error);

    // Fallback logout
    localStorage.clear();

    if (navigate) {
      navigate("/login", { replace: true });
    }
  }
};
