import React, { useState } from "react";
import "./external.css";
import { useMovieContext } from "./Context";
const RightSideAttachment = ({
  closepopup,
  modalVisible,
  hideAttachmentModal,
  error,
  messaged,
  handleMessagedChange,
  amount,
  handleAmountChange,
  selectedValue,
  selectedFriend,
  submit,
  handleChange,
}) => {
  const { profile } = useMovieContext();
  const [showSuccess, setShowSuccess] = useState(null);
  const success = (id) => {
    setShowSuccess(id);
  };

  return (
    <>
      {closepopup && modalVisible && (
        <div
          className="modal fade show"
          id="attachmentModal"
          tabIndex="-1"
          aria-labelledby="attachmentModalLabel"
          aria-hidden="true"
          style={{
            display: "block",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div className="modal-dialog modal-dialog-centered ">
            <div className="modal-content">
              <div className="modal-header btn-alignment">
                <h5 className="modal-title">Attachment Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={hideAttachmentModal}
                ></button>
              </div>
              <div className="modal-body">
                <div>
                  <form>
                    <label htmlFor="message" style={{ marginBottom: "10px" }}>
                      Message:
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        error &&
                        error.details &&
                        error.details[0].path[0] === "messaged"
                          ? "input-error"
                          : ""
                      }`}
                      placeholder="Enter message"
                      value={messaged}
                      onChange={handleMessagedChange}
                    />
                    {error && error.messaged && (
                      <div
                        className="error-message"
                        style={{
                          color: "red",
                          marginBottom: "10px",
                        }}
                      >
                        {error.messaged}
                      </div>
                    )}
                    <>
                      <label htmlFor="amount" style={{ marginBottom: "10px" }}>
                        Amount:
                      </label>
                      <input
                        type="number"
                        min="1"
                        className={`form-control ${
                          error &&
                          error.details &&
                          error.details[0].path[0] === "amount"
                            ? "input-error"
                            : ""
                        }`}
                        placeholder="Enter amount"
                        value={amount}
                        onChange={handleAmountChange}
                      />
                      {error && error.amount && (
                        <div
                          className="error-message"
                          style={{
                            color: "red",
                            marginBottom: "20px",
                          }}
                        >
                          {error.amount}
                        </div>
                      )}
                    </>
                  </form>
                  <div>
                    <div>
                      <h3
                        style={{
                          color:
                            selectedValue === selectedFriend.user_to_name
                              ? "red"
                              : "green",
                        }}
                      >
                        {selectedValue}
                      </h3>

                      <div
                        value={selectedValue}
                        onChange={(e) => setSelectedValue(e.target.value)}
                      >
                        <div className="d-flex flex-row mb-2 attachContainer">
                          <div onClick={() => success(1)}>
                            <div
                              value={profile.username}
                              className="card green-card"
                              onClick={(e) => {
                                e.preventDefault();
                                handleChange(profile.username, "split");
                              }}
                            >
                              {showSuccess === 1 && (
                                <span className="textStyleGreen">
                                  <span className="circleStyleGreen">
                                    <span className="centeredText">
                                      &#10004;
                                    </span>
                                  </span>
                                </span>
                              )}
                              You paid split equally <br />({`+${amount / 2}`})
                            </div>
                          </div>
                          <div onClick={() => success(2)}>
                            <div
                              value={profile.username}
                              className="card green-card"
                              onClick={(e) => {
                                e.preventDefault();
                                handleChange(profile.username, "owed");
                              }}
                            >
                              {showSuccess === 2 && (
                                <span className="textStyleGreen">
                                  <span className="circleStyleGreen">
                                    {" "}
                                    <span className="centeredText">
                                      &#10004;
                                    </span>
                                  </span>
                                </span>
                              )}
                              You are owed the full amount <br />(
                              {`+${amount / 1}`})
                            </div>
                          </div>
                        </div>
                        <div className="d-flex flex-row mb-2 attachContainer">
                          {" "}
                          <div
                            style={{ marginTop: "10px" }}
                            onClick={() => success(3)}
                          >
                            <div
                              className="card red-card"
                              onClick={(e) => {
                                e.preventDefault();
                                handleChange(
                                  profile.username ===
                                    selectedFriend?.user_from_name
                                    ? selectedFriend?.user_to_name
                                    : selectedFriend?.user_from_name,
                                  "split"
                                );
                              }}
                              value={`${
                                profile.username ===
                                selectedFriend?.user_from_name
                                  ? selectedFriend?.user_to_name
                                  : selectedFriend?.user_from_name
                              }
                            `}
                            >
                              {" "}
                              {showSuccess === 3 && (
                                <span className="textStyleRed">
                                  <span className="circleStyleRed">
                                    {" "}
                                    <span className="centeredText">
                                      &#10004;
                                    </span>
                                  </span>
                                </span>
                              )}
                              {`${
                                profile.username ===
                                selectedFriend?.user_from_name
                                  ? selectedFriend?.user_to_name
                                  : selectedFriend?.user_from_name
                              } paid split equally`}{" "}
                              <br />({`-${amount / 2}`})
                            </div>
                          </div>
                          <div
                            style={{ marginTop: "10px" }}
                            onClick={() => success(4)}
                          >
                            <div
                              className="card red-card"
                              onClick={(e) => {
                                e.preventDefault();
                                handleChange(
                                  profile.username ===
                                    selectedFriend?.user_from_name
                                    ? selectedFriend?.user_to_name
                                    : selectedFriend?.user_from_name,
                                  "owed"
                                );
                              }}
                            >
                              {showSuccess === 4 && (
                                <span className="textStyleRed">
                                  <span className="circleStyleRed">
                                    {" "}
                                    <span className="centeredText">
                                      &#10004;
                                    </span>
                                  </span>
                                </span>
                              )}
                              {`${
                                profile.username ===
                                selectedFriend?.user_from_name
                                  ? selectedFriend?.user_to_name
                                  : selectedFriend?.user_from_name
                              } is owed the full amount`}{" "}
                              <br />({`-${amount / 1}`})
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      className="btn btn-primary"
                      type="submit"
                      style={{
                        borderRadius: "10px",
                        width: "80px",
                        fontSize: "20px",
                      }}
                      onClick={submit}
                      disabled={!messaged || !amount || !showSuccess}
                    >
                      Pay
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RightSideAttachment;
