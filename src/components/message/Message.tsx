import { useSubscription } from "@apollo/client";
import { CircularProgress, Container } from "@mui/material";
import { FC } from "react";
import { useLocation } from "react-router-dom";
import { QUERY_SUBCRIPTION_CHAT } from "../../helper/QueryGQL";
import MessageBubble from "./MessageBubble";
import "./Message.css";

const Message: FC = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const idRoom = query.get("key");
  const { data: dataMessage, loading } = useSubscription(
    QUERY_SUBCRIPTION_CHAT,
    {
      variables: { room_id: idRoom },
    }
  );
  const Data: any[] = dataMessage?.chats;
  setTimeout(() => {
    const scroll = document.getElementById("chat-message");
    if (scroll) {
      scroll.scrollTop = scroll.scrollHeight;
    }
  }, 200);

  return (
    <Container className="container-message" id="chat-message">
      <div className="imessage">
        {loading ? (
          <CircularProgress className="loadingStyle" color="primary" />
        ) : (
          <>
            {" "}
            {Data?.map((m: any) => {
              return (
                <div key={m.id}>
                  <MessageBubble
                    user_id={m.user_id}
                    time={m.created_at}
                    message={m.message}
                    username={m.user.username}
                  />
                </div>
              );
            })}
          </>
        )}
      </div>
    </Container>
  );
};

export default Message;
