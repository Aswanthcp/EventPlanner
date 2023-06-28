import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useSelector } from "react-redux";

import "./editprofile.scss";
import { coordinatorsURL } from "../../utils/Constants";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";

const EditProfile = () => {
  const generateError = (error) =>
    toast.error(error, {
      position: "top-right",
    });

  const token = useSelector((state) => state.token);
  const cord = useSelector((state) => state.cord);
  const [imageSelected, setImageSelected] = useState(null);
  const [coordinator, setCoordinator] = useState();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let imageUrl = coordinator?.imageUrl;

      if (imageSelected) {
        const formData = new FormData();
        formData.append("file", imageSelected);
        formData.append("upload_preset", "ml_default");
        reset();

        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dwkom79iv/image/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status !== 200) throw response.error.message;

        imageUrl = response.data.secure_url;
      }

      const eventData = {
        id: coordinator.id,
        email: data.email || coordinator.email,
        username: data.username || coordinator.username,
        phone_number: data.phone_number || coordinator.phone_number,
        imageUrl: imageUrl || "",
      };

      await axios.put(coordinatorsURL + `${cord.id}`, eventData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Edit successful!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });

      setTimeout(() => {
        navigate("/application");
      }, 1000);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        if (error.response.data) {
          generateError(error.response.data.message);
        } else {
          generateError("Network error. Please try again later.");
        }
      }
    }
  };

  useEffect(() => {
    axios
      .get(`${coordinatorsURL}${cord.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setCoordinator(response.data);
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          console.log(error.response.data.message);
        }
      });
  }, []);

  return (
    <div className="new-profile">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>EDIT PROFILE</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
            className="left-img"
              height={"200px"}
              width={"200px"}
              src={
                imageSelected
                  ? URL.createObjectURL(imageSelected)
                  : coordinator?.imageUrl
              }
              alt=""
            />
          </div>
          <div className="right">
            <form
              onSubmit={handleSubmit(onSubmit)}
              encType="multipart/form-data"
              id="form"
            >
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  accept="image/jpeg, image/png"
                  type="file"
                  id="file"
                  onChange={(e) => setImageSelected(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              <div className="formInput">
                <label>USER NAME</label>
                <input
                  type="text"
                  placeholder="ENTER USER NAME"
                  defaultValue={coordinator?.username}
                  {...register("username")}
                />
              </div>
              <div className="formInput">
                <label>EMAIL</label>
                <input
                  type="text"
                  defaultValue={coordinator?.email}
                  placeholder="ENTER EMAIL"
                  {...register("email")}
                />
              </div>
              <div className="formInput">
                <label>PHONE NUMBER</label>
                <input
                  type="text"
                  defaultValue={coordinator?.phone_number}
                  placeholder="ENTER PHONE NUMBER"
                  {...register("phone_number", {})}
                />
              </div>

              <button type="submit">SAVE</button>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default EditProfile;
