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
      req.io.sockets.in(box._id).emit("file", file);
      return res.json(file);
    } catch {
      return res.status(400).send({ error: `${user}` });
      try {
        const box = await Box.findById(req.params.id);
        box.files.push(file);
        await box.save();
        req.io.sockets.in(box._id).emit("file", file);
        return res.json(file);
      } catch (err) {
        return res.status(400).send({ error: "ID not found" });
      }
    }
  }
}

module.exports = new FileController();
