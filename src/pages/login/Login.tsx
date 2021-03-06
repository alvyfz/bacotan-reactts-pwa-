import { Container } from "@mui/material";
import { FC, SetStateAction, useState } from "react";
import Logo from "../../components/svg/logo";
import "./Login.css";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import SignupComponent from "../../components/signupComponent/SignupComponent";
import LoginComponent from "../../components/loginComponent/LoginComponent";

const Login: FC = () => {
  const [valueTabs, setValueTabs] = useState("1");
  const handleChangeValueTabs = (
    event: any,
    newValue: SetStateAction<string>
  ) => {
    setValueTabs(newValue);
  };

  return (
    <>
      <Container className="conFP">
        <div className="brandFP">
          {" "}
          <Logo />
          <div className="pFP">bacotin semua dengan temanmu</div>
        </div>
        <TabContext value={valueTabs}>
          <Box>
            <TabList
              onChange={handleChangeValueTabs}
              aria-label="lab API tabs example"
              centered
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab label="Masuk" value="1" />
              <Tab label="Daftar" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <LoginComponent />
          </TabPanel>
          <TabPanel value="2">
            <SignupComponent />
          </TabPanel>
        </TabContext>
      </Container>
    </>
  );
};

export default Login;
