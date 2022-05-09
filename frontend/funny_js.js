const addCurry = (a) => {
    return (b) => {
        return (c) => {
            return a + b + c
        }
    }
}
console.log(addCurry(2)(3)(5)) // 10




!![]       // -> true
[] == true // -> false



        (![] + [])[+[]] +
    (![] + [])[+!+[]] +
    ([![]] + [][[]])[+!+[] + [+[]]] +
    (![] + [])[!+[] + !+[]];
// -> 'fail'



[] == ![]; // -> true


"foo" + +"bar"; // -> 'fooNaN'


"b" + "a" + +"a" + "a"; // -> 'baNaNa'