#include <iostream>
#include <string>

using namespace std;

int main() {
    string str;
    cin >> str;
    
    int numbers[4];
    int count = 0;
    int start = 0;
    int i;
    
    for (i = 0; i < str.length(); i++) {
        if (str[i] == '.') {
            numbers[count++] = stoi(str.substr(start, i - start));
            start = i + 1;
        }
    }
    
    numbers[count] = stoi(str.substr(start, i - start));
    
    for (int j = 0; j < 4; j++)
        cout << numbers[j] << endl;
        
    return 0;
}