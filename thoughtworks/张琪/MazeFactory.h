#ifndef _MAZE_FACTORY_H
#define _MAZE_FACTORY_H

#include "Maze.h"

class MazeFactory {
public:
	MazeFactory();
	~MazeFactory();

	Maze create(string command);
};

#endif