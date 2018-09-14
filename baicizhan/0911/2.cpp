#include <iostream>

using namespace std;

#define LEN 10
int numbers[LEN];
int visited[LEN];
int n;
int targetSum;

bool dfs(int curSum) {
	if (curSum == targetSum)
		return true;

	bool flag = false;
	for (int i = 0; i < n; i++) {
		if (!visited[i]) {
			visited[i] = true;
			bool flag = dfs(curSum + numbers[i]);
			if (flag)
				return true;
			visited[i] = false;
		}
	}

	return false;
}

int main() {
	cin >> n;

	for (int i = 0; i < n; i++) {
		cin >> numbers[i];
		visited[i] = false;
	}

	cin >> targetSum;

	cout << boolalpha << dfs(0) << endl;

	return 0;
}