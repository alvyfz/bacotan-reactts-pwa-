import { FC, useState, useRef, useEffect } from "react";
import {
  Box,
  Paper,
  BottomNavigation,
  BottomNavigationAction,
  Container,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import "./Home.css";
import RoomsComp from "../../components/roomsComponent/RoomsComp";
import { useNavigate } from "react-router-dom";
import { parseCookies } from "nookies";
import YourRoomsComp from "../../components/yourRoomsComponent/YourRoomsComp";

const Home: FC = () => {
  const Navigate: any = useNavigate();
  const auth: string = parseCookies().auth;
  const [value, setValue] = useState<number>(2);
  const ref = useRef<any | null>(null);

  useEffect(() => {
    if (!auth) {
      Navigate("/hallo");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
  }, [value]);

  const renderSwitch: any = (value: number) => {
    switch (value) {
      case 2:
        return <YourRoomsComp />;
      default:
        return <RoomsComp />;
    }
  };
  return (
    <>
      <Container className="containerHome">
        <Box sx={{ pb: 7 }} ref={ref}>
          {renderSwitch(value)}
          <Paper
            sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
            elevation={3}
          >
            <BottomNavigation
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            >
              <BottomNavigationAction
                value={1}
                label="Rooms"
                icon={<AddBoxIcon fontSize="large" />}
                color="primary"
              />
              <BottomNavigationAction
                value={2}
                label="Your Room"
                icon={<ChatBubbleIcon fontSize="large" />}
                color="primary"
              />
            </BottomNavigation>
          </Paper>
        </Box>
      </Container>
    </>
  );
};

export default Home;
