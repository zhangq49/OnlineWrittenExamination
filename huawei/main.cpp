// 本题为考试单行多行输入输出规范示例，无需提交，不计分。
#include <iostream>
#include <bitset>
#include <cmath>
using namespace std;

int s, t, stoneLen;
int stone[100];

void jump(int currentDis, int currentStoneNum, int length, int &minStoneNum) {
    if (currentDis >= length) {
        if (currentStoneNum < minStoneNum)
            minStoneNum = currentStoneNum;
        return;
    }
    
    for (int i = 0; i < stoneLen; i++) {
        if (stone[i] == currentDis)
            currentStoneNum++;
    }
    
    for (int i = s; i <= t; i++) {
        jump(currentDis + i, currentStoneNum, length, minStoneNum);
    }
}

int main() {
    int maxLength = pow(10, 9);
    int l, m, tmpSpot, minStoneNum = maxLength;
    
    while (cin >> l) {
        cin >> s >> t >> m;
        stoneLen = m;
        for (int i = 0; i < m; i++) {
            cin >> stone[i];
        }
        
        for (int i = s; i <= t; i++) {
            jump(i, 0, l, minStoneNum);
        }
        
        cout << minStoneNum << endl;
        
        minStoneNum = maxLength;
    }
    
    return 0;
}