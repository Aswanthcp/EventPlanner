import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../../utils/axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { Toaster } from "react-hot-toast";
import { getCordinatorEvent, getEvents, itemURL } from "../../utils/Constants";
import { useSelector } from "react-redux";
import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import "./editEvent.scss"; // Import the CSS file for styling

const EditEvents = () => {
  const [events, setEvents] = useState([]);
  const [name, setName] = useState(events.name);
  const [event, setEvent] = useState([]);
  const [description, setDescription] = useState(events.description);
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.cord);
  const { id } = useParams();

  useEffect(() => {
    getUsersList();
    getEventList();
  }, [id]);

  const getUsersList = () => {
    axios
      .get(`/${getCordinatorEvent}${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        if (error.response) {
          generateError(error.response.data.message);
        } else {
          generateError("Network error. Please try again later.");
        }
      });
  };

  const getEventList = () => {
    axios
      .get(getEvents, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setEvent(response.data);
      })
      .catch((error) => {
        if (error.response) {
          generateError(error.response.data.message);
        } else {
          generateError("Network error. Please try again later.");
        }
      });
  };

  const generateError = (error) =>
    toast.error(error, {
      position: "top-right",
    });

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [imageSelected, setImageSelected] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const acceptedFileTypes = ["image/jpeg", "image/png", "image/jpg"];
  const maxFileSize = 1000000;

  const onImageSelect = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      acceptedFileTypes.includes(file.type) &&
      file.size <= maxFileSize
    ) {
      setImageSelected(file);
      setErrorMessage("");
    } else {
      setImageSelected("");
      setErrorMessage(
        `Please select an image of type ${acceptedFileTypes.join(
          ", "
        )} and size up to ${maxFileSize / 1000000} MB`
      );
    }
  };

  const onSubmit = async (data) => {
    try {
      let imageUrl;

      if (imageSelected) {
        const formData = new FormData();
        formData.append("file", imageSelected);
        formData.append("upload_preset", "ml_default");
        reset();
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dwkom79iv/image/upload",
          formData,
          { withCredentials: false }
        );

        if (response.status !== 200) throw response.error.message;

        imageUrl = response.data.secure_url;
        console.log(response);
      }

      const updatedData = {
        id: events.id,
        name: data.name || events.name,
        description: data.description || events.description,
        coordinator: user.id,
        imageUrl: imageUrl || events.imageUrl,
        event: data.event || events.event,
        capacity: data.capacity || events.capacity,
        price: data.price || events.price,
        location: data.location || events.location,
      };

      await axios.put(getCordinatorEvent + `${id}`, {'updatedData':updatedData}, {
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
        navigate("/events");
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

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <Toaster position="top-center" reverseOrder={false}></Toaster>
          <h1>Edit Events</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              className="left-img"
              height={"500px"}
              width={"500px"}
              src={
                imageSelected
                  ? URL.createObjectURL(imageSelected)
                  : events.imageUrl
                  ? events.imageUrl
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
            <label htmlFor="file" className="edit-events-file-label">
              Choose Image
              <DriveFolderUploadOutlinedIcon className="edit-events-icon" />
            </label>
            <input
              type="file"
              id="file"
              onChange={onImageSelect}
              accept={acceptedFileTypes.join(",")}
              style={{ display: "none" }}
            />
            {errorMessage && (
              <p className="edit-events-error">{errorMessage}</p>
            )}
          </div>
          <div className="right">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="edit-events-form"
            >
              <div className="edit-events-form-input">
                <label htmlFor="event-select">
                  Event - {events?.event?.name}
                </label>
               
              </div>
              <div className="edit-events-form-input">
                <label htmlFor="capacity">Capacity</label>
                <input
                  type="text"
                  defaultValue={events.capacity}
                  onChange={(event) => setName(event.target.value)}
                  className="form-control"
                  id="capacity"
                  placeholder="Capacity"
                  {...register("capacity")}
                  required
                />
              </div>
              <div className="edit-events-form-input">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  defaultValue={events.location}
                  onChange={(event) => setDescription(event.target.value)}
                  className="form-control"
                  id="location"
                  placeholder="Location"
                  {...register("location")}
                  required
                />
              </div>
              <div className="edit-events-form-input">
                <label htmlFor="location">Price</label>
                <input
                  type="text"
                  defaultValue={events.price}
                  onChange={(event) => setDescription(event.target.value)}
                  className="form-control"
                  id="price"
                  placeholder="Price"
                  {...register("price")}
                  required
                />
              </div>

              <div className="edit-events-form-input">
                <label htmlFor="description">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  placeholder="Description"
                  defaultValue={events.description}
                  {...register("description")}
                  required
                ></textarea>
              </div>
              <button type="submit" className="edit-events-submit-btn">
                Edit Event
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditEvents;
