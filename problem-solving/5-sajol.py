N = list(map(int,input().split())) 
M = list(map(int,input().split())) 
C = list(map(int,input().split())) 

# print(N)
# print(M)
# print(C)

N.sort()
M.sort()
C.sort()

# print('after sorted')

# print(N)
# print(M)
# print(C)

# print('Budged : ', N[-1])

maximum_coolness = []

for M_index,M_item in enumerate(M):
    for C_index,C_item in enumerate(C):
        # print(M_index, M_item, C_index, C_item)
        if (M_item+C_item) <= N[-1] :
            coolness = M_index+C_index
            maximum_coolness.append(coolness)
        


if len(maximum_coolness) != 0:
    maximum_coolness.sort()
    print(maximum_coolness[-1])
else:
    print('E kemon aynabaji!!!')
