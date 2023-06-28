import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { Toaster } from "react-hot-toast";
import { createEvent, getEvents, itemURL } from "../../utils/Constants";
import { useSelector } from "react-redux";
import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import "./createEvent.scss"; // Import the CSS file for styling

const AddEvent = (props) => {
  const [event, setEvent] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.cord);

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
  const getEventList = async() => {
    axios
      .get(getEvents, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
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

      const eventData = {
        name: data.name,
        description: data.description,
        event: data.event,
        coordinator: user.id,
        imageUrl: imageUrl || "",
        capacity: data.capacity,
        price: data.price,
        location: data.location,
      };

      await axios.post(createEvent, eventData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setTimeout(() => {
        toast.success("Event created successfully!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        navigate("/events");
      }, 20);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        if (error.response) {
          generateError(error.response.data.message);
        } else {
          generateError("Network error. Please try again later.");
        }
      }
    }
  };
  useEffect(() => {
    // getUsersList();
    getEventList();
  }, []);

  const generateError = (error) =>
    toast.error(error, {
      position: "top-right",
    });

  return (
    <>
      <div className="top-create">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <h3>Create Event</h3>
      </div>
      <div className="bottom-create">
        <div className="left-create">
          <img
            height={"500px"}
            src={
              imageSelected
                ? URL.createObjectURL(imageSelected)
                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
            }
            alt=""
          />
          <label htmlFor="file" className="create-event-file-label">
            Choose Image
            <DriveFolderUploadOutlinedIcon className="create-event-icon" />
          </label>
          <input
            type="file"
            id="file"
            onChange={onImageSelect}
            accept={acceptedFileTypes.join(",")}
            style={{ display: "none" }}
          />
          {errorMessage && <p className="create-event-error">{errorMessage}</p>}
        </div>
        <div className="right-create">
          <form onSubmit={handleSubmit(onSubmit)} className="create-event-form">
            <div className="create-event-form-input">
              <label htmlFor="name">Event Name</label>

              <Select
                labelId="event-select-label"
                id="event-select"
                className="form-control"
                {...register("event", {
                  required: false,
                  maxLength: 20,
                })}
                label="Events"
              >
                {event?.map((event) => (
                  <MenuItem key={event.id} value={event.id}>
                    {event.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className="create-event-form-input">
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                id="description"
                placeholder="Description"
                onChange={(event) => setDescription(event.target.value)}
                {...register("description", { required: true })}
                required
              ></textarea>
            </div>
            <div className="create-event-form-input">
              <label htmlFor="capacity">Capacity</label>
              <input
                type="text"
                onChange={(event) => setDescription(event.target.value)}
                className="form-control"
                id="capacity"
                placeholder="Capacity"
                {...register("capacity", { required: true })}
                required
              />
            </div>
            <div className="create-event-form-input">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                onChange={(event) => setDescription(event.target.value)}
                className="form-control"
                id="location"
                placeholder="Location"
                {...register("location", { required: true })}
                required
              />
            </div>
            <div className="create-event-form-input">
              <label htmlFor="price">Price</label>
              <input
                type="text"
                onChange={(event) => setDescription(event.target.value)}
                className="form-control"
                id="price"
                placeholder="Price"
                {...register("price", { required: true })}
                required
              />
            </div>
            <button type="submit" className="create-event-submit-btn">
              Create Event
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddEvent;
