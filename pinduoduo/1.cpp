#include <iostream>
#include <cstring>
#include <cmath>
using namespace std;
int main() {
    char str[40 + 1];
    cin >> str;
    int k = strlen(str) / 4;
    char square[k + 1][k + 1];
    for (int i = 0; i <= k; i++)
        for (int j = 0; j <= k; j++)
            square[i][j] = 'a';
    int i;
    for (i = 0; i < k; i++)
        square[0][i] = str[i];
    for (int j = 0; j < k; j++)
        square[j][k] = str[i++];
    for (int j = k; j >= 1; j--)
        square[k][j] = str[i++];
    for (int j = k; j >= 1; j--)
        square[j][0] = str[i++];
    
    for (int i = 0; i <= k; i++) {
        for (int j = 0; j <= k; j++)
            printf("%c", square[i][j]);
        printf("\n");
    }
    
    printf("\n");
    
    return 0;
}