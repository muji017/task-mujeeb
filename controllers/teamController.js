const Team = require('../models/teams');
const playersData = require('../data/players.json');

const addTeam = async (req, res) => {
    try {
        // const { teamName, players, captain, viceCaptain } = req.body;
        const teamName = 'My team4'
        const players = ["RD Gaikwad", "M Prasidh Krishna", 'MM Ali', "MS Dhoni", "OC McCoy", "Simarjeet Singh", "Mukesh Choudhary",
            "PH Solanki", "Deepak Chahar", "Karun Nair", "Shivam Dube"
        ]
        const captain = 'MS Dhoni'
        const viceCaptain = 'Shivam Dube'
        // checking teamName duplication
        const existTeam= await Team.find({teamName:teamName})
        if(existTeam.length>0){
            return res.status(400).json({ msg: `${teamName} is already exsist` });
        }
        // Checking players duplication
        const uniquePlayers = new Set(players)
        if (uniquePlayers.size !== players.length) {
            return res.status(400).json({ msg: 'Players should be unique' });
        }

        // Validate team size
        if (players.length !== 11) {
            return res.status(400).json({ msg: 'Team must have exactly 11 players.' });
        }

        // Validate captain and vice-captain
        if (!players.includes(captain) || !players.includes(viceCaptain)) {
            return res.status(400).json({ msg: 'Captain and vice-captain must be in the team.' });
        }

        // Initialize role counter and team counter

        const roles = { WK: "WICKETKEEPER", BAT: "BATTER", AR: "ALL-ROUNDER", BWL: "BOWLER" }
        const roleCounter = { WK: 0, BAT: 0, AR: 0, BWL: 0 };
        const teamCounter={}

        // Validate player roles rules

        let playersDict = {};
        playersData.forEach(player => {
            playersDict[player.Player] = player;
        });
        const playerDocs = []
        const errors = []
        players.forEach((playerName) => {
            const player = playersDict[playerName];
            if (!player) {
                errors.push(`Player ${playerName} does not exist`)
                return
            }
            let role
            for (let ele in roles) {
                if (roles[ele] == player.Role) {
                    role = ele
                }
            }
            // Increment role counter
            roleCounter[role]++;
            teamCounter[player.Team] = (teamCounter[player.Team] || 0) + 1;
            playerDocs.push(player)
        });
        if (errors.length > 0) {
            return res.status(400).json({ msg: errors[0] });
        }
        // console.log(playerDocs,"ssaa");
        console.log(roleCounter);

        const roleConstraints = { WK: [1, 8], BAT: [1, 8], AR: [1, 8], BWL: [1, 8] };
        console.log(roleConstraints);
        for (const [role, [min, max]] of Object.entries(roleConstraints)) {
            // console.log("hgshagahg");
            if (roleCounter[role] < min || roleCounter[role] > max) {
                return res.status(400).json({ msg: `Invalid number of ${roles[role]}s. ` });
            }
        }
        // checking team count
        console.log(teamCounter)
        if (Object.values(teamCounter).some(count => count > 10)) {
            return res.status(400).json({ msg: 'Cannot have more than 10 players from a single team.' });
          }
        // saving team to database
        const newTeam = new Team({
            teamName,
            players,
            captain,
            viceCaptain,
        });
        await newTeam.save();

        return res.status(200).json({ msg: "New Team added", newTeam })

    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
}
module.exports = {
    addTeam
};