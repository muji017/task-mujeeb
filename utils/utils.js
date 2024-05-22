

const calculatePoints = (result, playerType) => {
    let points = 0;
  
    // Batting points
    if (result.runs) points += result.runs;
    if (result.boundary) points += result.boundary;
    if (result.six) points += result.six * 2;
    if (result.runs >= 30) points += 4;
    if (result.runs >= 50) points += 8;
    if (result.runs >= 100) points += 16;
    if (result.runs === 0 && ['BAT', 'WK', 'AR'].includes(playerType)) points -= 2;
  
    // Bowling points
    if (result.wickets) points += result.wickets * 25;
    if (result.bonusWicket) points += result.bonusWicket * 8;
    if (result.wickets >= 3) points += 4;
    if (result.wickets >= 4) points += 8;
    if (result.wickets >= 5) points += 16;
    if (result.maiden) points += 12;
  
    // Fielding points
    if (result.catch) points += result.catch * 8;
    if (result.catch >= 3) points += 4;
    if (result.stumping) points += result.stumping * 12;
    if (result.runout) points += result.runout * 6;
  
    return points;
  }

  module.exports={
    calculatePoints
  }