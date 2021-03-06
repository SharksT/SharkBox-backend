const Box = require("../models/Box");
const User = require("../models/User");
class BoxController {
  async store(req, res) {
    const box = await Box.create(req.body);
    try {
      const user = await User.findById(req.params.id);
      user.boxes.push(box);
      await user.save();
      req.io.sockets.in(user._id).emit("box", box);
      return res.json(user);
    } catch {
      try {
        const boxes = await Box.findById(req.params.id);
        boxes.boxes.push(box);
        await boxes.save();
        req.io.sockets.in(boxes._id).emit("box", box);
        return res.json(boxes);
      } catch (err) {
        return res.status(400).send({ error: "ID not found" });
      }
    }
  }

  async show(req, res) {
    const box = await Box.findById(req.params.id).populate({
      path: "files",
      options: { sort: { createdAt: -1 } }
    });
    return res.json(box);
  }

  async showBoxes(req, res) {
    var populateQuery = [
      { path: "boxes", options: { sort: { createdAt: -1 } } },
      { path: "files", options: { sort: { createdAt: -1 } } }
    ];
    const user = await User.findById(req.params.id).populate(populateQuery);
    if (user !== null) {
      return res.json(user);
    } else {
      const box = await Box.findById(req.params.id).populate(populateQuery);
      return res.json(box);
    }
  }
  async delete(req, res) {
    try {
      await Box.findByIdAndRemove(req.params.id, (err, res2) => {
        if (res2 == null && err == null) {
          return res.status(400).send({ error: "File not found" });
        } else {
          return res.json("Deleted sucessfully");
        }
      });
    } catch {
      return res.status(400).send({ error: "File not found" });
    }
  }
}

module.exports = new BoxController();
