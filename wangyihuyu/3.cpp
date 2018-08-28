#include <iostream>
#include <string>
using namespace std;

string getNumberPlace(string& number, string* rules, int numOfRules) {
	string res = "";
	for (int i = 0; i < numOfRules; i++) {			
		bool flag = true;
		for (int j = 0; j < 11; j++) {
			if (rules[i][j] != 'x') {
				if (rules[i][j] != number[j]) {
					cout << j << endl;
					flag = false;
					break;
				}
			} else {
				break;
			}
		}
		if (flag) {
			res = rules[i].substr(12);
			return res;
		}
	}
	
	return res;
}

int main() {
    int t, numOfRules, numOfNumbers;
    string nullline;
    cin >> t;
    while (t--) {
        cin >> numOfRules;
        getline(cin, nullline);
        string rules[numOfRules];
        for (int i = 0; i < numOfRules; i++) {
        	getline(cin, rules[i]);
        }

        cin >> numOfNumbers;
        getline(cin, nullline);
        string tmpNumber;
        for (int i = 0; i < numOfNumbers; i++) {
        	getline(cin, tmpNumber);
        	string res = getNumberPlace(tmpNumber, rules, numOfRules);
        	if (res == "")
        		cout << "unknown" << endl;
        	else
        		cout << res  << endl;
        }
    }

    return 0;
}