export default function (imagesUrl = [], action) {
  console.log("🚀 ~ file: imagesUrl.reducer.js ~ line 2 ~ action", action);
  if (action.type === "setImageUrl") {
    var tmpImages = [...imagesUrl];
    tmpImages.push(action.image);
    console.log(
      "🚀 ~ file: imagesUrl.reducer.js ~ line 8 ~ tmpImages",
      tmpImages
    );
    return tmpImages;
  }
  return imagesUrl;
}
