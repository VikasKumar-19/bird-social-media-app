import React, { FC, PropsWithChildren, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthWrapper";

const PrivateRoute: FC<PropsWithChildren> = (props) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

  if(!user){
    return <h2>loading...</h2>
  }

  return <>{props.children}</>;
};

export default PrivateRoute;
