import "./external.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFrendsList } from "../hooks/useFriendsList";
import { useProfile } from "../hooks/useProfileDetails";
import { useMovieContext } from "./Context";
import { toast, ToastContainer } from "react-toastify";
import LeftSideView from "./leftSideView";
import "react-toastify/dist/ReactToastify.css";
import RightSideView from "./rightSideView";
import { useGroupsList } from "./../hooks/useGroupsList";
import Footer from "./footer";
import grouped from "./group.png";

function ChatForm() {
  const [showModal, setShowModal] = useState(false);
  const [newFriend, setNewFriend] = useState("");
  const [friendStatus, setFriendStatus] = useState("");
  const { friends, profile, groups } = useMovieContext();
  const {
    getFriends,
    sendRequest,
    deleteRequest,
    acceptFrnd,
    updateChat,
    updatePayment,
  } = useFrendsList();
  const { getGroups, createGroup, addPersonInGroup } = useGroupsList();
  const [showGroupChat, setShowGroupChat] = useState(false);
  const [findFriend, setFindFriend] = useState(null);
  const { getProfileByName } = useProfile();
  const [selectedFriend, setSelectedUsername] = useState(null);
  const [messaging, setMessage] = useState("");
  const [error, seterror] = useState({});
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [showPaymentMessages, setShowPaymentMessages] = useState(false);
  const [isPaymentClicked, setIsPaymentClicked] = useState(false);
  const [showingbutton, setShowingbutton] = useState(false);
  const [showingGrouping, setShowingGrouppp] = useState(false);
  const [showingGroup, setShowingGroup] = useState(false);
  const [showingButton, setShowingButton] = useState(false);
  const [showingChat, setShowingChat] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupedModel, setGroupModel] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showGroupChating, setShowGroupChatting] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [showPaymentChat, setShowPaymentChat] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showPopUpModel, setShowpopUpModel] = useState(false);
  const [fiendsList, setFriendsList] = useState([]);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleModalToggle = () => {
    setShowModal((prevShowModal) => !prevShowModal);
    setFindFriend(null);
    setIsOpen(false);
  };
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        await getFriends();
        await getGroups();
      } catch (error) {
        toast.error("Failed to fetch friends:", error);
        toast.error("Failed to fetch friends:", error);
      }
    };
    fetchFriends();
  }, []);

  const handlingSubmit = () => {
    const groupId = "some-group-id";
    const personId = groupFriend;
    setGroupFriend("");
    handleAddPerson(groupId, personId);
    setFriendsList([...fiendsList, groupFriend]);
    handleModalToggle();
  };

  const handleSendRequest = async () => {
    if (!findFriend?.owner_id) return;
    const requestObj = {
      user_to: findFriend.owner_id,
      user_to_name: findFriend.username,
    };
    try {
      const res = await sendRequest(requestObj);

      setShowModal(false);
    } catch (error) {
      if (
        error.response &&
        error.response.data === "User Already In Friends List"
      ) {
        toast.error("User Already In Friends List");
      } else {
        toast.error("Error sending request:", error);
        toast.error(`User Already In Friends List`);
      }
    }
  };

  const handleChange = (name, type) => {
    setName(name);
    setType(type);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newFriend.trim()) return;
    try {
      const res = await getProfileByName({ name: newFriend });
      setFindFriend(res);
    } catch (error) {
      toast.error("Error finding friend:", error);
      setFriendStatus("Error finding friend");
    }
    setNewFriend("");
    setMessage("");
  };

  useEffect(() => {
    if (selectedFriend) {
      const newUpadaye = friends.find(
        (item) => item._id.toHexString() === selectedFriend._id.toHexString()
      );

      setSelectedUsername(newUpadaye);
    }
  }, [friends]);
  const handleUsernameClick = (username) => {
    if (!username.isFrend) return;
    setSelectedUsername(username);
    setShowChat(true);
    setShowPaymentMessages(false);
    setSelectedGroup(false);
    setIsOpen(false);
    setShowGroupChatting(false);
    setShowPaymentChat(false);
  };
  const groupView = () => {
    setShowGroupChat(false);
    setShowGroupChatting(false);
    setShowInput(true);
    setShowPaymentChat(true);
    // setModel(true);
  };
  const chatView = () => {
    setShowGroupChat(true);
    setShowGroupChat(false);
    setShowGroupChatting(true);
  };

  const handlePaymentClick = () => {
    setShowPaymentMessages(true);
    setIsPaymentClicked(true);
  };
  const chatHandle = () => {
    setShowChat(true);
    setShowPaymentMessages(false);
  };
  const clickedGroup = () => {
    setShowingGroup(true);
    setShowingChat(false);
    setShowChat(false);
    setShowingbutton(true);
  };
  const displayGroup = (group) => {
    setSelectedGroup(group.name);
    setShowPaymentMessages(false);
    setShowGroupChat(true);
    setShowChat(false);
    setShowGroupChatting(true);
    setShowingButton(false);
    setShowChat(false);
    setShowPaymentChat(false);
  };

  const handleClosingModal = () => {
    setGroupModel(false);
    setShowingGrouppp(false);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createGroup({ name: groupName });
      setGroupName("");
      handleClosingModal();
      setShowingGrouppp(true);
      getGroups();
    } catch (error) {
      console.log(error, "error in handleCreate");
    }
  };
  const displayChat = () => {
    setShowingChat(true);
    setShowingGroup(false);
    setShowChat(false);
    setShowingbutton(false);
    setShowingButton(true);
  };
  const GroupPaymentInput = () => {
    return (
      <div>
        {showInput && (
          <div>
            <input
              type="number"
              placeholder="Enter Amount Here"
              style={{ width: "100%", height: "45px", borderRadius: "10px" }}
            />
          </div>
        )}
      </div>
    );
  };
  const groupChat = () => {
    return (
      <div className="mainchat">
        <div className="horizontal-scroll-container chatpage">
          {selectedGroup && (
            <div>
              <h6>{selectedGroup.name}</h6>
            </div>
          )}

          {showGroupChating &&
            groups[0]?.chats?.map((chat, index) => {
              const currentDate = moment(chat.time).format("MM-DD-YYYY");
              const prevChat = groups[0]?.chats?.[index - 1];
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
                      textAlign:
                        chat.name === profile.username ? "right" : "left",
                    }}
                  >
                    <div
                      className="message-content"
                      style={{
                        display: "flex",
                        flexDirection:
                          chat.name === profile.username
                            ? "row-reverse"
                            : "row",
                        alignItems: "center",
                      }}
                    >
                      <span
                        className="customBox card"
                        style={{
                          backgroundColor:
                            chat.name === profile.username
                              ? "#D9FDD3"
                              : "white",
                        }}
                      >
                        {/* {messaging} */}

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
  const GroupPayment = () => {
    return (
      <div className="mainchat">
        <div className="horizontal-scroll-container chatpage">
          {showPaymentChat && <h1>hiii</h1>}
        </div>
      </div>
    );
  };
  const leftSideDropDown = () => {
    return (
      <>
        <div className="header">
          {selectedGroup && (
            <div className="direction">
              <img src={grouped} style={{ width: "50px", height: "50px" }} />
              <div className="rowing">
                <h6>{selectedGroup}</h6>

                <div
                  className="dropdown drop"
                  // style={{ position: "absolute", top: "20px" }}
                >
                  <span
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i
                      className="fas fa-ellipsis-v"
                      style={{ fontSize: "23px" }}
                    ></i>
                  </span>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <li>
                      <a className="dropdown-item" href="#" onClick={groupView}>
                        Payments
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#" onClick={chatView}>
                        Chats
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={handleShow}
                      >
                        Add friend
                      </a>
                    </li>
                    <ul>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={handleOpen}
                        >
                          viewGroup
                        </a>
                      </li>
                    </ul>
                  </ul>
                  <div
                    id="sidePopup"
                    className={`side-popup ${isOpen ? "open" : ""}`}
                  >
                    <button
                      type="button"
                      className="close"
                      aria-label="Close"
                      onClick={handleOpen}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <h5>Group Details</h5>
                    <ul>
                      {fiendsList.map((friend, index) => (
                        <li key={index}>{friend}</li>
                      ))}
                    </ul>
                  </div>
                  {isOpen && (
                    <div className="overlay" onClick={handleOpen}></div>
                  )}
                </div>
                {showPopUpModel && (
                  <div
                    className="modal show"
                    tabIndex="-1"
                    style={{ display: "block" }}
                  >
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header btn-alignment">
                          <h5 className="modal-title">Add Friend</h5>
                          <button
                            type="button"
                            className="btn-close"
                            onClick={handleShow}
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">
                          <input
                            type="text"
                            value={groupFriend}
                            onChange={(e) => setGroupFriend(e.target.value)}
                            className="form-control"
                            placeholder="Enter friend's name"
                          />
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={handleModalToggle}
                          >
                            Close
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handlingSubmit}
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </>
    );
  };

  const showgroup = () => {
    return (
      <div>
        {showingGroup && (
          <div>
            <div>
              {groups &&
                groups.map((group) => (
                  <div
                    key={group._id}
                    className="named"
                    onClick={() => displayGroup(group)}
                  >
                    <img
                      src={grouped}
                      style={{ width: "50px", height: "50px" }}
                    />
                    <div className="bor">
                      <h5>{group.name}</h5>
                      <h6>time</h6>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
        {showingbutton && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleCreate}
          >
            Create Group
          </button>
        )}
        {showingGrouping && (
          <div
            id="myModal"
            className="modal show d-block"
            tabIndex="-1"
            role="dialog"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Create New Group</h5>
                  <button
                    type="button"
                    className="close"
                    aria-label="Close"
                    onClick={handleClosingModal}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>
                    <input
                      type="text"
                      placeholder="Enter name here..."
                      value={groupName}
                      onChange={(e) => setGroupName(e.target.value)}
                    />
                  </p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-primary">AddName</button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleClosingModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <div>
        <div className="row ">
          <LeftSideView
            setFindFriend={setFindFriend}
            handleModalToggle={handleModalToggle}
            handleUsernameClick={handleUsernameClick}
            clickedGroup={clickedGroup}
            showgroup={showgroup}
            showingbutton={showingbutton}
            showingChat={showingChat}
            displayChat={displayChat}
            showChat={showChat}
          />

          <RightSideView
            selectedFriend={selectedFriend}
            showChat={showChat}
            showPaymentMessages={showPaymentMessages}
            messaging={messaging}
            setMessage={setMessage}
            error={error}
            handleChange={handleChange}
            handlePaymentClick={handlePaymentClick}
            chatHandle={chatHandle}
            seterror={seterror}
            name={name}
            type={type}
            groupChat={groupChat}
            showGroupChating={showGroupChating}
            showPaymentChat={showPaymentChat}
            GroupPayment={GroupPayment}
            selectedGroup={selectedGroup}
            isOpen={isOpen}
            showPopUpModel={showPopUpModel}
            leftSideDropDown={leftSideDropDown}
            GroupPaymentInput={GroupPaymentInput}
            showInput={showInput}
          />
        </div>
      </div>

      <Footer
        showModal={showModal}
        handleModalToggle={handleModalToggle}
        newFriend={newFriend}
        setNewFriend={setNewFriend}
        friendStatus={friendStatus}
        findFriend={findFriend}
        handleSendRequest={handleSendRequest}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
export default ChatForm;
