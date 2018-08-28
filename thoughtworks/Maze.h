#ifndef _MAZE_H
#define _MAZE_H

#include <string>
using namespace std;

class Maze {
public:
	Maze(int _rows, int _cols, char wallCh, char roadCh);
	Maze(string command, char wallCh, char roadCh);

	~Maze();

	void setConnectivity(string connectivity, char roadCh);
	string Render();

private:
	void initMaze(int _rows, int _cols, char wallCh, char roadCh);
	bool isValidStoi(string str, int* res);
	bool isDecimalPointExist(string str);
	bool resolveRule(string rule, char roadCh);

	string renderRes;
	int rows;
	int cols;
	char** data;
};

#endif