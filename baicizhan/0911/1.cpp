#include <iostream>
#include <cmath>

using namespace std;

int main() {
	int n;
	cin >> n;

	bool flag = true;
	for (int i = 2; i <= sqrt(n); i++) {
		if (n % i == 0) {
			flag = false;
			break;
		}
	}

	cout << boolalpha << flag << endl;

	return 0;
}