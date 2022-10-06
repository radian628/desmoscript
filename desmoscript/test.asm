$DATA

a = 0
b = %random()%
c = 0
list = RANGE 1, 100

$PROGRAM

MOV a, 1

MOV a, SWITCH
    CASE b > 0.5, MOV a, 2
    DFLT, MOV a, 3
END

JMC c >= 5, 
INC a
INC c
JMP 16