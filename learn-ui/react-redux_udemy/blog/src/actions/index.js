import JsonPlaceholder from "../apis/JsonPlaceholder";

//For shorthand notation for the fetchPosts action, refer to fetchUser action
export const fetchPosts = () => {
  return async function (dispatch, getState) {
    console.log("Going to make .get(posts) API call");
    const response = await JsonPlaceholder.get("/posts");
    dispatch({ type: "FETCH_POSTS", payload: response.data });
  };
};

export const fetchUser = (id) => async (dispatch, getState) => {
  console.log(getState());
  //   const user = users.find((user) => user === user.id);
  //   if (user) {
  //     console.log(`Not going to make .get(/users/id) API call for ${id}`);
  //     return null;
  //   }
  console.log("Going to make .get(/users/id) API call");
  const response = await JsonPlaceholder.get(`/users/${id}`);
  dispatch({ type: "FETCH_USER", payload: response.data });
};
