import { Container, Button, Grid } from "@mui/material";
import { FC } from "react";
import Logo from "../../components/svg/logo";
import "./FirstPage.css";
import { Link } from "react-router-dom";
const FirstPage: FC = () => {
  return (
    <>
      <Container className="conFP">
        <div className="brandFP">
          {" "}
          <Logo />{" "}
        </div>
        <p className="textFP">
          Ayo bergabung dengan temanmu dan bacotin semua bacotanmu di percakapan
          grup.
        </p>
        <Grid container justifyContent="center">
          <Grid md={10} xs={10}>
            {" "}
            <Button
              component={Link}
              to="/login"
              className="buttonFP"
              variant="contained"
              color="primary"
            >
              Masuk / Daftar
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default FirstPage;
