import { Suspense } from "react";
import Register from "../../../components/Auth/Register";
import Loading from "@/app/loading";


const RegisterPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Register />
    </Suspense> 
  );
};

export default RegisterPage;
