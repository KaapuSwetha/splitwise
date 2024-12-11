import React from "react";
import "./external.css";
import image from "./image.png";
const Footer = ({
  showModal,
  handleModalToggle,
  newFriend,
  setNewFriend,
  friendStatus,
  findFriend,
  handleSendRequest,
  handleSubmit,
}) => {
  return (
    <>
      {showModal && (
        <div className="modal show" tabIndex="-1" style={{ display: "block" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header btn-alignment">
                <h5 className="modal-title">Add Friend</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleModalToggle}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  value={newFriend}
                  onChange={(e) => setNewFriend(e.target.value)}
                  className="form-control"
                  placeholder="Enter friend's name"
                />
                {friendStatus && (
                  <div className="status-message">{friendStatus}</div>
                )}
                {findFriend && (
                  <div className="friend-details">
                    <img
                      src={image}
                      alt={findFriend.username}
                      className="friend-image"
                    />
                    <h2>{findFriend.username}</h2>
                    <button onClick={handleSendRequest}>Follow</button>
                  </div>
                )}
              </div>
              <div className="modal-footer ">
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
                  onClick={handleSubmit}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
