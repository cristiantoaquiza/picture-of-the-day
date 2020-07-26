import React from "react";
import { create, act } from "react-test-renderer";
import App from "../App";

global.fetch = jest.fn();

describe("App", () => {
  const data = {
    date: "2020-07-25",
    explanation: "some large explanation here",
    title: "some title here",
    url: "http://the-url-here",
  };

  const response = {
    json: () => Promise.resolve(data),
  };

  beforeEach(() => {
    fetch.mockClear();
    fetch.mockResolvedValue(response);
  });

  it("should get picture of the day data from NASA api", async () => {
    await act(async () => {
      await create(<App />);
    });

    expect(fetch).toBeCalledTimes(1);
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

  it("should render the url on a image tag", async () => {
    let appComponent;
    await act(async () => {
      appComponent = await create(<App />);
    });
    const root = appComponent.root;

    const image = root.findByType("img");

    expect(image.props.src).toBe(data.url);
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
