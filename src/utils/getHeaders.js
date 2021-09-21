import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export let headers;

function GetHeaders() {
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();

  const setHeaders = async () => {
    const token = isAuthenticated && (await getAccessTokenSilently());

    return (headers = {
      authorization: `Bearer ${token}`,
      email: user?.email,
    });
  };

  setHeaders();

  return <div></div>;
}

export default GetHeaders;
