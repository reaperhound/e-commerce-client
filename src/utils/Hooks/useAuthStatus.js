import { useEffect } from "react";
import { useState } from "react";
import { getUserFromLocal } from "../JWT";

function useAuthStatus() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    let user = getUserFromLocal();

    if (!user) {
      setAuthenticated(false);
    } else {
      setAuthenticated(true);
    }
  }, []);

  return authenticated;
}

export default useAuthStatus