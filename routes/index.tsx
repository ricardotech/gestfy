import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import UserRoutes from "./user.routes";
import AuthRoutes from "./auth.routes";
import Loading from "../pages/Loading";
import { useServices } from "../contexts/Services";
import Onboarding from "../pages/User/Onboarding";

export default function Routes() {
  const { user, workspaces } = useServices();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, []);

  if (loading) return <Loading />;

  return user ? workspaces ? <UserRoutes /> : <Onboarding /> : <AuthRoutes />;
}
