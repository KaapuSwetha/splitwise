import React from "react";
import "./external.css";
import { useMovieContext } from "./Context";
import image from "./image.png";
import { useApp } from "./RealmApp";
const RightSideHeader = ({
  selectedFriend,
  isTyping,
  handlePaymentClick,
  chatHandle,
  showChat,
}) => {
  const { profile } = useMovieContext();
  const { logOut } = useApp();
  return (
    <>
      {showChat && (
        <div className="headerBackground">
          <img src={image} className="profileImage" alt="Profile" />
          <div className="usernameFriend">
            <span className="usernameText">
              {profile.username === selectedFriend?.user_from_name
                ? selectedFriend?.user_to_name
                : selectedFriend?.user_from_name}
              <br />
              <p className="paragraphStyle">
                {isTyping ? "typing..." : "online"}
              </p>
            </span>
            <div className="dropdown">
              <span
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i
                  className="fas fa-ellipsis-v dropdownIcon"
                  style={{
                    fontSize: "23px",
                    marginTop: "10px",
                    justifyContent: "end",
                  }}
                ></i>
              </span>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <li>
                  <a
                    className="dropdown-item"
                    onClick={handlePaymentClick}
                    href="#"
                  >
                    Payment
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" onClick={chatHandle} href="#">
                    Chat
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    New group
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={async (e) => {
                      e.preventDefault();
                      await logOut();
                    }}
                  >
                    Log out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RightSideHeader;
