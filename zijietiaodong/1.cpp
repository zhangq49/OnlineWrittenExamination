#include <iostream>
#include <queue>
#include <bitset>

using namespace std;

int main() {
	int n;
	cin >> n;

	bitset<100001> bs[n + 1];

	for (int i = 1; i < n + 1; i++)
		bs[i].reset();

	int tmp;
	for (int i = 1; i < n + 1; i++) {
		cin >> tmp;
		while (tmp != 0) {
			bs[i].set(tmp);
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
					if (bs[cur].test(j) && book[j] == 0) {
						book[j] = 1;
						q.push(j);
					}
					
					if (bs[j].test(cur) && book[j] == 0) {
						book[j] = 1;
						q.push(j);
					}
				}
			}
			res++;
		}
	}

	cout << res << endl;

	return 0;
}