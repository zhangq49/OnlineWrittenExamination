#include <cstdio>

int main() {
	char s[] = "abc\0def";
	char *p = s;

	printf("%c", *(p + 4));
	return 0;
}