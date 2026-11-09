
import dotenv from "dotenv";
dotenv.config();

import axios from "axios";

const YOUTUBE_API_URL =
  "https://www.googleapis.com/youtube/v3/search";

const searchVideo = async (topic) => {
  try {
    const { data } = await axios.get(YOUTUBE_API_URL, {
      params: {
        key: process.env.YOUTUBE_API_KEY,
        part: "snippet",
        q: topic,
        maxResults: 5,
        type: "video",
        order: "relevance",
      },
    });

    const videos = data.items || [];

    if (videos.length === 0) {
      return null;
    }

    // Prefer FreeCodeCamp video
    const freeCodeCampVideo = videos.find((video) =>
      video.snippet.channelTitle
        .toLowerCase()
        .includes("freecodecamp")
    );

    // Otherwise, select the first available video
    const selectedVideo = freeCodeCampVideo || videos[0];

    return {
      title: selectedVideo.snippet.title,
      channel: selectedVideo.snippet.channelTitle,
      url: `https://www.youtube.com/watch?v=${selectedVideo.id.videoId}`,
      thumbnail:
        selectedVideo.snippet.thumbnails?.high?.url || "",
    };

  } catch (error) {
    console.error(
      "YouTube Search Error:",
      error.response?.data || error.message
    );

    return null;
  }
};

export default searchVideo;
