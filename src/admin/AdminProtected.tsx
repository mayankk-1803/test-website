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

  const { user, isLoaded } =
    useUser();


  if (!isLoaded)
    return null;


  return (

    <>
      <SignedOut>

        <RedirectToSignIn />

      </SignedOut>


      <SignedIn>

        {user?.primaryEmailAddress?.emailAddress
          === ADMIN_EMAIL
        ? (

          <AdminPanel />

        ) : (

          <div style={{

            height:"100vh",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            fontSize:"24px",
            fontWeight:"bold",
            color:"#DC2626"

          }}>

            Unauthorized Access

          </div>

        )}

      </SignedIn>

    </>

  );

};

export default AdminProtected;
