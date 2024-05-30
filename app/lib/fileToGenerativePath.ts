async function fileToGenerativePath(file: File) {
  if (file) {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          resolve((reader.result as string).split(",")[1]);
        } else {
          resolve(null);
        }
      };
      reader.readAsDataURL(file);
    });
    console.log(file);
    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
  }
  return;
}

export default fileToGenerativePath;
