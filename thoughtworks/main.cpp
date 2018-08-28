#include "Maze.h"
#include "MazeFactory.h"
#include <string>
#include <iostream>

#define _DEBUG

int main() {
	MazeFactory mazeFactory;

#ifndef _DEBUG
	// get user input
	string command, tmpStr;
	getline(cin, command);
	getline(cin, tmpStr);
	command += '\n';
	command += tmpStr;

	Maze maze = mazeFactory.create(command);
	string res = maze.Render();
	cout << res << endl;

#else	
	// test program function, exception
	/* command1
	 * command1 is the test case of this homework
	 */
	cout << "############################# 【command1】 #############################" << endl;
	cout << "command1: the test case of this homework." << endl;
	string command1 = "3 3\n0,1 0,2;0,0 1,0;0,1 1,1;0,2 1,2;1,0 1,1;1,1 1,2;1,1 2,1;1,2 2,2;2,0 2,1";

	Maze maze1 = mazeFactory.create(command1);
	string res1 = maze1.Render();
	cout << res1 << endl << endl;

	/* command2
	 * command2 is used to test the "Invalid number format​" exception - not digital number
	 */
	cout << "############################# 【command2】 #############################" << endl;
	cout << "command2: test \"Invalid number format​\" exception. - not digital number" << endl;
	string command2 = "d xd\n0,1 0,2;0,0 1,0;0,1 1,1;0,2 1,2;1,0 1,1;1,1 1,2;1,1 2,1;1,2 2,2;2,0 2,1";

	Maze maze2 = mazeFactory.create(command2);
	string res2 = maze2.Render();
	cout << res2 << endl << endl;

	/* command3
	 * command3 is used to test the "Invalid number format​" exception - contain decimal point
	 */
	cout << "############################# 【command3】 #############################" << endl;
	cout << "command3: test \"Invalid number format​\" exception. - contain decimal point" << endl;
	string command3 = "3 3\n0,1.5 0,2.3;0.1,0 1,0;0,1 1,1;0,2 1,2;1,0 1,1;1,1 1,2;1,1 2,1;1,2 2,2;2,0 2,1";

	Maze maze3 = mazeFactory.create(command3);
	string res3 = maze3.Render();
	cout << res3 << endl << endl;

	/* command4
	 * command4 is used to test the "Number out of range​" exception - number over 0x7fffffff
	 */
	cout << "############################# 【command4】 #############################" << endl;
	cout << "command4: test \"Number out of range​\" exception. - number over 0x7fffffff" << endl;
	string command4 = "3 3\n2147483648,1 0,2;0,0 1,0;0,1 1,1;0,2 1,2;1,0 1,1;1,1 1,2;1,1 2,1;1,2 2,2;2,0 2,1";

	Maze maze4 = mazeFactory.create(command4);
	string res4 = maze4.Render();
	cout << res4 << endl << endl;

	/* command5
	 * command5 is used to test the "Number out of range​" exception - number less than 0
	 */
	cout << "############################# 【command5】 #############################" << endl;
	cout << "command5: test \"Number out of range​\" exception. - number less than 0" << endl;
	string command5 = "-3 -3\n0,1 0,2;0,0 1,0;0,1 1,1;0,2 1,2;1,0 1,1;1,1 1,2;1,1 2,1;1,2 2,2;2,0 2,1";

	Maze maze5 = mazeFactory.create(command5);
	string res5 = maze5.Render();
	cout << res5 << endl << endl;

	/* command6
	 * command6 is used to test the "Incorrect command format" exception - no '\n'
	 */
	cout << "############################# 【command6】 #############################" << endl;
	cout << "command6: test \"Incorrect command format\" exception. - no '\\n'" << endl;
	string command6 = "3 3 0,1 0,2;0,0 1,0;0,1 1,1;0,2 1,2;1,0 1,1;1,1 1,2;1,1 2,1;1,2 2,2;2,0 2,1";

	Maze maze6 = mazeFactory.create(command6);
	string res6 = maze6.Render();
	cout << res6 << endl << endl;

	/* command7
	 * command7 is used to test the "Incorrect command format" exception - not split by ' '
	 */
	cout << "############################# 【command7】 #############################" << endl;
	cout << "command7: test \"Incorrect command format\" exception. - not split by ' '" << endl;
	string command7 = "3 3\n0,1*0,2;0,0(1,0;0,1 1,1;0,2 1,2;1,0 1,1;1,1 1,2;1,1 2,1;1,2 2,2;2,0 2,1";

	Maze maze7 = mazeFactory.create(command7);
	string res7 = maze7.Render();
	cout << res7 << endl << endl;

	/* command8
	 * command8 is used to test the "Maze format error" exception
	 */
	cout << "############################# 【command8】 #############################" << endl;
	cout << "command8: test \"Maze format error\" exception." << endl;
	string command8 = "3 3\n0,0 0,2;0,1 1,0;0,1 1,1;0,2 1,2;1,0 1,1;1,1 1,2;1,1 2,1;1,2 2,2;2,0 2,1";

	Maze maze8 = mazeFactory.create(command8);
	string res8 = maze8.Render();
	cout << res8 << endl << endl;

#endif

	return 0;
}
