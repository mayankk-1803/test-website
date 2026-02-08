import { SignIn } from "@clerk/clerk-react";

const AdminLogin = () => {

  return (

    <div style={{
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      height:"100vh"
    }}>

      <SignIn />

    </div>

  );

};

export default AdminLogin;
