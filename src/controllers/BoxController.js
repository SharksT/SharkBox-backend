const Box = require("../models/Box");
const User = require("../models/User");
class BoxController {
  async store(req, res) {
    const box = await Box.create(req.body);
    try {
      const user = await User.findById(req.params.id);
      user.boxes.push(box);
      await user.save();
      return res.json(user);
    } catch {
      try {
        const boxes = await Box.findById(req.params.id);
        boxes.boxes.push(box);
        await boxes.save();
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
    const user = await User.findById(req.params.id).populate({
      path: "boxes",
      options: { sort: { createdAt: -1 } }
    });
    return res.json(user);
  }
}

module.exports = new BoxController();