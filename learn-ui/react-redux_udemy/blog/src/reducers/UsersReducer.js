export default (users = [], action) => {
  switch (action.type) {
    case "FETCH_USER":
      const newUsers = users.map((e) => e);
      newUsers.push(action.payload);
      return newUsers;
    default:
      return users;
  }
};
