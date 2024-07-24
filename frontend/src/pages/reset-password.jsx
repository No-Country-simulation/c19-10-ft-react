import React from "react";
import ResetPassword from "../components/ResetPassword";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";

const ResetPasswordPage = () => {
  const router = useRouter();
  const { token } = router.query;
  const decoded = jwtDecode(token);

  const checkTokenExpiration = () => {
    if (decoded.exp * 1000 < Date.now()) {
      return false;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {!token || !checkTokenExpiration() ? (
        <p className="text-red-500">
          El token de restablecimiento de contraseña es inválido.
        </p>
      ) : (
        <ResetPassword />
      )}
    </div>
  );
};

export default ResetPasswordPage;
