#include <iostream>
#include <set>

using namespace std;

int main() {
	int n, m, d;
	cin >> n >> m >> d;
	set<int> nodes[n];
	int nodeTotalSize[n];
	int partitions[m];
	float totalSize = 0;
	int step = 0;

	for (int i = 0; i < m; i++) {
		cin >> partitions[i];
	}

	for (int i = 0; i < n; i++) {
		int nodeSize;
		cin >> nodeSize;
		nodeTotalSize[i] = 0;
		for (int j = 0; j < nodeSize; j++) {
			int tmp;
			cin >> tmp;
			totalSize += partitions[tmp];
			nodeTotalSize[i] += partitions[tmp];
			nodes[i].insert(partitions[tmp]);
		}
	}

	

	float averageSize = totalSize / n;

}