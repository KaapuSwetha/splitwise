
import React, { useState, useEffect } from "react";
import { useProfile } from "../hooks/useProfileDetails";
import "./external.css";
import ChatForm from "./chatForm";
import { useMovieContext } from "./Context";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Joi from "joi";
function ProfilePage() {
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const { profileloading, getProfile, saveProfile } = useProfile();
  const { profile, setProfile } = useMovieContext();
  const schema = Joi.object({
    username: Joi.string().pattern(/^[a-z]+$/).required().messages({
      "string.pattern.base": "Username must consist of lowercase letters only.",
      "any.required": "Username is required."
    }),
    mobile: Joi.string().pattern(/^[789]\d{9}$/).required().messages({
      "string.pattern.base": "Mobile number must be 10 digits and start with 7, 8, or 9.",
      "string.empty": "Mobile number is required."
    })
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = schema.validate({ username, mobile }, { abortEarly: false });
    if (error) {
      error.details.forEach(err => toast.error(err.message));
      return;
    }
    try {
      await saveProfile({ username, mobile });
      toast.success("Profile updated successfully!");
    } catch (error) {
      if (error.message === "User already exists") {
        toast.error("User already exists");
      } else {
        toast.error("Failed to update profile");
      }
      console.error("Failed to update profile:", error);
    }
  };
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const fetchedProfile = await getProfile();
        if (fetchedProfile) {
          setProfile(fetchedProfile);
          setUsername(fetchedProfile.username || "");
          setMobile(fetchedProfile.mobile || "");
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };
    fetchProfile();
  }, []);
  if (profileloading) {
    return <div colSpan="7" className="text-center" >
    <div className="spinner-border spiner-border-sm" style={{ color: "blue" ,position:"absolute",top:"50%",bottom:"50%"}} role="status">
        <span className="sr-only"></span>
    </div>
</div>

  }
  return (
    <div>
      <ToastContainer />
      {profile ? (
        <ChatForm />
      ) : (
        <div className="cardBox">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username:</label>
              <div>
                <input
                  type="text"
                  className="inputField"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{ width: "300px", height: "30px" }}
                />
              </div>
            </div>
            <div>
              <label htmlFor="mobile">Mobile Number:</label>
              <div>
                <input
                  type="text"
                  value={mobile}
                  className="inputField"
                  onChange={(e) => setMobile(e.target.value)}
                  style={{ width: "300px", height: "30px" }}
                />
              </div>
            </div>
            <input type="submit" className="submitButton" value="Submit" />
          </form>
        </div>
      )}
    </div>
  );
}
export default ProfilePage;







