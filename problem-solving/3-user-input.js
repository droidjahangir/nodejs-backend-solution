const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// rl.question("What is your name ? ", function(name) {
//     rl.question("Where do you live ? ", function(country) {
//         console.log(`${name}, is a citizen of ${country}`);
//         rl.close();
//     });
// });



rl.question("", function(N) {
    rl.question("", function(S) {

        // console.log('output : ' + input_string.match(/[()]/g))

        var array_string = S.match(/[()]/g)

        // console.log(array_string)

        var stack = []
        var error_bracket = []
        // function stack_function(item){
        //     if (item == '('){
        //         stack.push(item)
        //     }else if (item == ')'){
        //         stack.pop();
        //         stack.pop()
        //     }
        // }

        
        array_string.map(function(item, index){
            if (item == '('){
                stack.push(item)
                error_bracket.push(index+1)
            }else if (item == ')'){
                if (length(stack) == 0){
                    error_bracket.push(index+1)
                }else{
                    stack.pop();
                    error_bracket.pop()
                }
            }
        });


        if(stack.length != 0){
            console.log(error_bracket.length);
            error_bracket.map(function(item){
                console.log(item)
            })
            // return true;
        }else if (stack.length == 0){
            console.log(0);
            // return false;
        }

        // console.log(stack)


        // console.log(`${name}, is a citizen of ${country}`);
        rl.close();
    });
});


rl.on("close", function() {
    process.exit(0);
});

// value.indexOf(true)