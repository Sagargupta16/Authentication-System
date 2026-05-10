const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    // Joi has now validated these are strings; coerce defensively for NoSQL safety
    const firstName = String(req.body.firstName);
    const lastName = String(req.body.lastName);
    const email = String(req.body.email).toLowerCase();

    const user = await User.findOne({ email });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already Exist!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(String(req.body.password), salt);

    // Whitelist fields to prevent mass assignment (e.g. client injecting isAdmin)
    await new User({ firstName, lastName, email, password: hashPassword }).save();
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
