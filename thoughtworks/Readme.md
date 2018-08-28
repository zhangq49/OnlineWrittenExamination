## 运行主程序（main），并检验程序正确性
#### 交互式输入
1. 关闭主程序中的调试选项，注释掉第6行
```c
//#define _DEBUG
```

2. 编译项目
```sh
g++ Maze.cpp MazeFactory.cpp main.cpp -o main
```

3. 运行主程序
```sh
./main
```

第一行输入道路网格尺寸，如
```
3 3
```

第二行输入道路网格的连通性定义，如
```
0,1 0,2;0,0 1,0;0,1 1,1;0,2 1,2;1,0 1,1;1,1 1,2;1,1 2,1;1,2 2,2;2,0 2,1
```


#### 运行测试程序
1. 打开主程序中的调试选项，取消对第6行的注释
```c
#define _DEBUG
```

2. 编译项目
```sh
g++ Maze.cpp MazeFactory.cpp main.cpp -o main
```

3. 运行主程序的测试逻辑部分
```sh
./main
```
共测试了8条命令：
- command1：作业测试用例
- command2: "Invalid number format"异常——数字部分包含非数字字符
- command3: "Invalid number format"异常——数字部分包含小数点
- command4: "Number out of range"异常——数字部分的数值大于0x7fffffff
- command5: "Number out of range"异常——数字部分的数值小于0
- command6: "Incorrect command format"异常——command中没有换行符'\n'
- command7: "Incorrect command format"异常——command中空格部分采用非空格字符
- command8: "Maze format error"异常——连通性定义中两个网格无法连通


