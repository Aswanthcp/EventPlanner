// import "./list.scss";
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import axios from "../../utils/axios";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import MenuItem from "@mui/material/MenuItem";
// import { useEffect } from "react";

// import Box from "@mui/material/Box";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";

// const AddEvent = (props) => {
//   const cordinator = props.cordinator;
//   const token = props.token;
//   const [event, setEvent] = useState([]);
//   const [packages, setPackages] = useState([]);
//   const [keyValuePairs, setKeyValuePairs] = useState([{ key: "", value: "" }]);

//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm();
//   const addKeyValuePair = () => {
//     setKeyValuePairs([...keyValuePairs, { key: "", value: "" }]);
//   };

//   const generateError = (error) =>
//     toast.error(error, {
//       position: "top-right",
//     });

//   return (
//     <div className="new">
//       <div className="newContainer">
//         <div className="top">
//           <div className="right">
//             <form
//               encType="multipart/form-data"
//               id="form"
//               onSubmit={handleSubmit(submitApplication)}
//             >
//               <div className="formInput">
//                 <label>ITEM NAME</label>
//                 <input
//                   type="text"
//                   placeholder="ENTER ITEM NAME FOR EVENT"
//                   {...register("name", {
//                     required: true,
//                   })}
//                 />
//                 <span style={{ color: "red" }} className="text-danger">
//                   {errors.name?.type === "required" && (
//                     <span>Item Name is required</span>
//                   )}
//                 </span>
//               </div>
//               <div className="formInput">
//                 <label>CATEGORY</label>
//                 <Box sx={{ minWidth: 50 }}>
//                   <FormControl fullWidth>
//                     <Select
//                       labelId="event-select-label"
//                       id="event-select"
//                       {...register("event", {
//                         required: true,
//                         maxLength: 20,
//                         pattern: /^[^\s]+(?:$|.*[^\s]+$)/,
//                       })}
//                       label="events"
//                       // onChange={}
//                     >
//                       <MenuItem value="" disabled>
//                         <em>select the value</em>
//                       </MenuItem>
//                       {event.map((obj, i) => {
//                         return <MenuItem value={obj.name}>{obj.name}</MenuItem>;
//                       })}
//                     </Select>
//                   </FormControl>
//                 </Box>

//                 <span style={{ color: "red" }} className="text-danger">
//                   {errors.capacity?.type === "required" && (
//                     <span>Capacity is required</span>
//                   )}
//                 </span>
//               </div>
//               <div className="formInput">
//                 <label>DISCRIPTION</label>
//                 <input
//                   type="text"
//                   placeholder="ENTER DISCRIPTION  FOR ITEM"
//                   {...register("description", {
//                     required: true,
//                   })}
//                 />
//                 <span style={{ color: "red" }} className="text-danger">
//                   {errors.description?.type === "required" && (
//                     <span>Description is required</span>
//                   )}
//                 </span>
//               </div>

//               <div className="formInput" style={{ display: "flex" }}>
//                 <label>FEATURES</label>
//                 {keyValuePairs.map((pair, index) => (
//                   <div key={index} className="formInput">
//                     <input
//                       type="text"
//                       placeholder="ENTER KEY"
//                       value={pair.key}
//                       onChange={(e) => {
//                         const newPairs = [...keyValuePairs];
//                         newPairs[index].key = e.target.value;
//                         setKeyValuePairs(newPairs);
//                       }}
//                     />
//                     <input
//                       type="text"
//                       placeholder="ENTER VALUE"
//                       value={pair.value}
//                       onChange={(e) => {
//                         const newPairs = [...keyValuePairs];
//                         newPairs[index].value = e.target.value;
//                         setKeyValuePairs(newPairs);
//                       }}
//                     />
//                     {index === keyValuePairs.length - 1 && (
//                       <span
//                         style={{ cursor: "pointer" }}
//                         onClick={addKeyValuePair}
//                       >
//                         +
//                       </span>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               <button type="submit">SAVE</button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddEvent;
import "./list.scss";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { VenderItemCreate, getCategory } from "../../utils/Constants";

