import { FC, useState, useEffect } from "react";
import "./RoomsComp.css";
import {
  Container,
  Grid,
  Button,
  Modal,
  Fade,
  Box,
  TextField,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useMutation } from "@apollo/client";
import Logo from "../svg/logo";
import { QUERY_CREATE_ROOM, QUERY_JOIN_ROOM } from "../../helper/QueryGQL";
import Swal from "sweetalert2";
import { parseCookies } from "nookies";

const RoomsComp: FC = () => {
  const auth: string = parseCookies().auth;
  const [joinRoom, { data: dataJoin, loading: loadingJoin, error: errorJoin }] =
    useMutation(QUERY_JOIN_ROOM, {
      onError(error) {
        Swal.fire("The Internet?", "That thing is still around?", "question");
      },
    });
  const [
    joinRoom2,
    { data: dataJoin2, loading: loadingJoin2, error: errorJoin2 },
  ] = useMutation(QUERY_JOIN_ROOM, {
    onError(error) {
      Swal.fire("The Internet?", "That thing is still around?", "question");
    },
  });
  const [
    createRoom,
    { data: dataCreate, loading: loadingCreate, error: errorCreate },
  ] = useMutation(QUERY_CREATE_ROOM, {
    onError(error) {
      Swal.fire("The Internet?", "That thing is still around?", "question");
    },
  });

  const [modalJoin, setModalJoin] = useState<boolean>(false);
  const [modalCreate, setModalCreate] = useState<boolean>(false);
  const [kode, setKode] = useState<string>("");
  const [roomName, setRoomName] = useState<string>("");
  const [roomDesc, setRoomDesc] = useState<string>("");
  const handleOpenJoin: any = () => setModalJoin(true);
  const handleCloseJoin: any = () => setModalJoin(false);
  const handleOpenCreate: any = () => setModalCreate(true);
  const handleCloseCreate: any = () => setModalCreate(false);

  useEffect(() => {
    if (errorJoin) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Kode yang kamu masukan salah atau kamu sudah masuk room ini!",
      });
    }
    setModalJoin(false);
  }, [errorJoin]);
  useEffect(() => {
    if (dataJoin !== undefined) {
      Swal.fire(
        "Join Sukses!",
        "Kamu bisa mulai bacotin di Your Room",
        "success"
      );
      window.location.reload();
      setModalJoin(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataJoin]);
  useEffect(() => {
    if (errorCreate) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Somthing wrong!",
      });
    }
    setModalCreate(false);
  }, [errorCreate]);
  useEffect(() => {
    if (dataCreate !== undefined) {
      joinRoom2({
        variables: {
          room_id: dataCreate.insert_room_one.id,
          user_id: auth,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataCreate]);
  useEffect(() => {
    if (errorJoin2) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something wrong!",
      });
      setModalCreate(false);
    }
  }, [errorJoin2]);
  useEffect(() => {
    if (dataJoin2 !== undefined) {
      Swal.fire(
        "Buat room sukses, copy kode dibawah dan share ke temanmu!",
        `${dataCreate?.insert_room_one.id}`,
        "success"
      );

      window.location.reload();

      setModalCreate(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataJoin2]);
  const HandleChangeKode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKode(e.target.value);
  };
  const HandleChangeRoomName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomName(e.target.value);
  };
  const HandleChangeRoomDesc = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomDesc(e.target.value);
  };

  const handleJoinRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    joinRoom({
      variables: {
        room_id: kode,
        user_id: auth,
      },
    });
    setKode("");
  };

  const handleCreateRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createRoom({
      variables: {
        name: roomName,
        description: roomDesc,
      },
    });
    setRoomName("");
  };
  return (
    <>
      <p>
        <Logo />{" "}
      </p>

      <Container className="containerRooms">
        <Grid container justifyContent="center">
          <Grid xs={8} className="gridRooms">
            <h3>Join room yang telah dibuatkan temanmu!</h3>
            <Button
              className="buttonFP buttonSign"
              variant="contained"
              color="primary"
              onClick={handleOpenJoin}
            >
              Join room
            </Button>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={modalJoin}
              onClose={handleCloseJoin}
              closeAfterTransition
            >
              <Fade in={modalJoin}>
                <Box className="boxModal">
                  <Grid container justifyContent="center">
                    <Grid xs={10} className="gridRooms">
                      <h3>
                        Masukan kode room yang didapatkan dari teman kamu!
                      </h3>
                      <form onSubmit={handleJoinRoom}>
                        <div className="margintd">
                          <TextField
                            className="inputSignup"
                            required
                            id="outlined-required"
                            label="Kode"
                            onChange={HandleChangeKode}
                            value={kode}
                          />
                        </div>

                        {loadingJoin ? (
                          <LoadingButton
                            loading
                            className="buttonFP buttonSign"
                            variant="contained"
                            color="primary"
                          >
                            Join
                          </LoadingButton>
                        ) : (
                          <Button
                            className="buttonFP buttonSign"
                            variant="contained"
                            color="primary"
                            type="submit"
                          >
                            Join
                          </Button>
                        )}
                      </form>
                    </Grid>
                  </Grid>
                </Box>
              </Fade>
            </Modal>
            <br />
            <br />
            <h3>Ingin membuat room untuk bacotanmu?</h3>
            <Button
              className="buttonFP buttonSign"
              variant="contained"
              color="primary"
              onClick={handleOpenCreate}
            >
              Buat room
            </Button>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={modalCreate}
              onClose={handleCloseCreate}
              closeAfterTransition
            >
              <Fade in={modalCreate}>
                <Box className="boxModal">
                  <Grid container justifyContent="center">
                    <Grid xs={10} className="gridRooms">
                      <h3>
                        Buat room untuk memulai bacotanmu dan share kode agar
                        temanmu bisa join ke room kamu!
                      </h3>
                      <form onSubmit={handleCreateRoom}>
                        <div className="margintd">
                          <TextField
                            className="inputSignup"
                            required
                            id="outlined-required"
                            label="Nama room"
                            onChange={HandleChangeRoomName}
                            value={roomName}
                          />
                        </div>
                        <div className="margintd">
                          <TextField
                            className="inputSignup"
                            required
                            id="outlined-required"
                            label="Deskripsi room"
                            onChange={HandleChangeRoomDesc}
                            value={roomDesc}
                          />
                        </div>
                        {loadingCreate || loadingJoin2 ? (
                          <LoadingButton
                            loading
                            className="buttonFP buttonSign"
                            variant="contained"
                            color="primary"
                          >
                            Buat
                          </LoadingButton>
                        ) : (
                          <Button
                            className="buttonFP buttonSign"
                            variant="contained"
                            color="primary"
                            type="submit"
                          >
                            Buat
                          </Button>
                        )}
                      </form>
                    </Grid>
                  </Grid>
                </Box>
              </Fade>
            </Modal>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default RoomsComp;
