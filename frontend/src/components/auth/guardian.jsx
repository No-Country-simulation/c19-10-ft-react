import { useEffect } from "react";
import { useRouter } from "next/router";
import { checkTokenExpiration } from "./auth";
import Swal from "sweetalert2";

const Guardian = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const handleTokenCheck = async () => {
        const isValid = await checkTokenExpiration();
        if (!isValid) {
          Swal.fire({
            icon: "error",
            title: "Su sesión expiró",
            text: "Su sesión expiró por favor vuelva a ingresar sus credenciales",
            timer: 3000,
            showConfirmButton: false,
          }).then(() => {
            router.push("/login");
          });
        }
      };

      handleTokenCheck();
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};

export default Guardian;
