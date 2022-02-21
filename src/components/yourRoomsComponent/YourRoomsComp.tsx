import { FC, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { CircularProgress } from "@mui/material";
import { useQuery } from "@apollo/client";
import { QUERY_LIST_ROOM } from "../../helper/QueryGQL";
import Logo from "../svg/logo";
import "./YourRooms.css";
import { parseCookies } from "nookies";
import { Link, useNavigate } from "react-router-dom";
import iconGroup from "../svg/iconGroup.jpg";
import Swal from "sweetalert2";

const YourRoomsComp: FC = () => {
  const Navigate: any = useNavigate();
  const auth: string = parseCookies().auth;
  const { data, loading, error } = useQuery(QUERY_LIST_ROOM, {
    variables: { user_id: auth },
  });
  const DataList: any = data?.room_users;

  useEffect(() => {
    if (!auth) {
      Navigate("/hallo");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  useEffect(() => {
    if (error) {
      Swal.fire("The Internet?", "That thing is still around?", "question");
    }
  }, [error]);
  const ListData = () => {
    if (DataList !== undefined) {
      return DataList?.map((v: any, i: number) => {
        return (
          <>
            {" "}
            <ListItem
              alignItems="flex-start"
              key={i}
              component={Link}
              to={`/chat?key=${v.room.id}`}
            >
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={iconGroup} />
              </ListItemAvatar>
              <p>{v.room.name}</p>
            </ListItem>
            <Divider variant="inset" component="li" />
          </>
        );
      });
    }
  };

  return (
    <>
      <p>
        <Logo />
      </p>
      {loading ? (
        <CircularProgress className="loadingStyle" color="primary" />
      ) : (
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {ListData()}
        </List>
      )}
    </>
  );
};

export default YourRoomsComp;
