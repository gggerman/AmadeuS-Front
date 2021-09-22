import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export let headers;

function GetHeaders() {
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();
  console.log('user en GetHeaders', user)
  if (user) {
    const setHeaders = async () => {
      const token = isAuthenticated && (await getAccessTokenSilently());
      console.log('toke', token)
      return (headers = {
        authorization: `Bearer ${token}`,
        email: user?.email,
      });
    };

    setHeaders();
  }

  return <></>
}

export default GetHeaders;
