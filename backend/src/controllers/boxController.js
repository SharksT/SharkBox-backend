const Box = require('../models/Box');

class BoxController{
    async store(req,res) {
        box = await Box.create({title : 'Tes'});
        
        return res.json(box);
    }
}

module.exports = new BoxController();