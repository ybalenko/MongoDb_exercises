const Widgets = require('../models/widgets');

module.exports = {};

module.exports.create = async (widget) => {
    //create widget document in the DB
    return await Widgets.create(widget);

};

module.exports.getById = async (id) => {
    //look up widget in the DB and return it
    return await Widgets.findOne({ _id: id }).lean();
};

module.exports.updateById = async (id, widget) => {
    await Widgets.updateOne({ _id: id }, widget).lean();
}

module.exports.deleteById = async (id) => {
    await Widgets.deleteOne({ _id: id });
}
