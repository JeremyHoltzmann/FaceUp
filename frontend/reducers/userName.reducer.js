export default function (userName = "", action) {
  if (action.type === "setUserName") {
    return action.userName;
  }
  return userName;
}
