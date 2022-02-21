import {
  Avatar,
  Button,
  Container,
  Grid,
  TextField,
  Fade,
  Modal,
  Box,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import Message from "../../components/message/Message";
import "./Chat.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import iconGroup from "../../components/svg/iconGroup.jpg";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_ROOM_BY_ID, QUERY_SEND_CHAT } from "../../helper/QueryGQL";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import SendIcon from "@mui/icons-material/Send";
import { parseCookies } from "nookies";

interface ModalDetailObject {
  name: string;
  description: string;
  onEdit: boolean;
  id: string;
}

const Chat: FC = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const auth: string = parseCookies().auth;
  const idRoom = query.get("key");
  const [modalDetail, setModalDetail] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [stateInDetail, setStateInDetail] = useState<ModalDetailObject>({
    name: "",
    description: "",
    onEdit: false,
    id: "",
  });
  const { data, error } = useQuery(QUERY_ROOM_BY_ID, {
    variables: { id: idRoom },
  });
  const [sendMessage, { error: errorMessage }] = useMutation(QUERY_SEND_CHAT, {
    onError(error) {
      Swal.fire("The Internet?", "That thing is still around?", "question");
    },
  });
  const dataRoom = data?.room_by_pk;
  useEffect(() => {
    setStateInDetail({
      ...stateInDetail,
      name: dataRoom?.name,
      description: dataRoom?.description || "Tidak ada deskripsi",
      id: dataRoom?.id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataRoom]);
  useEffect(() => {
    if (error || errorMessage) {
      Swal.fire("The Internet?", "That thing is still around?", "question");
    }
  }, [error, errorMessage]);

  const HandleSendMessage: any = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage({
      variables: {
        room_id: idRoom,
        message: message,
        user_id: auth,
      },
    });
    setMessage("");
  };

  const HandleChangeMessage: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  const handleOpenDetail: any = () => setModalDetail(true);
  const handleCloseDetail: any = () => setModalDetail(false);
  const handleButtonEdit: any = () =>
    setStateInDetail({ ...stateInDetail, onEdit: true });
  const HandleChangeNameRoom: any = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStateInDetail({ ...stateInDetail, name: e.target.value });
  };
  const HandleChangeRoomDesc: any = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStateInDetail({ ...stateInDetail, description: e.target.value });
  };

  return (
    <>
      <Container className="container-chat">
        <Grid container className="grid-head-chat">
          <Grid xs={1}>
            <Link to="/">
              {" "}
              <ArrowBackIcon fontSize="large" />
            </Link>
          </Grid>
          <Grid xs={1}>
            {" "}
            <Avatar
              alt="avatar"
              src={iconGroup}
              onClick={handleOpenDetail}
            />{" "}
          </Grid>
          <Grid xs={10}>
            {dataRoom.name ? (
              <div onClick={handleOpenDetail} className="name-room">
                {dataRoom?.name || "Loading..."}
              </div>
            ) : (
              <div className="name-room">"Loading..."</div>
            )}
          </Grid>
        </Grid>{" "}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={modalDetail}
          onClose={handleCloseDetail}
          closeAfterTransition
        >
          <Fade in={modalDetail}>
            <Box className="boxModal">
              <Grid container justifyContent="center">
                <Grid xs={10} className="gridRooms">
                  <form onSubmit={() => {}}>
                    <div className="margintd">
                      <TextField
                        className="inputSignup"
                        aria-readonly={true}
                        required
                        variant="standard"
                        label="Kode"
                        value={stateInDetail.id}
                      />
                    </div>
                    <div className="margintd">
                      <TextField
                        className="inputSignup"
                        disabled={true}
                        required
                        variant="standard"
                        label="Nama room"
                        onChange={HandleChangeNameRoom}
                        value={stateInDetail.name}
                      />
                    </div>
                    <div className="margintd">
                      <TextField
                        className="inputSignup"
                        variant="standard"
                        required
                        disabled={true}
                        multiline={true}
                        label="Deskripsi room"
                        onChange={HandleChangeRoomDesc}
                        value={stateInDetail.description}
                      />
                      {stateInDetail.onEdit ? (
                        <div>*Sekarang kamu bisa ubah form diatas! ...</div>
                      ) : null}
                    </div>
                    {stateInDetail.onEdit ? (
                      <>
                        <Button
                          className="buttonFP buttonSign"
                          variant="contained"
                          color="secondary"
                          type="submit"
                        >
                          Edit
                        </Button>
                      </>
                    ) : (
                      <Button
                        className="buttonFP buttonSign"
                        variant="contained"
                        color="primary"
                        onClick={handleButtonEdit}
                      >
                        Edit
                      </Button>
                    )}
                  </form>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        </Modal>
        <Message />{" "}
        <form onSubmit={HandleSendMessage}>
          <Grid container>
            <Grid xs={11}>
              <TextField
                required
                autoFocus={true}
                size="small"
                fullWidth={true}
                variant="outlined"
                placeholder="Ketikan bacotanmu disini..."
                value={message}
                onChange={HandleChangeMessage}
              />
            </Grid>
            <Grid xs={1}>
              <Button type="submit" className="button-send-chat">
                {" "}
                <SendIcon fontSize="medium" />{" "}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
};
export default Chat;
