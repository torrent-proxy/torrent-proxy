import DownloadButton from './download-button.component';



describe(`DownloadButton`, () => {
  it(`Когда кликнешь по кнопке отработает обработчик`, () => {
    const onclick = jest.fn();

    const downloadButton = renderer.create(<DownloadButton
      onClick={onclick}
    />);

    downloadButton.simulate(`click`);

    expect(onclick).toBeCalledTimes(1);
  });

  it(`Когда курсор над кнопкой, то кнопка подсвечивается`, () => {
    const onclick = jest.fn();

    const downloadButton = renderer.create(<DownloadButton
      onClick={onclick}
    />);

    downloadButton.simulate(`hover`);
    downloadButton.update();

    expect(downloadButton).toEqual();
  });
});
