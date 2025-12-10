// 1
// function Character(name, power) {
//     this.name = name
//     this.power = power
// }


// Character.prototype.attack = function () {
//      console.log(`${this.name} attacks with power ${this.power}`)
// }

// const hero = new Character('hero', 50)
// const villian = new Character('villian', 40)

// hero.attack()
// villian.attack()


// Character.prototype.heal = function () {
//      console.log(`${this.name} heals and regains energy`)
// }


// hero.heal()
// villian.heal()


// 2
// const magicBox = {spell : 'FireBall', energy: 100}

// const {spell, energy, duration = 60} = magicBox

// console.log(`casting ${spell} with ${energy} energy for ${duration} seconds`);



// 3
// const scores = {Ali: 10, Sara: 15, Reza: 20}

// Object.entries(scores).forEach(([key, value])=> {
//     console.log(`${key} : ${value}`);
// })

// let topName = null
// let topScore = 0
// Object.entries(scores).forEach(([key, value])=> {
//     if(topScore < value){
//         topName = key
//         topScore = value
//     }
// })
// console.log(`${topName} has the highest score: ${topScore}`)


// 4
// const settings = {sound: true, difficulty: "hard", contorols: {jump: 'space'}}

// const clone = structuredClone(settings)
// clone.contorols.jump = 'shift'

// console.log('Orginal:', settings.contorols.jump);
// console.log('clone:', clone.contorols.jump);
