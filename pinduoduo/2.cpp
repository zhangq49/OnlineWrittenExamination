#include <iostream>
#include <cstring>
using namespace std;

int calNumberOfNew(char* str, int len) {
    if (len == 0) return 0;
    if (len == 1) return 1;
    if (str[0] == '0') {
        if (str[len - 1] == '0')
            return 0;
        return 1;
    }
    
    if (str[len - 1] == '0')
        return 1;
    
    return len;
}

int main() {
    int len, count = 0;
    char str[11];
    
    cin >> str;
    len = strlen(str);
    
    if (len <= 1) {
        printf("0\n");
        return 0;
    }
    
    for (int i = 1; i < len; i++) {
        int num1 = calNumberOfNew(str, i);
        int num2 = calNumberOfNew(str + i, len - i);
        count += num1 * num2;
    }
    
    printf("%d\n", count);
    
    return 0;
}