import React, { useState } from "react";
import LeftChat from "./leftSideChat";
import LeftHeader from "./leftSideHeader";
import "./external.css";
import "react-toastify/dist/ReactToastify.css";
import { useMovieContext } from "./Context";
const LeftSideView = ({
  setFindFriend,
  handleModalToggle,
  handleUsernameClick,
  clickedGroup,
  showgroup,
  showingbutton,
  displayChat,
  showingChat,
}) => {
  const [searchInput, setSearchInput] = useState("");
  const { friends, profile } = useMovieContext();
  const filteredFriends = friends?.filter((friend) => {
    const friendName =
      profile.username === friend?.user_from_name
        ? friend?.user_to_name
        : friend?.user_from_name;
    return friendName.toLowerCase().includes(searchInput.toLowerCase());
  });

  return (
    <div className="col-xl-4 px-4 moveright card card-container box">
      <LeftHeader
        setFindFriend={setFindFriend}
        handleModalToggle={handleModalToggle}
      />
      <div className="search-container">
        <i className="fa fa-search search-icon"></i>
        <input
          type="text"
          placeholder="Search..."
          className="form-control search-input"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <div className="d-flex flex-row mb-3">
        <button className="group" onClick={displayChat}>
          Chat
        </button>
        <button className="group" onClick={clickedGroup}>
          Groups
        </button>
      </div>
      <hr />
      <LeftChat
        filteredFriends={filteredFriends}
        handleUsernameClick={handleUsernameClick}
        showgroup={showgroup}
        showingbutton={showingbutton}
        showingChat={showingChat}
      />
      <div className="add-friend-btn-container">
        {(!friends || friends.length === 0) && (
          <button
            className="btn btn-primary add-friend-btn"
            style={{ marginLeft: "130px" }}
            onClick={() => {
              setFindFriend(null);
              handleModalToggle();
            }}
          >
            Add Friend
          </button>
        )}
      </div>
    </div>
  );
};

export default LeftSideView;
