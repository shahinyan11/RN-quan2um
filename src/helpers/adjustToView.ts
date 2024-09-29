import {isIos} from '@constants/deviceInfo';

type Screen = {
  width: number;
  height: number;
};

type Point = {
  x: number;
  y: number;
};

type Rect = {
  width: number;
  height: number;
  top: number;
  left: number;
};

const adjustToViewIos = (frame: Screen, view: Screen) => {
  const widthRatio = view.width / frame?.width;
  const heightRatio = view.height / frame?.height;
  return {
    adjustPoint: (point: Point) => ({
      x: point.x * widthRatio,
      y: point.y * heightRatio,
    }),
    adjustRect(rect: Rect) {
      return {
        left: rect.left * widthRatio,
        top: rect.top * heightRatio,
        width: rect.width * widthRatio,
        height: rect.height * heightRatio,
      };
    },
  };
};

const adjustToViewAndroid = (
  frame: Screen,
  view: Screen,
  landscape: boolean,
  verticalPadding: number,
  horizontalPadding: number,
) => {
  // settings up the variables
  const {width, height} = view;
  const {width: frameWidth, height: frameHeight} = frame || {};
  let aspectRatio: number;
  let widthRatio: number;
  let heightRatio: number;
  let offsetX = 0;
  let offsetY = 0;
  const topPadding = verticalPadding ? verticalPadding / 2 : 0;
  const leftPadding = horizontalPadding ? horizontalPadding / 2 : 0;
  const verticalCropPadding = verticalPadding ?? 0;
  const horizontalCropPadding = horizontalPadding ?? 0;

  if (!landscape) {
    // portrait
    /* Calculating the aspect ratio of the view. */
    aspectRatio = width / height;
    heightRatio = height / frameHeight;
    const croppedFrameWidth = aspectRatio * frameHeight;
    offsetX = (frameWidth - croppedFrameWidth) / 2;
    widthRatio = width / croppedFrameWidth;
  } else {
    // landscape
    /* Calculating the aspect ratio of the view. */
    aspectRatio = height / width;
    widthRatio = width / frameWidth;
    const croppedFrameHeight = aspectRatio * frameWidth;
    offsetY = (frameHeight - croppedFrameHeight) / 2;
    heightRatio = height / croppedFrameHeight;
  }
  /* Returning an object with two functions. */
  return {
    adjustPoint: (point: Point) => ({
      x: (point.x - offsetX) * widthRatio,
      y: (point.y - offsetY) * heightRatio,
    }),
    adjustRect: (rect: Rect) => ({
      top: (rect?.top - offsetY - topPadding) * heightRatio,
      left: (rect?.left - offsetX - leftPadding) * widthRatio,
      height: (rect?.height + verticalCropPadding) * heightRatio,
      width: (rect?.width + horizontalCropPadding) * widthRatio,
    }),
  };
};

const adjustToView = isIos ? adjustToViewIos : adjustToViewAndroid;
export default adjustToView;
