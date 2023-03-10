/* eslint-disable react/jsx-no-useless-fragment */
import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../../providers/UserContext";

function ProtectedRoutes() {
  const navigate = useNavigate();
  const { logged } = useContext(UserContext);

  useEffect(() => {
    if (!logged) {
      navigate("/");
    }
  }, []);

  return (
    <>
      {logged ? <Outlet /> : null}
    </>
  )
}

export default ProtectedRoutes;