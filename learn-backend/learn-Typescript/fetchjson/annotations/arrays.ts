const carMakers = ['ford','honda']

console.log(carMakers)

const twoD :number[][]=[[1,2,3],[4,5,6]]

console.log(twoD[1][2])

carMakers.map((car:string):string=>car.toUpperCase())

const someDates : (Date | string)[]=[]
someDates.push(new Date())
someDates.push("blah blah")

console.log(someDates)
