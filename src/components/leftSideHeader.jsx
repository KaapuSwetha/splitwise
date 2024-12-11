import React from "react";
import { Typography } from "@mui/material";
import { useApp } from "./RealmApp";

const LeftHeader = ({ setFindFriend, handleModalToggle }) => {
  const { logOut } = useApp();

  return (
    <div className="containers">
      <div className="chats">
        <h2 style={{ marginLeft: "10px" }}>Splitwise</h2>
        <div className="dropdown">
          <span
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i
              className="fas fa-ellipsis-v"
              style={{ fontSize: "23px", marginTop: "10px" }}
            ></i>
          </span>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li>
              <a className="dropdown-item" href="#">
                Select chats
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
                onClick={() => {
                  setFindFriend(null);
                  handleModalToggle();
                }}
              >
                Add friend
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
                <Typography
                  style={{
                    textTransform: "capitalize",
                  }}
                  variant="button"
                >
                  Log out
                </Typography>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LeftHeader;
