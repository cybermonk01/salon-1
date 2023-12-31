import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useReducer } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer";
import newRequest from "../../utils/newRequest";
import upload from "../../utils/upload";
import "./Add.scss";

const Add = () => {
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (gig) => {
      return newRequest.post("/gigs/", gig);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: {
        name: e.target.name,
        value: e.target.value,
      },
    });
  };

  const handleFeature = (e) => {
    e.preventDefault();
    dispatch({
      type: "ADD_FEATURE",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  };

  const handleUpload = async () => {
    setUploading(true);

    try {
      const cover = await upload(singleFile);

      const images = await Promise.all(
        [...files].map(async (file) => {
          console.log(file);
          const url = await upload(file);
          return url;
        })
      );
      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(state);
    navigate("/mygigs");
  };

  console.log(state);
  return (
    <div className="add">
      <div className="container">
        <h1>Add New Gig</h1>
        <div className="sections">
          <div className="info">
            <label htmlFor="">Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. I will do something I'm really good at"
              onChange={handleChange}
            />
            <label htmlFor="">Category</label>
            <select name="cat" id="cat1">
              <option value="mens">Men's Beauty</option>
              <option value="women">Women's Beauty</option>
              <option value="fashion">Fashion Designer</option>
              <option value="photo">Photography</option>
            </select>
            <div className="images">
              <div className="imagesInput">
                <label htmlFor="">Cover Image</label>
                <input
                  type="file"
                  onChange={(e) => setSingleFile(e.target.files[0])}
                />
                <label htmlFor="">Upload Images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              <button onClick={handleUpload}>
                {uploading ? "uploading..." : "upload"}
              </button>
            </div>
            <label htmlFor="">Description</label>
            <textarea
              name="desc"
              id=""
              placeholder="Brief descriptions to introduce your service to customers"
              cols="0"
              rows="16"
              onChange={handleChange}
            ></textarea>
            <button onClick={handleSubmit}>Create</button>
          </div>
          <div className="details">
            <label htmlFor="">Service Title</label>
            <input
              type="text"
              placeholder="e.g. One-page web design"
              name="shortTitle"
              onChange={handleChange}
            />
            <label htmlFor="">Short Description</label>
            <textarea
              name="shortDesc"
              id=""
              placeholder="Short description of your service"
              cols="30"
              rows="10"
              onChange={handleChange}
            ></textarea>
            <label htmlFor="">Delivery Time (e.g. 3 days)</label>
            <input type="number" />
            <label htmlFor="">Revision Number</label>
            <input
              type="number"
              onChange={handleChange}
              name="revisionNumber"
            />
            <label htmlFor="">Add Features</label>
            <form action="" className="add" onSubmit={handleFeature}>
              <input type="text" placeholder="e.g. page design" />
              <button type="submit">add</button>
            </form>
            <div className="addedFeatures">
              {state?.features?.map((feature) => (
                <div className="item" key={feature}>
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURE", payload: feature })
                    }
                  >
                    {feature}
                    <span>X</span>
                  </button>
                </div>
              ))}
            </div>
            {/* <input type="text" placeholder="e.g. file uploading" />
            <input type="text" placeholder="e.g. setting up a domain" />
            <input type="text" placeholder="e.g. hosting" /> */}
            <label htmlFor="">Price</label>
            <input type="number" name="price" onChange={handleChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
