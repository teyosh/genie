var genie = require('genie'),
config = require('./app/config/'+genie.getEnv()),
app = genie.createApplication(__dirname, config);

app.init();
app.listen();
