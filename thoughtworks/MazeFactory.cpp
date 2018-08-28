#include "Maze.h"
#include "MazeFactory.h"

MazeFactory::MazeFactory(){}

MazeFactory::~MazeFactory(){}

Maze MazeFactory::create(string command) {
	Maze maze(command, 'W', 'R');
	return maze;
}
