import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {useSelector, useDispatch} from "react-redux";
import {logout} from "../slices/auth";

export const AuthGuard = (props) => {
  const {children} = props;
  const auth = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);

  const isAuthenticated = auth.isAuthenticated;

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (!auth.isAuthenticated) {
      router.push({
        pathname: "/login",
        query: {returnUrl: router.asPath},
      }).catch(console.error);
    } else {
      const tokenExpirationTime = getTokenExpirationTime();
      if (tokenExpirationTime && tokenExpirationTime <= Date.now() / 1000) {
        // Token is expired, logout user and redirect to login
        dispatch(logout());
        router.push({
          pathname: "/login",
          query: {returnUrl: router.asPath},
        }).catch(console.error);
      } else {
        setChecked(true);
      }
    }
  }, [router.isReady, auth.isAuthenticated, router, dispatch]);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};


const getTokenExpirationTime = () => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    return null;
  }

  try {
    const tokenPayload = JSON.parse(atob(token.split('.')[1])); // Decode token payload
    const exp = tokenPayload.exp;

    return exp;
  } catch (error) {
    console.error('Error decoding token:', error);

    return null;
  }
};
