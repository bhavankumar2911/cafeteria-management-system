import React from "react";
import SignupLoginForm from "../../components/admin/SignupLoginForm";

function signup() {
  return (
    <div>
      <SignupLoginForm
        formType="login"
        submissionRoute="/admin/login"
        redirect="/admin/dashboard"
      />
    </div>
  );
}

export default signup;
