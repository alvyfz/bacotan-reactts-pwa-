import { Grid, Button, TextField } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
// import "./SignupComp.css";
import Swal from "sweetalert2";
import { useLazyQuery } from "@apollo/client";
import { QUERY_LOGIN } from "../../helper/QueryGQL";
import LoadingButton from "@mui/lab/LoadingButton";
import { setCookie } from "nookies";
import { useNavigate } from "react-router-dom";

const LoginComponent: FC = () => {
  const [doLogin, { data: dataLogin, loading: loadingLogin }] =
    useLazyQuery(QUERY_LOGIN);
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (dataLogin?.users.length > 0) {
      setCookie(null, "auth", dataLogin?.users[0].id, {
        maxAge: 4 * 60 * 60,
      });
      Swal.fire(
        "Login success!",
        "Sekarang kamu bisa bacotan bersama temanmu!",
        "success"
      );
      navigate("/");
    }
    if (dataLogin?.users.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email atau Password salah!",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataLogin]);

  const HandleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const HandleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const HandleSubmitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    doLogin({
      variables: {
        username: username.toLowerCase(),
        password: password,
      },
    });
    setPassword("");
  };

  return (
    <>
      <Grid container justifyContent="center">
        <Grid md={10} xs={12}>
          <form onSubmit={HandleSubmitLogin}>
            <div className="margintd">
              <TextField
                className="inputSignup"
                required
                id="outlined-required"
                label="Username"
                onChange={HandleChangeUsername}
                value={username}
              />
            </div>
            <div className="margintd">
              <TextField
                required
                id="outlined-required"
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={HandleChangePassword}
                className="inputSignup"
                value={password}
              />{" "}
            </div>
            {loadingLogin ? (
              <LoadingButton
                loading
                className="buttonFP buttonSign"
                variant="contained"
                color="primary"
              >
                Login
              </LoadingButton>
            ) : (
              <Button
                className="buttonFP buttonSign"
                variant="contained"
                color="primary"
                type="submit"
              >
                Login
              </Button>
            )}
          </form>
        </Grid>
      </Grid>
    </>
  );
};
export default LoginComponent;