const AddEvent = (props) => {
  const vender = props.vender;
  const token = props.token;
  const [category, setCategory] = useState([]);
  const [keyValuePairs, setKeyValuePairs] = useState([{ key: "", value: "" }]);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const addKeyValuePair = () => {
    setKeyValuePairs([...keyValuePairs, { key: "", value: "" }]);
  };
  useEffect(() => {
    axios
      .get(getCategory)
      .then((response) => {
        setCategory(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const generateError = (error) =>
    toast.error(error, {
      position: "top-right",
    });

  const submitApplication = (data) => {
    // add your submit logic here
    const featuresDict = {};
    for (const feature of keyValuePairs) {
      featuresDict[feature.key] = feature.value;
    }
    const featuresList = [];
    for (const key in featuresDict) {
      featuresList.push({ [key]: featuresDict[key] });
    }
    const formData = {
      name: watch("name"),
      category: watch("category"),
      description: watch("description"),
      features: featuresList,
      vender: vender,
    };
    axios
      .post(VenderItemCreate, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        navigate("/events");
      })
      .catch((error) => {
        console.log("error in addevent", error);
      });
  };

  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1>Item Form</h1>
          {/* <div className="left">
            <img src="your_image_url" alt="Event" />
          </div> */}
          <div className="right">
            <form
              encType="multipart/form-data"
              id="form"
              onSubmit={handleSubmit(submitApplication)}
            >
              <div className="formInput">
                <label htmlFor="item-name">ITEM NAME</label>
                <input
                  id="item-name"
                  type="text"
                  placeholder="ENTER ITEM NAME FOR EVENT"
                  {...register("name", {
                    required: true,
                  })}
                />
                {errors.name?.type === "required" && (
                  <span className="error-message">Item Name is required</span>
                )}
              </div>

              <div className="formInput">
                <label htmlFor="category">CATEGORY</label>
                <Box sx={{ minWidth: 50 }}>
                  <FormControl fullWidth>
                    <Select
                      labelId="event-select-label"
                      id="category"
                      {...register("category", {
                        required: true,
                        maxLength: 20,
                        pattern: /^[^\s]+(?:$|.*[^\s]+$)/,
                      })}
                      label="events"
                    >
                      <MenuItem value="" disabled>
                        <em>select the value</em>
                      </MenuItem>
                      {category.map((obj, i) => {
                        return (
                          <MenuItem key={i} value={obj.name}>
                            {obj.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Box>
                {errors.capacity?.type === "required" && (
                  <span className="error-message">Capacity is required</span>
                )}
              </div>

              <div className="formInput">
                <label htmlFor="description">DESCRIPTION</label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  placeholder="Enter a description..."
                  {...register("description", {
                    required: true,
                  })}
                ></textarea>
                {errors.description?.type === "required" && (
                  <span className="error-message">Description is required</span>
                )}
              </div>

              <div className="formInput">
                <label>FEATURES</label>
                {keyValuePairs.map((pair, index) => (
                  <div key={index} className="keyValueContainer">
                    <input
                      type="text"
                      placeholder="ENTER KEY"
                      value={pair.key}
                      onChange={(e) => {
                        const newPairs = [...keyValuePairs];
                        newPairs[index].key = e.target.value;
                        setKeyValuePairs(newPairs);
                      }}
                    />
                    <input
                      type="text"
                      placeholder="ENTER VALUE"
                      value={pair.value}
                      onChange={(e) => {
                        const newPairs = [...keyValuePairs];
                        newPairs[index].value = e.target.value;
                        setKeyValuePairs(newPairs);
                      }}
                    />
                    {index === keyValuePairs.length - 1 && (
                      <span className="addIcon" onClick={addKeyValuePair}>
                        +
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <button type="submit">SAVE</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddEvent;
