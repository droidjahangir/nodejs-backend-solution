import re

N = input()
S = input()

pattern = re.compile(r'[()]')

array_string = pattern.findall(S)

# // console.log(array_string)

stack = []
error_bracket = []



for index,item in enumerate(array_string):
    if (item == '('):
        stack.append(item)
        error_bracket.append(index+1)
    elif (item == ')'):
        if len(stack) == 0:
            error_bracket.append(index+1)
        else:
            stack.pop()
            error_bracket.pop()

if len(stack) == 0:
    print(0)
else:
    print(len(error_bracket))
    for x in range(len(error_bracket)): 
        print(error_bracket[x])
