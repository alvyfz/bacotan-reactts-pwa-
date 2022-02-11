import { Grid, Button, TextField } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import "./SignupComp.css";
import Swal from "sweetalert2";
import { useMutation } from "@apollo/client";
import { QUERY_SIGNUP } from "../../helper/QueryGQL";
import LoadingButton from "@mui/lab/LoadingButton";
// import SaveIcon from "@mui/icons-material/Save";

interface FormLogin {
  value: string;
  isError: boolean;
  errorMessage: string | null;
}

const SignupComponent: FC = () => {
  const [SignupInsert, { data, loading: loadingM, error: errorM }] =
    useMutation(QUERY_SIGNUP, {
      onError(error) {
        console.log(error);
      },
    });

  const [username, setUsername] = useState<FormLogin>({
    value: "",
    isError: false,
    errorMessage: null,
  });
  const [password, setPassword] = useState<FormLogin>({
    value: "",
    isError: false,
    errorMessage: null,
  });

  const RegexUsername: RegExp = /^[a-z0-9_.]{5,15}$/;
  const RegexPassword: RegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,15}$/;

  const HandleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!RegexUsername.test(e.target.value)) {
      setUsername({
        ...username,
        value: e.target.value,
        isError: true,
        errorMessage: "Username harus memiliki panjang 5-15",
      });
    } else {
      setUsername({
        ...username,
        value: e.target.value,
        isError: false,
        errorMessage: null,
      });
    }
  };
  const HandlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!RegexPassword.test(e.target.value)) {
      setPassword({
        ...password,
        value: e.target.value,
        isError: true,
        errorMessage:
          "Password harus memiliki panjang 8-15, huruf besar, huruf kecil dan angka",
      });
    } else {
      setPassword({
        ...password,
        value: e.target.value,
        isError: false,
        errorMessage: null,
      });
    }
  };
  const HandleSubmitSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password.isError || username.isError) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Format salah!",
      });
    } else {
      SignupInsert({
        variables: {
          object: {
            username: username.value,
            password: password.value,
          },
        },
      });
    }
  };

  useEffect(() => {
    if (errorM) {
      Swal.fire({
        icon: "error",
        title: "Sorry :(",
        text: "Username sudah digunakan, tolong ubah usernamenya!",
      });
    }
  }, [errorM]);

  useEffect(() => {
    if (data !== undefined) {
      setUsername({
        ...username,
        value: "",
        isError: false,
        errorMessage: null,
      });
      Swal.fire("Daftar sukses!", "Sekarang kamu bisa login!");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      <Grid container justifyContent="center">
        <Grid md={10} xs={12}>
          <form onSubmit={HandleSubmitSignUp}>
            <div className="margintd">
              <TextField
                className="inputSignup"
                required
                id="outlined-required"
                label="Username"
                onChange={HandleUsername}
                value={username.value}
                error={username.isError}
                helperText={username.errorMessage}
              />
            </div>
            <div className="margintd">
              <TextField
                required
                id="outlined-required"
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={HandlePassword}
                className="inputSignup"
                value={password.value}
                error={password.isError}
                helperText={password.errorMessage}
              />{" "}
            </div>
            {loadingM ? (
              <LoadingButton
                loading
                className="buttonFP buttonSign"
                variant="contained"
                color="primary"
              >
                Daftar
              </LoadingButton>
            ) : (
              <Button
                className="buttonFP buttonSign"
                variant="contained"
                color="primary"
                type="submit"
              >
                Daftar
              </Button>
            )}
          </form>
        </Grid>
      </Grid>
    </>
  );
};
export default SignupComponent;
