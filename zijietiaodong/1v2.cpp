#include <iostream>
#include <queue>

using namespace std;

int main() {
	int n;
	cin >> n;

	short** arr = new short*[n + 1];
	for (int i = 0; i < n + 1; i++)
		arr[i] = new short[n + 1];

	for (int i = 1; i < n + 1; i++)
		for (int j = 1; j < n + 1; j++)
			arr[i][j] = 0;

	int tmp;
	for (int i = 1; i < n + 1; i++) {
		cin >> tmp;
		while (tmp != 0) {
			arr[i][tmp] = 1;
			cin >> tmp;
		}
	}

	int res = 0, book[n + 1];
	for (int i = 1; i < n + 1; i++)
		book[i] = 0;

	for (int i = 1; i < n + 1; i++) {
		if (book[i] == 0) {
			book[i] = 1;
			queue<int> q;
			q.push(i);
			while (!q.empty()) {
				int cur = q.front();
				q.pop();
				for (int j = 1; j < n + 1; j++) {
					if (arr[cur][j] == 1 && book[j] == 0) {
						book[j] = 1;
						q.push(j);
					}
					
					if (arr[j][cur] == 1 && book[j] == 0) {
						book[j] = 1;
						q.push(j);
					}
				}
			}
			res++;
		}
	}

	cout << res << endl;

	for (int i = 1; i < n + 1; i++)
		delete[] arr[i];
	delete[] arr;

	return 0;
}