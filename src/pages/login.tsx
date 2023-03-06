import SignupForm from "@/components/login/SignupForm";
import { Fragment, useState } from "react";
import LoginForm from "../components/login/LoginForm";

const LoginPage = () => {
  const [signupActive, setSignupActive] = useState<boolean>(false);

  const activateSignup = () => {
    setSignupActive(true);
  };

  const deactivateSignup = () => {
    setSignupActive(false);
  };

  return (
    <Fragment>
      {!signupActive && <LoginForm activateSignup={activateSignup} />}
      {signupActive && <SignupForm deactivateSignup={deactivateSignup} />}
    </Fragment>
  );
};

export default LoginPage;
