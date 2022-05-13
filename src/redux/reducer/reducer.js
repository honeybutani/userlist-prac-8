const initialState = {
  firstName: "",
  PhoneNo: "",
  email: "",
  profilePicture: null,
};

const reducer = (stateing = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "LOGIN_USER":
      return {
        ...stateing,
        firstName: action.payload.firstName,
        PhoneNo: action.payload.PhoneNo,
        email: action.payload.email,
        profilePicture: action.payload.profilePicture,
      };
    default:
      return stateing;
  }
};

export default reducer;
