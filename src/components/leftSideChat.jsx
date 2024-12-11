import React from "react";
import moment from "moment";
import "./external.css";
import image from "./image.png";
import { useMovieContext } from "./Context";
import { useFrendsList } from "../hooks/useFriendsList";
const LeftChat = ({
  filteredFriends,
  handleUsernameClick,
  showgroup,
  showingbutton,
  showingChat,
}) => {
  const { profile } = useMovieContext();
  const { deleteRequest, acceptFrnd } = useFrendsList();
  const handleDelete = async (e, item) => {
    e.preventDefault();
    try {
      await deleteRequest({ _id: item._id });
    } catch (error) {
      toast.error("Error deleting request:", error);
    }
  };
  const handleAccept = async (e, item) => {
    e.preventDefault();
    try {
      await acceptFrnd(item);
    } catch (error) {
      toast.error("Error accepting request:", error);
    }
  };
  return (
    <>
      {showingChat && (
        <div>
          {filteredFriends?.map((friend, index) => (
            <div key={index} style={{ height: "fit-content" }}>
              <div className="customDiv">
                <div
                  className="friend-container"
                  onClick={() => {
                    handleUsernameClick(friend);
                  }}
                >
                  <div className="name">
                    <img
                      src={image}
                      alt={friend?.username}
                      className="friend-images"
                    />
                  </div>
                  <div className="friendss">
                    <div className="friend-info">
                      <div className="d-flex flex-column mb-2">
                        <span className="customSpan">
                          {profile?.username === friend?.user_from_name
                            ? friend?.user_to_name
                            : friend?.user_from_name}
                          {friend[profile?.username] !== 0 && (
                            <span
                              style={{
                                color:
                                  friend[profile?.username] > 0
                                    ? "green"
                                    : "red",
                              }}
                            >
                              ({friend[profile?.username]})
                            </span>
                          )}
                        </span>
                        {friend?.isFrend && friend?.chats?.length > 0 && (
                          <span
                            className="friend-message"
                            style={{
                              color: "gray",
                            }}
                          >
                            <i
                              className="fas fa-check"
                              style={{ marginLeft: "11px" }}
                            ></i>
                            <span style={{ marginLeft: "3px" }}>
                              {friend.chats[friend.chats.length - 1].message
                                .length > 10
                                ? friend.chats[
                                    friend.chats.length - 1
                                  ].message.substring(0, 10) + "......"
                                : friend.chats[friend.chats.length - 1].message}
                            </span>
                          </span>
                        )}
                      </div>
                      {friend?.isFrend && friend?.chats?.length > 0 && (
                        <div className="friendDiv">
                          <h6 className="customH6">
                            {(() => {
                              const lastChatTime = moment(
                                friend.chats
                                  .sort(
                                    (a, b) =>
                                      new Date(a.time) - new Date(b.time)
                                  )
                                  .slice(-1)[0].time
                              );
                              if (lastChatTime.isSame(moment(), "day")) {
                                return lastChatTime.format("h:mm a");
                              } else if (
                                lastChatTime.isSame(
                                  moment().subtract(1, "days"),
                                  "day"
                                )
                              ) {
                                return "Yesterday";
                              } else {
                                return lastChatTime.format("MM/DD/YYYY");
                              }
                            })()}
                          </h6>
                        </div>
                      )}
                      {!friend?.isFrend && (
                        <div className="customStyle">
                          {profile.username === friend?.user_from_name ? (
                            <div className="buttons123">
                              <span style={{ color: "gray" }}>Requested</span>
                              <div>
                                <button
                                  onClick={(e) => handleDelete(e, friend)}
                                  className="btn btn-danger user"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="accepted">
                              <button
                                className="btn btn-primary"
                                onClick={(e) => handleAccept(e, friend)}
                              >
                                Confirm
                              </button>
                              <button
                                className="btn btn-danger"
                                onClick={(e) => handleDelete(e, friend)}
                                style={{ width: "80px" }}
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <br />
              </div>
            </div>
          ))}
        </div>
      )}
      {/* {showingbutton && showgroup()} */}
    </>
  );
};

export default LeftChat;
