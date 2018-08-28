#include <iostream>
using namespace std;
int main() {
    int n, curUser, curUserFriendsNum = 0, maxCommonFriendNum = 0, maxCommonFriendIndex = -1;
    cin >> n >> curUser;
    int friendList[n][n];
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            friendList[i][j] = 0;
    
    for (int i = 0; i < n; i++) {
        int tmp;
        do {
        	cin >> tmp;
            if (curUser == i) {
                friendList[i][curUserFriendsNum++] = tmp;
            } else
                friendList[i][tmp] = 1;
        } while (cin.get() != '\n');
    }
    
    for (int i = 0; i < n; i++) {
        int tmpCommonFriendsNum = 0;
        if (i != curUser) {
            for (int j = 0; j < curUserFriendsNum; j++) {
                if (friendList[i][friendList[curUser][j]] == 1)
                    tmpCommonFriendsNum++;    
            }
            if (tmpCommonFriendsNum > maxCommonFriendNum) {
                maxCommonFriendNum = tmpCommonFriendsNum;
                maxCommonFriendIndex = i;
            }
        }
    }
    
    printf("%d\n", maxCommonFriendIndex);
    
    return 0;
}