import React, { useState } from "react";
import "./external.css";
import chatbackground from "./chatbackground1.jpg";
import RightSideHeader from "./rightSideHeader";
import RenderChats from "./renderChats";
import RenderPayment from "./renderPayments";
import RightSideAttachment from "./rightSideAttachment";
import { useFrendsList } from "../hooks/useFriendsList";
import sendbutton from "./send.png";
import Joi from "joi";
const RightSideView = ({
  selectedFriend,
  showChat,
  showPaymentMessages,
  messaging,
  setMessage,
  handlePaymentClick,
  chatHandle,
  name,
  error,
  handleChange,
  seterror,
  type,
  groupChat,
  showGroupChating,
  showPaymentChat,
  GroupPayment,
  selectedGroup,
  isOpen,
  showPopUpModel,
  leftSideDropDown,
  GroupPaymentInput,
  showInput,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [closepopup, setClosePopUp] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [messaged, setMessaged] = useState("");
  const [amount, setAmount] = useState("");
  const { updateChat, updatePayment } = useFrendsList();
  const [submitted, setSubmittedValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const schema = Joi.object({
    messaged: Joi.string()
      .regex(/^[A-Za-z]+$/, "please mesage contains only characters")
      .required()
      .label("Message"),
    amount: Joi.string()
      .regex(/^[0-9]+$/, "numbers")
      .required()
      .label("Amount"),
  });

  const validateInput = () => {
    const { error } = schema.validate(
      { messaged, amount },
      { abortEarly: false }
    );
    if (!error) return null;

    const errors = {};
    error.details.forEach((detail) => {
      errors[detail.path[0]] = detail.message;
    });
    return errors;
  };
  function showAttachmentModal() {
    setModalVisible(!modalVisible);
    setClosePopUp(true);
  }
  function hideAttachmentModal() {
    setModalVisible(false);
  }
  const handleMessagedChange = (e) => {
    setMessaged(e.target.value);
    seterror((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors.messaged;
      return newErrors;
    });
  };
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    seterror((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors.amount;
      return newErrors;
    });
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);
    setIsTyping(true);
  };
  const handleSendMessage = (inputType) => {
    if (inputType === "text" && messaging.trim()) {
      updateChat(selectedFriend._id, { message: messaging });
      setMessage("");
      setIsTyping(true);
    }
  };
  const submit = (e) => {
    e.preventDefault();
    const errors = validateInput();
    if (errors) {
      seterror(errors);
      return;
    } else {
      const payload = {
        messaged,
        amount,
        type: type,
        id: selectedFriend._id,
        paid: name,
      };

      seterror({});
      setClosePopUp(false);
      updatePayment(payload.id, payload);
      setSubmittedValue(selectedValue);
    }
  };
  return (
    <div className="col-xl-8  px-0 chat-container card chatContainer box">
      {selectedFriend && (
        <div
          className="containerBackground user"
          style={{ backgroundImage: `url(${chatbackground})` }}
        >
          <RightSideHeader
            showChat={showChat}
            selectedFriend={selectedFriend}
            isTyping={isTyping}
            handlePaymentClick={handlePaymentClick}
            chatHandle={chatHandle}
          />
          <br />

          {showChat && !showPaymentMessages && (
            <RenderChats selectedFriend={selectedFriend} />
          )}

          {showPaymentMessages && showChat && (
            <RenderPayment selectedFriend={selectedFriend} />
          )}

          {showChat && (
            <div className="footer">
              {!showPaymentMessages && (
                <input
                  type="text"
                  placeholder="Type a message"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage(e.target.type);
                      setIsTyping(false);
                    } else {
                      handleTyping(e);
                    }
                  }}
                  value={messaging}
                  onChange={(e) => setMessage(e.target.value)}
                  className="no-border-radius input-styles"
                />
              )}
              {showPaymentMessages && (
                <input
                  type="text"
                  placeholder="Payment"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage(e.target.type);
                      setIsTyping(false);
                    } else {
                      handleTyping(e);
                    }
                  }}
                  value={messaging}
                  onClick={showAttachmentModal}
                  className="no-border-radius input-styles"
                />
              )}
              <div>
                {showPaymentMessages && (
                  <i
                    className="fas fa-paperclip attachmentIcon"
                    onClick={showAttachmentModal}
                  ></i>
                )}

                <RightSideAttachment
                  closepopup={closepopup}
                  modalVisible={modalVisible}
                  hideAttachmentModal={hideAttachmentModal}
                  handleMessagedChange={handleMessagedChange}
                  handleAmountChange={handleAmountChange}
                  messaged={messaged}
                  amount={amount}
                  error={error}
                  selectedValue={selectedValue}
                  submit={submit}
                  selectedFriend={selectedFriend}
                  handleChange={handleChange}
                />
              </div>
              <img
                className="send rocket"
                src={sendbutton}
                onClick={handleSendMessage}
              />
            </div>
          )}
        </div>
      )}
      {/* <div
        className="containerBackground user"
        style={{ backgroundImage: `url(${chatbackground})` }}
      >
        {showGroupChating && groupChat}
      </div>
      <div
        className="containerBackground user"
        style={{ backgroundImage: `url(${chatbackground})` }}
      >
        {showPaymentChat && GroupPayment}
      </div>
      {selectedGroup && isOpen && showPopUpModel && leftSideDropDown}
      {showInput && GroupPaymentInput} */}
    </div>
  );
};

export default RightSideView;
