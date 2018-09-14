/* 合并多个排序数组，时间复杂度尽可能低

*/

#include <iostream>
#include <set>
#include <vector>

using namespace std;

vector<vector<int>> numbers;
int n;

void mergeVectors(int i, int j) {
	if (j > n)
		return;

	vector<int> tmp;
	vector<int>::iterator iteratorI = numbers[i].begin();
	vector<int>::iterator iteratorJ = numbers[j].begin();

	while (iteratorI != numbers[i].end() && iteratorJ != numbers[j].end()) {
		if (*iteratorI < *iteratorJ) {
			tmp.push_back(*iteratorI);
			iteratorI++;
		} else {
			tmp.push_back(*iteratorJ);
			iteratorJ++;
		}
	}

	while (iteratorI != numbers[i].end()) {
		tmp.push_back(*iteratorI);
		iteratorI++;
	}

	while (iteratorJ != numbers[j].end()) {
		tmp.push_back(*iteratorJ);
		iteratorJ++;
	}

	numbers[i] = tmp;
}



int main() {
    cin >> n;
    for (int i = 0; i < n; i++) {
        int m;
        cin >> m;
        vector<int> numbersRow;
        for (int j = 0; j < m; j++) {
            int tmp;
            cin >> tmp;
            numbersRow.push_back(tmp);
        }
        numbers.push_back(numbersRow);
    }

    cout << "complete input" << endl;
    
    for (int step = 1; step <= n; step = 2 * step) {
    	for (int i = 0; i < n; i += step * 2) {
    		mergeVectors(i, i + step);
    	}
    }
    
    for (auto elem : numbers[0])
    	cout << elem << ' ';

    cout << endl;
    
    return 0;
}