import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import DownloadButton from "../download-button/download-button.component";

configure({
  adapter: new Adapter(),
});

const mockEvent = {
  preventDefault() {
    () => {};
  }
};

describe(`DownloadButton`, () => {
  it(`DownloadButton should be clicked`, () => {
    const onDownloadButtonClick = jest.fn();
    const onDownloadButtonHover = jest.fn();

    const downloadButton = shallow(
      <DownloadButton
      onDownloadButtonClick={onDownloadButtonClick}
      onDownloadButtonHover={onDownloadButtonHover}
      />
    );

    const downloadButtonItem = downloadButton.find('.download-button');

    downloadButtonItem.simulate(`click`, mockEvent);
    expect(onDownloadButtonClick).toHaveBeenCalledTimes(1);
  });


  it(`DownloadButton should be hovered`, () => {
    const onDownloadButtonClick = jest.fn();
    const onDownloadButtonHover = jest.fn();

    const downloadButton = shallow(
      <DownloadButton
      onDownloadButtonClick={onDownloadButtonClick}
      onDownloadButtonHover={onDownloadButtonHover}
      />
    );

    const downloadButtonItem = downloadButton.find('.download-button');

    downloadButtonItem.simulate(`mouseOver`, mockEvent);

    expect(onDownloadButtonHover).toHaveBeenCalledTimes(1);
  });
});
