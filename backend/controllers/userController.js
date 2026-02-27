export const registerUser = (req, res) => {
  const { name, email, number, password } = req.body;
  if (!name || !email || !number || !password) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }

  res.send("registed successfully!");
};
