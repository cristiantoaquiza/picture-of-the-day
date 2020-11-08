import React from "react";
import { create, act } from "react-test-renderer";
import { render, waitFor } from '@testing-library/react'
import App from "../App";

global.fetch = jest.fn();

describe("AppTestRenderer", () => {
  const data = {
    date: "2019-06-22",
    explanation: "some large explanation here",
    title: "some title here",
    url: "http://the-url-here",
  };

  const response = { json: () => Promise.resolve(data) };

  beforeEach(() => {
    fetch.mockClear();
    fetch.mockResolvedValue(response);
  });

  it("should get picture of the day data from NASA api", async () => {
    global.Date.prototype.getDate = jest.fn().mockReturnValue(22);
    global.Date.prototype.getFullYear = jest.fn().mockReturnValue(2019);
    global.Date.prototype.getMonth = jest.fn().mockReturnValue(5);

    await act(async () => {
      await create(<App />);
    });

    expect(fetch).toBeCalledTimes(1);
    expect(fetch).toBeCalledWith(
      "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2019-6-22"
    );
  });

  it("should render the title on a header tag", async () => {
    let appComponent;
    await act(async () => {
      appComponent = await create(<App />);
    });
    const root = appComponent.root;

    const header = root.findByType("h2");

    expect(header.props.children).toBe(data.title);
  });

  it("should render the url on an image tag when media type is image", async () => {
    const dataWithImage = { ...data, media_type: "image" };
    const response = { json: () => Promise.resolve(dataWithImage) };
    fetch.mockResolvedValue(response);
    let appComponent;
    await act(async () => {
      appComponent = await create(<App />);
    });
    const root = appComponent.root;

    const image = root.findByType("img");
    const iframeElements = root.findAllByType("iframe");

    expect(image.props.src).toBe(data.url);
    expect(iframeElements.length).toBe(0);
  });

  it("should render the url on an iframe tag when media type is video", async () => {
    const dataWithVideo = { ...data, media_type: "video" };
    const response = { json: () => Promise.resolve(dataWithVideo) };
    fetch.mockResolvedValue(response);
    let appComponent;
    await act(async () => {
      appComponent = await create(<App />);
    });
    const root = appComponent.root;

    const iframe = root.findByType("iframe");
    const imgElements = root.findAllByType("img");

    expect(iframe.props.src).toBe(data.url);
    expect(imgElements.length).toBe(0);
  });

  it("should render the explanation on a paragraph tag", async () => {
    let appComponent;
    await act(async () => {
      appComponent = await create(<App />);
    });
    const root = appComponent.root;

    const paragraph = root.findByType("p");

    expect(paragraph.props.children).toBe(data.explanation);
  });

  it("should render the date on a span tag", async () => {
    let appComponent;
    await act(async () => {
      appComponent = await create(<App />);
    });
    const root = appComponent.root;

    const span = root.findByType("span");

    expect(span.props.children).toBe(data.date);
  });
});

describe('AppTestingLibrary', () => {
  const data = {
    date: "2019-06-22",
    explanation: "some large explanation here",
    title: "some title here",
    url: "http://the-url-here",
  };

  const response = { json: () => Promise.resolve(data) };

  beforeEach(() => {
    fetch.mockClear();
    fetch.mockResolvedValue(response);
  });

  it('should show picture of the day data got from NASA API', async () => {
    global.Date.prototype.getDate = jest.fn().mockReturnValue(22);
    global.Date.prototype.getFullYear = jest.fn().mockReturnValue(2019);
    global.Date.prototype.getMonth = jest.fn().mockReturnValue(5);

    const { getByText } = render(<App />)
    const title = await waitFor(() => getByText(data.title))
    const explanation = await waitFor(() => getByText(data.explanation))
    const date = await waitFor(() => getByText(data.date))

    expect(fetch).toBeCalledTimes(1);
    expect(fetch).toBeCalledWith(
      "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2019-6-22"
    );
    expect(title).toBeDefined()
    expect(explanation).toBeDefined()
    expect(date).toBeDefined()
  })
})
