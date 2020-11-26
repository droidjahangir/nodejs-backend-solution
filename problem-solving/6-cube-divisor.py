
from math import sqrt

N = input()
# A = list(map(int,input().split())) 

A = []

for x in range(int(N)):
    line = input()
    if line:
        A.append(int(line))
    else:
        break

# print('Output : ')
# print(lines)
# print(text)

P = 1
for x in A:
    P = P*x

# factor = []
# def produce_factors(x):
#     # print("The factors of",x,"are:")
#     for i in range(1, x + 1):
#        if x % i == 0:
#            factor.append(i)

def produce_factors(x):
    factor = set()
    for i in range(1, int(sqrt(x))+1):
        if x%i == 0:
            factor.add(i)
            factor.add(x//i)
    return list(factor)



factor = produce_factors(P)




# cube check
cube_divisor = []

for item in factor:
    if item == 1:
        continue
    value = item**(1/3)
    value = int(round(value))
    if value**3 == item:
        cube_divisor.append(value**3)
    
# print cube divisor amount
print(len(cube_divisor))

# print item
# print(cube_divisor)