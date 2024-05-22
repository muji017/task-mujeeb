require('dotenv').config();
const express = require('express');
const mongoose=require('mongoose')
const app = express();
const port = process.env.PORT;
const connectDB=require('./connect_db')
const teamController=require('./controllers/teamController')
const matchController=require('./controllers/matchContoller')

connectDB()

// Endpoints

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.post('/add-team',teamController.addTeam)
app.get('/process-result',matchController.processResult)
app.get('/team-result',matchController.teamResult)

//
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});