import React, { useEffect, useState } from "react";

const App = () => {
  const [title, setTitle] = useState();
  const [explanation, setExplanation] = useState();
  const [url, setUrl] = useState();
  const [date, setDate] = useState();

  const fetchData = async () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${year}-${month}-${day}`
    );
    const data = await response.json();
    const { title, explanation, url, date } = data;
    setTitle(title);
    setExplanation(explanation);
    setUrl(url);
    setDate(date);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Astronomy Picture of the Day</h1>
      <h2>{title}</h2>
      <img src={url} />
      <p>{explanation}</p>
      <span>{date}</span>
    </div>
  );
};

export default App;
