const useObjectDetection = () => {
  return {
    isFit: true,
    objects: [],
    frameProcessor: null,
    onMaskLayout: null,
    onContainerLayout: null,
  };
};

export default useObjectDetection;
