// single input

function main() {
    var n = parseInt(readLine());
    var strN = n.toString();//<-- Convert int n to string
    for(var i=1;i<=10;i++) {
        process.stdout.write(strN+" x "+i+" = "+n*i);//<-- formatting the 
                                                     //question requires
        process.stdout.write("\n");//<-- newline
    }
}




// multiple output

// function main(input) {
//     //Enter your code here
//     var data = input.split('\n');
//     var firstLine = data[0].split(' ');
//     var len = firstLine[0];
//     //process.stdout.write('length:'+len);
//     var toFind = firstLine[1];
//     //process.stdout.write('toFind:'+toFind);
//     //process.stdout.write('\n');
//     var arr = data[1].split(' '); 
//     //process.stdout.write(arr);
//     for(var i=len-1;i>=0;i--) {
//         if(arr[i] == toFind){
//             process.stdout.write(i+1);
//             return;
//         }
//     }
//     process.stdout.write(-1);
// }

// 5 1
// 1 2 3 4 1



    var array_string = S.match(/[()]/g)

    // console.log(array_string)

    var stack = []
    var error_bracket = []

    array_string.map(function(item, index){
        if (item == '('){
            stack.push(item)
            error_bracket.push(index+1)
        }else if (item == ')'){
            stack.pop();
            // stack.pop()
            error_bracket.pop()
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