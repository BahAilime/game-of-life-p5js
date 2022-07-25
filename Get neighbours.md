# Get neighbours

0,0 1,0 2,0
0,1 1,1 2,1
0,2 1,2 2,2

1,1 -> [5]
check -> 0-4 + 6-9


0,0   1,0   2,0   3,0   4,0   5,0

0,1   1,1   2,1   3,1   4,1   5,1

0,2   1,2   2,2   3,2   4,2   5,2

0,3   1,3   2,3   3,3  (4,3)  5,3

0,4   1,4   2,4  [3,4]   4,4   5,4

0,5   1,5   2,5   3,5   4,5   5,5


## 3,4 -> i27

4*largeur+3+1

4 vient de 3,4
largeur est le nb de cells en largeur
3 vient de 3,4
+1 car commence de 0


## 4,3 depuis 3,4

retirer 1* la y +1