import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  useUser
} from "@clerk/clerk-react";

import AdminPanel from "./AdminPanel";

const ADMIN_EMAIL =
  "primeoriginexports@gmail.com";

const AdminProtected = () => {

  const { user, isLoaded, isSignedIn } = useUser();

  // show loading instead of blank screen
  if (!isLoaded) {
    return (
      <div style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "20px"
      }}>
        Loading...
      </div>
    );
  }

  // redirect if not signed in
  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  // allow only your admin email
  if (
    user?.primaryEmailAddress?.emailAddress !== ADMIN_EMAIL
  ) {
    return (
      <div style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "24px",
        fontWeight: "bold",
        color: "#DC2626"
      }}>
        Unauthorized Access
      </div>
    );
  }

  return <AdminPanel />;
};

export default AdminProtected;
