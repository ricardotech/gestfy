import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import UserRoutes from "./user.routes";
import AuthRoutes from "./auth.routes";
import Loading from "../pages/Loading";
import { useAuth } from "../contexts/Auth";

export default function Routes() {
  const { user } = useAuth();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  if (loading) return <Loading />;

  return user ? <UserRoutes /> : <AuthRoutes />;
}
