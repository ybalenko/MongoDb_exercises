const server = require('./server');
const mongoose = require('mongoose');
const port = process.env.PORT || 2000;

mongoose.connect('mongodb://localhost/jscript-330', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    server.listen(port, () => {
        console.log(`Server is listening on http://localhost:${port}`);
    });
});
