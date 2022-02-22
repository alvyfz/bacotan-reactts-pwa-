import { parseCookies } from "nookies";
import "./Message.css";
import moment from "moment";

interface MessageInterface {
  user_id: string;
  message: string;
  time: any;
  username: string;
}
const MessageBubble = (message: MessageInterface) => {
  const auth: string = parseCookies().auth;

  return (
    <>
      {" "}
      {auth === message.user_id ? (
        <>
          {" "}
          <p className="from-me margin-b_none">
            {" "}
            {message.message} <br />
            <span className="time-chat">{moment(message.time).calendar()}</span>
          </p>
        </>
      ) : (
        <>
          <p className="from-them margin-b_none ">
            {" "}
            <span className="name-chat">{message.username}</span> <br />
            {message.message}
            <br />
            <span className="time-chat">{moment(message.time).calendar()}</span>
          </p>{" "}
        </>
      )}
    </>
  );
};

export default MessageBubble;
