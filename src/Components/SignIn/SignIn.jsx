// import React from "react";
// import * as Components from "./Components";
// import "./styles.css";

// export default function SignIn() {
//   const [signIn, toggle] = React.useState(true);
//   return (
//     <div className="cards">
//       <Components.Container>
//         <Components.SignUpContainer signingIn={signIn}>
//           <Components.Form>
//             <Components.Title>Create Account</Components.Title>
//             <Components.Input type="text" placeholder="Name" />
//             <Components.Input type="email" placeholder="Email" />
//             <Components.Input type="password" placeholder="Password" />
//             <Components.Button>Sign Up</Components.Button>
//           </Components.Form>
//         </Components.SignUpContainer>
//         <Components.SignInContainer signingIn={signIn}>
//           <Components.Form>
//             <Components.Title>Sign in</Components.Title>
//             <Components.Input type="email" placeholder="Email" />
//             <Components.Input type="password" placeholder="Password" />
//             <Components.Anchor href="#">Forgot your password?</Components.Anchor>
//             <Components.Button>Sign In</Components.Button>
//           </Components.Form>
//         </Components.SignInContainer>
//         <Components.OverlayContainer signingIn={signIn}>
//           <Components.Overlay signingIn={signIn}>
//             <Components.LeftOverlayPanel signingIn={signIn}>
//               <Components.Title id="signInTitle">Welcome Back!</Components.Title>
//               <Components.Paragraph>
//                 To keep connected with us please login with your personal info
//               </Components.Paragraph>
//               <Components.GhostButton onClick={() => toggle(true)}>
//                 Sign In
//               </Components.GhostButton>
//             </Components.LeftOverlayPanel>
//             <Components.RightOverlayPanel signingIn={signIn}>
//               <Components.Title id="signInTitle">Hello, Friend!</Components.Title>
//               <Components.Paragraph>
//                 Enter your personal details and start journey with us
//               </Components.Paragraph>
//               <Components.GhostButton onClick={() => toggle(false)}>
//                 Sign Up
//               </Components.GhostButton>
//             </Components.RightOverlayPanel>
//           </Components.Overlay>
//         </Components.OverlayContainer>
//       </Components.Container>
//     </div>
//   );
// }


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as Components from "./Components";
import "./styles.css";

// const API_BASE_URL = "http://localhost:8081/Admin";
const API_SIGNUP = "http://localhost:8080/Admin/add-admin";
const API_LOGIN = "http://localhost:8080/Admin/login";

export default function SignIn() {
  const [signIn, toggle] = useState(true);
  const [formData, setFormData] = useState({ name: "", password: ""});
  const navigate = useNavigate();

  console.log(localStorage);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_SIGNUP, formData);
      alert("Admin signed up successfully! Please log in.");
    } catch (error) {
      alert("Signup failed: " + error.response?.data?.message);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_LOGIN, { adminName: formData.adminName, adminPass: formData.adminPass });
      console.log("signin",response);
      localStorage.setItem("token", response.data);
      alert("Login Successful! Redirecting...");
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed please try again with correct credentials");
    }
  };

  return (
    <div className="cards">
      <Components.Container>
        <Components.SignUpContainer signingIn={signIn}>
          <Components.Form onSubmit={handleSignUp}>
            <Components.Title>Create Account</Components.Title>
            <Components.Input type="text" name="adminName" placeholder="Name" onChange={handleChange} required />
            {/* <Components.Input type="email" name="email" placeholder="Email" onChange={handleChange} required /> */}
            <Components.Input type="password" name="adminPass" placeholder="Password" onChange={handleChange} required />
            {/* <Components.Input type="text" name="secretKey" placeholder="Admin Secret Key" onChange={handleChange} required /> */}
            <Components.Button type="submit">Sign Up</Components.Button>
          </Components.Form>
        </Components.SignUpContainer>
        <Components.SignInContainer signingIn={signIn}>
          <Components.Form onSubmit={handleSignIn}>
            <Components.Title>Sign in</Components.Title>
            <Components.Input type="text" name="adminName" placeholder="User Name" onChange={handleChange} required />
            <Components.Input type="password" name="adminPass" placeholder="Password" onChange={handleChange} required />
            <Components.Anchor href="#">Forgot your password?</Components.Anchor>
            <Components.Button type="submit">Sign In</Components.Button>
          </Components.Form>
        </Components.SignInContainer>
        <Components.OverlayContainer signingIn={signIn}>
          <Components.Overlay signingIn={signIn}>
            <Components.LeftOverlayPanel signingIn={signIn}>
              <Components.Title>Welcome Back!</Components.Title>
              <Components.Paragraph>To keep connected with us please login with your personal info</Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(true)}>Sign In</Components.GhostButton>
            </Components.LeftOverlayPanel>
            <Components.RightOverlayPanel signingIn={signIn}>
              <Components.Title>Hello, Friend!</Components.Title>
              <Components.Paragraph>Enter your personal details and start journey with us</Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(false)}>Sign Up</Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </div>
  );
}
