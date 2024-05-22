let express = require('express');
let userRoute = express();
const teamController=require('../controllers/teamController')
const matchController=require('../controllers/matchContoller')
const bodyparser=require('body-parser');
userRoute.use(bodyparser.json());
userRoute.use(bodyparser.urlencoded({extended:true}));

userRoute.get('/',(req, res)=> {
    res.send('Hello World!');
});
userRoute.post('/add-team',teamController.addTeam)
userRoute.get('/process-result',matchController.processResult)
userRoute.get('/team-result',matchController.teamResult)


module.exports = userRoute;