const File = require("../models/File");
const Box = require("../models/Box");
const User = require("../models/User");
class FileController {
  async store(req, res) {
    // Criar arquivogit
    const file = await File.create({
      title: req.file.originalname,
      path: req.file.key
    });
    try {
      const user = await User.findById(req.params.id);
      user.files.push(file);
      await user.save();
      req.io.sockets.in(user._id).emit("file", file);
      return res.json(file);
    } catch {
      try {
        const boxes = await Box.findById(req.params.id);
        boxes.files.push(file);
        await boxes.save();
        req.io.sockets.in(boxes._id).emit("file", file);
        return res.json(file);
      } catch (err) {
        return res.status(400).send({ error: "ID not found" });
      }
    }
  }
}

module.exports = new FileController();
