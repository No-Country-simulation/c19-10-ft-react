import { useEffect } from "react";
import { useRouter } from "next/router";

const Guardian = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
      }
    }, []);
    return <WrappedComponent {...props} />;
  };
};

export default Guardian;
