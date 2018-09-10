#include <iostream>
#include <string>
#include <vector>
#include <unordered_set>
#include <cmath>

using namespace std;

void WordBreakCore(string& str, unordered_set<string>& dict, int start, string item, vector<string>& res) {
	if (start >= str.length()) {
		res.push_back(item);
		return;
	}

	string tmp = "";
	for (int i = start; i < str.length(); i++) {
		tmp += str[i];
		if (dict.find(tmp) != dict.end()) {
			string newStr = item.length() > 0 ? (item + " " + tmp) : tmp;
			WordBreakCore(str, dict, i + 1, newStr, res);
		}
	}
}

void WordBreak(string& str, unordered_set<string>& dict, vector<string>& res) {
	if (str == "" || str.length() == 0)
		return;

	WordBreakCore(str, dict, 0, "", res);
}

int main() {
	string str;
	string tmp;
	int size;
	unordered_set<string> dict;

	cin >> str;
	getchar();
	cin >> size;

	for (int i = 0; i < size; i++) {
		cin >> tmp;
		dict.insert(tmp);
	}

	vector<string> res;
	WordBreak(str, dict, res);

	int weight = 0;
	int maxIndex = 0;
	for (int i = 0; i < res.size(); i++) {
		int prev = 0;
		int tmpWeight = 0;
		int j;
		for (j = 0; j < res[i].length(); j++) {
			if (res[i][j] == ' ') {
				tmpWeight += pow(j - 1 - prev, 2);
				prev = j + 1;
			}
		}
		tmpWeight += pow(j - 1 - prev, 2);
		if (weight < tmpWeight) {
			weight = tmpWeight;
			maxIndex = i;
		}
	}

	cout << res[maxIndex] << endl;

}