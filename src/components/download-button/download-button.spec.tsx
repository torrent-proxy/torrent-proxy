import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import * as React from "react";

import DownloadButton from "../download-button/download-button.component";

configure({
  adapter: new Adapter(),
});

describe(`DownloadButton`, () => {
  it(`Should be clicked`, () => {
    const onDownloadButtonClick = jest.fn();
    const onDownloadButtonHover = jest.fn();

    const downloadButton = shallow(
        <DownloadButton
          onDownloadButtonClick={onDownloadButtonClick}
          onDownloadButtonHover={onDownloadButtonHover}
        />
    );

    const downloadButtonItem = downloadButton.find(`.download-button`);

    downloadButtonItem.simulate(`click`);
    expect(onDownloadButtonClick).toHaveBeenCalledTimes(1);
  });


  it(`Should be hovered`, () => {
    const onDownloadButtonClick = jest.fn();
    const onDownloadButtonHover = jest.fn();

    const downloadButton = shallow(
        <DownloadButton
          onDownloadButtonClick={onDownloadButtonClick}
          onDownloadButtonHover={onDownloadButtonHover}
        />
    );

    const downloadButtonItem = downloadButton.find(`.download-button`);

    downloadButtonItem.simulate(`mouseOver`);

    expect(onDownloadButtonHover).toHaveBeenCalledTimes(1);
  });
});
