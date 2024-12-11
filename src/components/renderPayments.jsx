import React from "react";
import moment from "moment";
import image from "./image.png";
import "./external.css";
import { useMovieContext } from "./Context";
const RenderPayment = ({ selectedFriend }) => {
  console.log("selectedFriend:", selectedFriend);
  const { profile } = useMovieContext();
  return (
    <div className="mainchat">
      <div className="horizontal-scroll-container chatpage">
        {selectedFriend?.payments?.map((payment, index) => {
          const currentDate = moment(payment.time).format("MM-DD-YYYY");
          const prevpayment = selectedFriend?.payments?.[index - 1];
          const prevDate = prevpayment
            ? moment(prevpayment.time).format("MM-DD-YYYY")
            : null;
          const showDate = currentDate !== prevDate;

          return (
            <div key={index}>
              {showDate && (
                <div className="chat-dates container">
                  {currentDate === moment().format("MM-DD-YYYY")
                    ? "Today"
                    : currentDate ===
                      moment().subtract(1, "days").format("MM-DD-YYYY")
                    ? "Yesterday"
                    : moment(payment.time).format("MM/DD/YYYY")}
                </div>
              )}
              <div
                className={`d-flex flex-row mb-2 ${
                  payment.paid === profile.username
                    ? "justify-content-end"
                    : "justify-content-start"
                }`}
              >
                {payment.paid !== profile.username && (
                  <img src={image} className="profileImage" alt="Profile" />
                )}

                <div>
                  <div
                    className="message-content"
                    style={{
                      display: "flex",
                      flexDirection:
                        payment.paid === profile.username
                          ? "row-reverse"
                          : "row",
                      alignItems: "center",
                    }}
                  >
                    <span
                      className="customPaymentBox card"
                      style={{
                        backgroundColor:
                          payment.paid !== profile.username
                            ? "white"
                            : "#b8f7b8",
                      }}
                    >
                      <div>
                        {payment.paid === profile.username
                          ? "Payment by you"
                          : "Payment by " + payment.paid}
                      </div>
                      <i className="fas fa-ellipsis-v paymentIcon"></i>
                      <div
                        style={{
                          fontSize: "30px",
                          textAlign: "center",
                          padding: "6px",
                          paddingTop: "12px",
                          color:
                            payment.paid === profile.username ? "black" : "red",
                        }}
                      >
                        <i
                          style={{ fontSize: "18px", position: "relative" }}
                          className="fas fa-indian-rupee-sign"
                        ></i>
                        {payment.type === "split"
                          ? ` ${(Number(payment.amount) / 2).toFixed(2)}`
                          : payment.type === "owed"
                          ? ` ${Number(payment.amount).toFixed(2)}`
                          : ""}
                      </div>
                      <div> {"Total Amount : " + payment.amount}</div>
                      <div
                        className="d-flex flex-row mb-2"
                        style={{ marginTop: "5px" }}
                      >
                        <span className="textStyleGreens">
                          <span className="circleStyleGreens">
                            <span className="centeredTexts">&#10004;</span>
                          </span>
                        </span>
                        <div style={{ fontSize: "13px" }}>
                          <div>
                            {payment.type === "split"
                              ? "Split : " + payment.amount / 2
                              : payment.type === "owed"
                              ? "Owed : " + payment.amount
                              : ""}
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          borderTop: "1px solid rgb(172 168 168)",
                          padding: "2px",
                        }}
                      >
                        {payment.messaged}
                      </div>
                      <div className="chatTimes">
                        <span className="message-time messagetime">
                          {moment(payment.time).format("h:mm a")}
                        </span>
                      </div>
                    </span>
                  </div>
                </div>
                {payment.paid === profile.username && (
                  <img
                    src={image}
                    className="profileImage paymentImage"
                    alt="Profile"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RenderPayment;
