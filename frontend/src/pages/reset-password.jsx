import React from "react";
import ResetPassword from "../components/ResetPassword";
import { useRouter } from "next/router";

const ResetPasswordPage = () => {
  const router = useRouter();
  const { token } = router.query;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {token ? (
        <ResetPassword />
      ) : (
        <p className="text-red-500">
          El token de restablecimiento de contraseña es inválido.
        </p>
      )}
    </div>
  );
};

export default ResetPasswordPage;
