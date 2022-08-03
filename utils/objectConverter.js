const objectConverter = (user) => {
  let userDetails = [];

  user.forEach((element) => {
    let data = {
      name: element.name,
      userId: element.userId,
      userStatus: element.userStatus,
      userType: element.userType,
      email: element.email,
    };
    userDetails.push(data);
  });

  return userDetails;
};
module.exports = { objectConverter };
