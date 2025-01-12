const { fifaData } = require('./fifa.js')

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note, you may want to filter the data first 😉*/

//(a) Home Team name for 2014 world cup final
const finals2014 = fifaData.filter(function(item){
    return item.Stage === `Final` && item.Year === 2014;
});
//console.log('Task a' ,finals2014[0],['Home Team Name']);

//(b) Away Team name for 2014 world cup final
//console.log('task 1a', finals2014[0]['Away Team Name'])

//(c) Home Team goals for 2014 world cup final
//console.log('task 1b', finals2014[0], ['Home Team goals'])

//(d) Away Team goals for 2014 world cup final
//console.log('task 1c', finals2014[0],['Away Team Goals'])

//(e) Winner of 2014 world cup final */
//console.log('task e', finals2014[0], ['Win conditions'])

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive data as a parameter
2. Return an array of objects with the data of the teams that made it to the final stage

hint - you should be looking at the stage key inside of the objects
*/

function getFinals(data) {
   const allFinals = data.filter(item => item.Stage === 'Final')
   return allFinals;
}
// console.log('Task 2', getFinals(fifaData));



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array
2. Receive a callback function getFinals from task 2 
3. Return an array called years containing all of the years in the getFinals data set*/

function getYears(array,cb) {
     const years = cb(array).map(item => item.Year)
     return years;
    
}

// console.log('Task 3', getYears(fifaData, getFinals));


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receives an array
2. Receives the callback function getFinals from task 2 
3. Determines the winner (home or away) of each `finals` game. 
4. Returns the names of all winning countries in an array called `winners` */ 
//use map
// use a condition if else
function getWinners(array ,callback) {
    
    const winners = callback(array).map(item => item['Home Team Goals'] > item['Away Team Goals'] ? item['Home Team Name']: item['Away Team Name'])
    return winners;
}
// console.log('Task 4',getWinners(fifaData, getFinals))



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array
2. Receive a callback function getFinals from task 2
3. Receive a callback function getYears from task 3
4. Receive a callback function getWinners from task 4
5. Return an array of strings that say "In {year}, {country} won the world cup!" 

hint: the strings returned need to exactly match the string in step 4.
 */

function getWinnersByYear(array,getFinals , getYears, getWinners) {

    const years = getYears(array, getFinals)
    const countries = getWinners(array, getFinals)
return years.map((year ,i ) => [year , countries[i]]).map(([year,country]) => `In ${year}, ${country} won the world cup!`)
// const yearAndCountries = yearAndWinner.map(([year,country]) => `In ${year}, ${country} won the world cup!`)
// return yearAndCountries;
}



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function getAverageGoals to do the following: 
 1. Receive the callback function getFinals from task 2 ensure you pass in the data as an argument
 2. Return the the average number of the total home team goals and away team goals scored per match and round to the second decimal place. 
 
 (Hint: use .reduce and do this in 2 steps) 
 
 Example of invocation: getAverageGoals(getFinals(fifaData));
*/

function getAverageGoals(callback) {
   const AverageGoals = callback.reduce((last_value,current_value) => 
    last_value + current_value['Home Team Goals'] + current_value['Away Team Goals'] 
    ,0
   );
   return (AverageGoals/callback.length).toFixed(2);
   
    
}
//console.log(getAverageGoals(getFinals(fifaData)));



/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
// Create a function called `getCountryWins` that takes the parameters `data` and 
// `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` 
*/
function getCountryWins(array, initials) {
    
    const winnerCountries = fifaData.filter((item ) => item.Stage === 'Final');
    // console.log( winnerCountries.filter(i => i["Home Team Initials"] === "ITA" || i["Away Team Initials"] === "ITA"))
    return winnerCountries.reduce((count, matchInfo) => {
        const homeTeam = { score: matchInfo["Home Team Goals"], initials: matchInfo["Home Team Initials"]}
        const awayTeam = { score: matchInfo["Away Team Goals"], initials: matchInfo["Away Team Initials"]}
        if (homeTeam.initials === initials && homeTeam.score > awayTeam.score) {
            return count + 1;
        } else if (awayTeam.initials === initials && awayTeam.score > homeTeam.score) {
            return count + 1;
        } else if (homeTeam.score === awayTeam.score) {
            const name = homeTeam.initials === initials ? matchInfo['Home Team Name'] : matchInfo['Away Team Name'];
            return count + (matchInfo["Win conditions"].startsWith(`${name} win`) ? 1 : 0)

        }
        return count;
    }, 0)
    // const initialsOfWinners = winnerCountries.map((item) =>  item['Home Team Goals'] > item["Away Team Goals"] ? item['Home Team Initials']: item['Away Team Initials'] )
    // return initialsOfWinners
    // .filter(winnerInitials => winnerInitials === initials)
    // .reduce((count) => count + 1, 0)
    // return initialsOfWinners.reduce((winnerCountsByCountryInitials, initials) => {
    //     const numberOfWins = winnerCountsByCountryInitials[initials]
    //     const incrementedWins = typeof numberOfWins === "number" ? numberOfWins + 1 : 1;
    //     winnerCountsByCountryInitials[initials] = incrementedWins;
    //     return winnerCountsByCountryInitials;
    // }, { /* [brazil initials]: # of wins, [england initials]: number of wins */})
//   console.log(getInitials);

}
console.log(getCountryWins(fifaData,'ENG'))


/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(/* code here */) {

    /* code here */

}


/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    /* code here */

}


/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */


/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo(){
    console.log('its working');
    return 'bar';
}
foo();
module.exports = {
    foo,
    getFinals,
    getYears,
    getWinners,
    getWinnersByYear,
    getAverageGoals
}
