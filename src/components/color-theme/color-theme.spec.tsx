import React from "react";
import {configure, mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ColorTheme from "../color-theme/color-theme.component";

configure({
  adapter: new Adapter()
});

const mockEvent = {
  preventDefault() {
    () => {};
  }
};

it('Color theme should be clicked', () => {
  const onColorClick = jest.fn();

  const colorTheme = mount(
    <ColorTheme
    onColorClick={onColorClick}
    />
  );

  const colorThemeItem = colorTheme.find(`.color-theme__text`);

  colorThemeItem.simulate(`click`, mockEvent);
  expect(onColorClick).toHaveBeenCalledTimes(1);
});
