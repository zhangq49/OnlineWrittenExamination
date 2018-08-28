#include <iostream>
#include <cmath>
using namespace std;

int taxSection[6] = {3000 * 0.03, (12000 - 3000) * 0.1,
				  (25000 - 12000) * 0.2, (35000 - 25000) * 0.25,
				  (55000 - 35000) * 0.3, (80000 - 55000) * 0.35
				  };

int taxSectionSum(int i) {
	int sum = 0;
	for (int j = 0; j < i; j++)
		sum += taxSection[j];
	return sum;
}

int calTax(int salary) {
	if (salary <= 5000)
		return 0;

	int exceedSalary = salary - 5000;
	float totalTax = 0;
	if (exceedSalary > 80000)
		totalTax = (exceedSalary - 80000) * 0.45 + taxSectionSum(6);
	else if (exceedSalary > 55000 && exceedSalary <= 80000)
		totalTax = (exceedSalary - 55000) * 0.35 + taxSectionSum(5);
	else if (exceedSalary > 35000 && exceedSalary <= 55000)
		totalTax = (exceedSalary - 35000) * 0.3 + taxSectionSum(4);
	else if (exceedSalary > 25000 && exceedSalary <= 35000)
		totalTax = (exceedSalary - 25000) * 0.25 + taxSectionSum(3);
	else if (exceedSalary > 12000 && exceedSalary <= 25000)
		totalTax = (exceedSalary - 12000) * 0.2 + taxSectionSum(2);
	else if (exceedSalary > 3000 && exceedSalary <= 12000)
		totalTax = (exceedSalary - 3000) * 0.1 + taxSectionSum(1);
	else if (exceedSalary > 0 && exceedSalary <= 3000)
		totalTax = exceedSalary * 0.03;

	return round(totalTax);
}

int main() {
	int n, tmp;
	cin >> n;
	while (n--) {
		cin >> tmp;
		cout << calTax(tmp) << endl;
	}

	return 0;
}