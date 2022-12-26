import React from "react";
import SignupLoginForm from "../../components/admin/SignupLoginForm";

function signup() {
  return (
    <div>
      <SignupLoginForm
        formType="signup"
        submissionRoute="/admin"
        redirect="/admin/login"
      />
    </div>
  );
}

export default signup;
