import React from "react";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { VideosContext } from "../context/VideosContext";
import { fetchSingleVideo, deleteVideo } from "../helpers/fetching";
import EditVideo from "./EditVideo";

export default function VideoCard() {
  const { selectedVideo, setSelectedVideo } = useContext(VideosContext);
  const { videoId } = useParams();
  const navigate = useNavigate();

  // const [isEditing, setIsEditing] = useState(false);

  // const [isOpen, setIsOpen] = useState(false);

  async function handleSave(videoId) {
    //   try {
    //     const response = await fetchSingleVideo(videoId);
    //     console.log("response: ", response);
    //     if (response) {
    //       setSelectedVideo(response);
    //     } else {
    //       console.error("cannot save");
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }

    const handleDelete = async (videoId) => {
      try {
        const result = await deleteVideo(videoId);
        console.log("deleted video: ", result);
        navigate("/allvideos");
      } catch (error) {
        console.error(error);
      }
    };

    // Return to all videos
    const handleReturnToVideos = () => {
      navigate("/allvideos");
    };

    return (
      // View single video class
      <div id="single-video-container">
        <div id="single-video-card">
          <h3>{selectedVideo.instructor_name}</h3>
          <img src={selectedVideo.imageURL}></img>
          <h4>{selectedVideo.instructorBio}</h4>
          <p>Style: {selectedVideo.style}</p>
          <p>Level: {selectedVideo.level}</p>
          <iframe
            width="560"
            height="315"
            src={selectedVideo.videoURL}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          {/* <div className="editing-video-form">
        <EditVideo />
      </div> */}
          {/* Buttons to save, delete, edit/update, return to all videos */}
          <div className="edit-button-container">
            <button className="card-button" onClick={handleSave}>
              Save me
            </button>

            <button
              className="card-button"
              onClick={() => handleDelete(videoId)}
            >
              Delete me
            </button>
            <button className="card-button" onClick={handleReturnToVideos}>
              Return to All Classes
            </button>
          </div>
        </div>

        {/* EditVideo form */}

        <div id="editing-card">
          <EditVideo />
        </div>
      </div>
    );
  }
}
