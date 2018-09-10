#include <iostream>
#include <algorithm>

using namespace std;

#define LEN 100001
int n;
int u[LEN];
int v[LEN];
int first[LEN];
int nextEdge[LEN];
bool visited[LEN];
int minPath;

int traverse(int curNode) {
	visited[curNode] = true;

	int k = first[curNode];
	int maxPath = 0;
	int sumPath = 0;

	while (k != -1) {
		int nextNode = v[k];
		int path = 2 + traverse(nextNode);
		sumPath += path;
		maxPath = max(maxPath, path);
    	k = nextEdge[k];
	}

	sumPath -= maxPath / 2;

	visited[curNode] = false;
	
	return sumPath;
}

int main() {
	cin >> n;

	for (int i = 1; i <= n; i++) {
		first[i] = -1;
		visited[i] = false;
	}

	for (int i = 1; i <= n - 1; i++) {
		cin >> u[i] >> v[i];
		nextEdge[i] = first[u[i]];
		first[u[i]] = i;
	}

	cout << traverse(1) << endl;

	return 0;
}