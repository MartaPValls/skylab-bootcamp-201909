
 /**
 * Invert the order of the elements of an array in place, the first element becomes the last and the last
 * becomes the first.
 * 
 * @param {Array} array The array to evaluate elements to the condition given 
 * 
 * @returns {Array} returns the array inverted
 * 
 *  
 */




function reverse(array) {
    var reversed = [];
    
    for (let i = 0; i < array.length; i++) {
        reversed[i] = array[array.length - i - 1];
       
    }
    return reversed;
}




console.log('DEMO reverse');

var lenguajes = ["PHP", "C", "C#", ".Net", "Java", "JavaScript", "C++", "HTML"];
console.log(lenguajes);

console.log('should reverse the order of the items of the array');
reverse(lenguajes);


