const express = require("express");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const router = express.Router();

// Guest Model
const Guest = require("../models/Guest");

router.get("/", auth, async (req, res) => {
  try {
    const guests = await Guest.find({ user: req.user.id });
    res.json(guests);
  } catch (err) {
    console.err(err.message);
    res.status(500).send("Server Error");
  }
});

router.post(
  "/",
  [
    auth,
    [
      check("name", "Please provide a name")
        .not()
        .isEmpty(),
      check("phone", "Pleas provide a phone number")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    const { name, phone, dietary, isConfirmed } = req.body;

    try {
      let guest = await Guest.findOne({ phone });
      if (guest) {
        return res.status(400).json({
          error: [{ msg: "guest with the same phone number already exits" }]
        });
      }

      guest = new Guest({
        user: req.user.id,
        name,
        phone,
        dietary,
        isConfirmed
      });
      guest = await guest.save();

      res.json(guest);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

router.delete("/:id", auth, async (req, res) => {
  try {
    let guest = await Guest.findById(req.params.id);
    if (!guest) {
      return res.status(404).json({ msg: "Guest not Found" });
    }
    await Guest.findByIdAndRemove(req.params.id);
    res.send("Guest Removed");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.put("/:id", auth, async (req, res) => {
  const { name, phone, dietary, isConfirmed } = req.body;
  const updateGuest = { name, phone, dietary, isConfirmed };

  try {
    let guest = await Guest.findById(req.params.id);
    if (!guest) {
      return res.status(404).json({ msg: "Guest not Found" });
    }

    guest = await Guest.findByIdAndUpdate(
      req.params.id,
      { $set: updateGuest },
      { new: true }
    );

    res.send(guest);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
