import React from "react";
import moment from "moment";
import "./external.css";
import { useMovieContext } from "./Context";
const RenderChats = ({ selectedFriend }) => {
  const { profile } = useMovieContext();
  return (
    <div className="mainchat">
      <div className="horizontal-scroll-container chatpage">
        {selectedFriend?.chats?.map((chat, index) => {
          const currentDate = moment(chat.time).format("MM-DD-YYYY");
          const prevChat = selectedFriend?.chats?.[index - 1];
          const prevDate = prevChat
            ? moment(prevChat.time).format("MM-DD-YYYY")
            : null;
          const showDate = currentDate !== prevDate;
          return (
            <div key={index}>
              {showDate && (
                <div className="chat-date container">
                  {currentDate === moment().format("MM-DD-YYYY")
                    ? "Today"
                    : currentDate ===
                      moment().subtract(1, "days").format("MM-DD-YYYY")
                    ? "Yesterday"
                    : moment(chat.time).format("MM/DD/YYYY")}
                </div>
              )}
              <div
                className={`friend-message ${
                  chat.name === profile.username ? "right" : "left"
                }`}
                style={{
                  textAlign: chat.name === profile.username ? "right" : "left",
                }}
              >
                <div
                  className="message-content"
                  style={{
                    display: "flex",
                    flexDirection:
                      chat.name === profile.username ? "row-reverse" : "row",
                    alignItems: "center",
                  }}
                >
                  <span
                    className="customBox card"
                    style={{
                      backgroundColor:
                        chat.name === profile.username ? "#d9fdd3" : "white",
                    }}
                  >
                    {chat.message}

                    <div className="chatTime">
                      <span className="message-time messagetime">
                        {moment(chat.time).format("h:mm a")}
                      </span>
                      {chat.name === profile.username && (
                        <i className="fas fa-check message-check"></i>
                      )}
                    </div>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default RenderChats;
