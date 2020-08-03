import React, { useEffect, useState } from "react";

const IMAGE_MEDIA_TYPE = 'image'

const App = () => {
  const [title, setTitle] = useState();
  const [explanation, setExplanation] = useState();
  const [url, setUrl] = useState();
  const [date, setDate] = useState();
  const [isImage, setIsImage] = useState();

  const fetchData = async () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${year}-${month}-${day}`
    );
    const data = await response.json();
    const { title, explanation, url, date, media_type } = data;
    setTitle(title);
    setExplanation(explanation);
    setUrl(url);
    setDate(date);
    setIsImage(media_type === IMAGE_MEDIA_TYPE)
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Astronomy Picture of the Day</h1>
      <h2>{title}</h2>
      {isImage && <img src={url} />}
      {!isImage && <iframe src={url} />}
      <p>{explanation}</p>
      <span>{date}</span>
    </div>
  );
};

export default App;
