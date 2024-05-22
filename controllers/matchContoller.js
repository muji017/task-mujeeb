const Team = require('../models/teams');
const playersData = require('../data/players.json');
const matchData = require('../data/match.json')
const utils = require('../utils/utils')

const processResult = async (req, res) => {

    try {
        const teams = await Team.find();
        const playerResults = {};

        matchData.forEach(result => {
            const batterName = result.batter
            const bowlerName = result.bowler
            console.log(batterName)
            if (!playerResults[batterName]) playerResults[batterName] = { type: '', points: 0 };
            console.log(playerResults);
            // playerResults[playerName].points += utils.calculatePoints(result, playerResults[playerName].type);
        });

        // for (const team of teams) {
        //     let totalPoints = 0;
        //     for (const playerName of team.players) {
        //         let playerPoints = playerResults[playerName] ? playerResults[playerName].points : 0;
        //         if (playerName === team.captain) playerPoints *= 2;
        //         if (playerName === team.viceCaptain) playerPoints *= 1.5;
        //         totalPoints += playerPoints;
        //     }
        //     team.points = totalPoints;
        //     await team.save();
        // }

        res.send('Match results processed.');

    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
}

module.exports = {
    processResult
}