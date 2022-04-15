// export const host = "http://localhost:5000";
export const host = "https://chat-application-be.herokuapp.com";

export const registerRoute = `${host}/api/v1/auth/register`;
export const loginRoute = `${host}/api/v1/auth/login`;
export const setAvatarRoute = `${host}/api/v1/auth/setAvatar`;
export const allUsersRoute = `${host}/api/v1/auth/allUsers`;
export const sendMessageRoute = `${host}/api/v1/messages/addmsg`;
export const getAllMessagesRoute = `${host}/api/v1/messages/getmsg`;
