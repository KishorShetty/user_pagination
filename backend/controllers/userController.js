const userModel = require("../models/userModel");
const Pagination = require("../pagination");

exports.registerUser = async (req, res) => {
  try {
    // console.log(`register Called with name ${req.body.name} and email ${req.body.email}`);
    const user = await userModel.create(req.body);
    // we can also use const us = new userModel(user) and await us.save()
    //get data from the body
    //I think we can also send createdAt from here. But here it's included in the model.
    // passing the user and email from here
    //201 created
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "data Error",
    });
  }
};

//not included in the routes. early stage getUsers
exports.old_getUsers = async (req, res) => {
  //implementing pagination
  try {
    const user = await userModel.find({});
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "data Error",
    });
  }
};

exports.getUsers = async (req, res) => {
  const usersPerPage = 5;
  try {
    console.log("called getUSers");
    //count User
    const userCount = await userModel.countDocuments();
    //find
    const paginatedResults = new Pagination(
      userModel.find(),
      req.query.page
    ).pagination(usersPerPage);
    // const user = await userModel.find({}); we're replacing the query with paginated one.
    const user = await paginatedResults.query; //we're returning this in Pagination class. so access the query
    console.log(user);
    res.status(201).json({
      success: true,
      user,
      userCount,
      usersPerPage
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `data Error\n Error: ${error} `,
    });
  }
};

exports.getSingleUser = async (req, res) => {
  const user = await userModel.findById(req.params.id);

  if (!user) {
    res.status(400).json({
      success: false,
      message: "user not found",
    });
  }
  res.status(200).json({
    success: true,
    user,
  });
};

exports.updateUser = async (req, res) => {
  //update
  // console.log(`update user called with ${typeof(req.params.id)} ${req.params.id}`)
  let user = await userModel.findById(req.params.id);
  if (!user) {
    res.status(400).json({
      success: false,
      message: "user not found",
    });
  }
  
  user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }); // try 3rd par new:true and runVal: this will give the updated value in response
  console.log(user); // res after the update
  
  res.status(200).json({
    success: true,
    user,
  });
};
