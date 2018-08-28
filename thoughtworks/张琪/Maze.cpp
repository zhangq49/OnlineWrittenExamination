#include "Maze.h"
#include <string>
#include <cmath>
#include <iostream>
using namespace std;

Maze::Maze(int _rows, int _cols, char wallCh, char roadCh) {
	initMaze(_rows, _cols, wallCh, roadCh);
}

Maze::Maze(string command, char wallCh, char roadCh) {
	size_t found = command.find('\n');
	if (found != string::npos) {
		string firstLine = command.substr(0, found);
		string secondLine = command.substr(found + 1);

		// deal with first line
		size_t posOfBlank = firstLine.find(' ');
		if (posOfBlank != string::npos) {
			int _rows = 0, _cols = 0;
			string firstPart = firstLine.substr(0, posOfBlank);
			string secondPart = firstLine.substr(posOfBlank + 1);

			// check if str contains decimal point
			if (isDecimalPointExist(firstPart) || isDecimalPointExist(secondPart)) {
				initMaze(0, 0, wallCh, roadCh);
				renderRes = "Invalid number format.";
				return;
			}

			// check if stoi conversion success
			if (isValidStoi(firstPart, &_rows) &&
				isValidStoi(secondPart, &_cols)) {
				if (_rows >= 0 && _cols >= 0) {
					// init maze
					initMaze(_rows, _cols, wallCh, roadCh);
					// call setConnectivity to deal with second line
					if (secondLine != "")
						setConnectivity(secondLine, roadCh);
				} else {
					initMaze(0, 0, wallCh, roadCh);
					renderRes = "Number out of range​.";
				}
				return;
			} else {
				string tmpRenderRes = renderRes;
				initMaze(0, 0, wallCh, roadCh);
				renderRes = tmpRenderRes;
				return;
			}
		}
	}
	initMaze(0, 0, wallCh, roadCh);
	renderRes = "Incorrect command format​.​";
}

Maze::~Maze() {
	for (int i = 0; i < rows; i++)
		delete[] data[i];

	delete[] data;
}

void Maze::initMaze(int _rows, int _cols, char wallCh, char roadCh) {
	rows = 2 * _rows + 1;
	cols = 2 * _cols + 1;
	data = new char*[rows];
	for (int i = 0; i < rows; i++)
		data[i] = new char[cols];

	for (int i = 0; i < rows; i++) {
		for (int j = 0; j < cols; j++) {
			if ((i % 2 == 1) && (j % 2 == 1)) {
				data[i][j] = roadCh;
			} else {
				data[i][j] = wallCh;
			}
		}
	}

	renderRes = "";
}

bool Maze::isDecimalPointExist(string str) {
	size_t found = str.find('.');
	if (found != string::npos) {
		return true;
	}
	return false;
}

bool Maze::isValidStoi(string str, int* res) {
	bool validConvert = true;
	try {
		*res = stoi(str);
	} catch (std::invalid_argument&) {
		validConvert = false;
		renderRes = "Invalid number format​.";
	} catch (std::out_of_range&) {
		validConvert = false;
		renderRes = "Number out of range​.";
	} catch (...) {
		validConvert = false;
		renderRes = "Invalid number format​.";
	}

	return validConvert;
}

bool Maze::resolveRule(string rule, char roadCh) {
	size_t posOfBlank = rule.find(' ');
	if (posOfBlank != string::npos) {
		string firstPartBlank = rule.substr(0, posOfBlank);
		string secondPartBlank = rule.substr(posOfBlank + 1);

		size_t posOfCommaFirst = firstPartBlank.find(',');
		size_t posOfCommaSecond = secondPartBlank.find(',');
		if (posOfCommaFirst != string::npos && posOfCommaSecond != string::npos) {
			string firstPartCommaFirst = firstPartBlank.substr(0, posOfCommaFirst);
			string secondPartCommaFirst = firstPartBlank.substr(posOfCommaFirst + 1);

			string firstPartCommaSecond = secondPartBlank.substr(0, posOfCommaSecond);
			string secondPartCommaSecond = secondPartBlank.substr(posOfCommaSecond + 1);

			// check if str contains decimal point
			if (isDecimalPointExist(firstPartCommaFirst) ||
				isDecimalPointExist(secondPartCommaFirst) ||
				isDecimalPointExist(firstPartCommaSecond) ||
				isDecimalPointExist(secondPartCommaSecond)) {
				renderRes = "Invalid number format.";
				return false;
			}

			// check if stoi conversion success
			int x1, x2, y1, y2;
			if (isValidStoi(firstPartCommaFirst, &x1) && 
				isValidStoi(secondPartCommaFirst, &x2) &&
				isValidStoi(firstPartCommaSecond, &y1) &&
				isValidStoi(secondPartCommaSecond, &y2)) {
				// check if number is out of range
				if (x1 >= 0 && x1 <= rows / 2 && x2 >= 0 && x2 <= cols / 2 &&
					y1 >= 0 && y1 <= rows / 2 && y2 >= 0 && y2 <= cols / 2) {
					if ((x1 == y1 && abs(x2 - y2) == 1) || 
						(x2 == y2 && abs(x1 - y1) == 1)) {
						int i = ((2 * x1 + 1) + (2 * y1 + 1)) / 2;
						int j = ((2 * x2 + 1) + (2 * y2 + 1)) / 2;
						data[i][j] = roadCh;
					} else {
						renderRes = "Maze format error.";
						return false;
					}
				} else {
					renderRes = "Number out of range​.";
					return false;
				}
			}
		} else {
			renderRes = "Incorrect command format​.​";
			return false;
		}
	} else {
		renderRes = "Incorrect command format​.​";
		return false;
	}

	return true;
}

void Maze::setConnectivity(string connectivity, char roadCh) {
	string secondPart = connectivity;
	string firstPart = "";
	while (true) {
		size_t posOfSem = secondPart.find(';');
		if (posOfSem != string::npos) {
			firstPart = secondPart.substr(0, posOfSem);
			secondPart = secondPart.substr(posOfSem + 1);

			//deal with firstPart
			if (resolveRule(firstPart, roadCh))
				continue;
			else
				break;
		} else {
			// reach the end of connectivity, deal with last secondPart, then break
			resolveRule(secondPart, roadCh);
			break;
		}
	}
}

string Maze::Render() {
	if (renderRes == "") {
		for (int i = 0; i < rows; i++) {
			for (int j = 0; j < cols; j++) {
				renderRes += '[';
				renderRes += data[i][j];
				renderRes += ']';
			}
			if (i != rows - 1)
				renderRes += '\n';
		}
	}

	return renderRes;
}