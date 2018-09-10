#include <iostream>
using namespace std;

#define LEN 100
char matrix[LEN][LEN];
int m, n;
bool visited[LEN][LEN];
char s[LEN + 1];

int dx[] = {1, -1, 0, 0};
int dy[] = {0, 0, 1, -1};

bool dfs(int i, int j, char* str) {
	if (*str == '\0')
		return true;

	bool flag = false;
	if (i >= 0 && i < m && j >= 0 && j < n && matrix[i][j] == *str && !visited[i][j]) {
        visited[i][j] = true;
        for (int k = 0; k < 4; k++) {
            flag = flag || dfs(i + dx[k], j + dy[k], str + 1);
            if (flag)
                break;
        }
        visited[i][j] = false;
    }

	return flag;
}

int main() {
    cin >> m >> n;

    for (int i = 0; i < m; i++) {
    	for (int j = 0; j < n; j++) {
    		cin >> matrix[i][j];
    		visited[i][j] = false;
    	}
    }

    cin >> s;

    bool found = false;
    for (int i = 0; i < m; i++) {
    	for (int j = 0; j < n; j++) {
    		if (dfs(i, j, s)) {
    			found = true;
    			break;
    		}
    	}
    	if (found == true)
    		break;
    }

    cout << boolalpha << found << endl;

    return 0;
}