import { SignIn } from "@clerk/clerk-react";

export default function AdminLogin() {

  return (

    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>

      <SignIn
        routing="path"
        path="/admin/login"
      />

    </div>

  );
}
