const getImageType = filePath => {
  const fileName = filePath.split('/').pop();
  const fileExtension = fileName.split('.').pop();

  return `image/${fileExtension}`;
};

export default getImageType;
