type Bounds = {
  width: number;
  height: number;
  top: number;
  left?: number;
  right?: number;
};

type Params = {
  maskBounds: Bounds;
  objectBounds: Bounds;
  cameraBounds: Bounds;
  mirrored?: boolean;
};

const checkPositionAccuracy = ({
  maskBounds,
  objectBounds,
  cameraBounds,
  mirrored,
}: Params) => {
  let accuracy_left, accuracy_top;

  const side = mirrored ? 'right' : 'left';
  const faceCoords = {...objectBounds, [side]: objectBounds.left};

  const mask_right = cameraBounds.width - (maskBounds.left + maskBounds.width);
  const mask_bottom =
    cameraBounds.height - (maskBounds.top + maskBounds.height);

  const face_right = cameraBounds.width - (faceCoords?.left + faceCoords.width);
  const face_left = cameraBounds.width - (faceCoords?.right + faceCoords.width);
  const face_bottom =
    cameraBounds.height - (faceCoords.top + faceCoords.height);

  if (side === 'left') {
    accuracy_left =
      faceCoords.left > maskBounds.left && face_right > mask_right;
  } else {
    console.log(111111, faceCoords.right, mask_right);
    accuracy_left =
      faceCoords.right > mask_right && face_left > maskBounds.left;
  }

  accuracy_top = faceCoords.top > maskBounds.top && face_bottom > mask_bottom;

  return accuracy_left && accuracy_top;
};

export default checkPositionAccuracy;
