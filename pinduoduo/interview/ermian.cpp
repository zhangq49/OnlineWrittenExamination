/*     9
   0   8
 -1   7  6
 [(8, 7), (8, 6), (0, -1), (9, 0), (9, 8)]
 9, 0 -1 8 7 6
 */


 bool hasParent(int num, vector<pair<int, int>>& a, int& parent) {
     for (int i = 0; i < a.size(); i++) {
         if (a[i].second == num) {
             parent = a[i].first;
             return true;
         }
     }
     return false;
 }
 
 void printPreOrder(vector<pair<int, int>> a) {
     if (a.size() == 0) return 0;
     
     int cur = a[0].first;
     int parent;
     while (hasParent(cur, a, parent)) {
         cur = parent;
     }
     
     stack<int> nodes;
     nodes.push(cur);
     while (!nodes.empty()) {
         cout << cur << ' ';
         cur = nodes.top();
         nodes.pop();
             
         int i = 0;    
         for (i = a.size() - 1; i >= 0; i--) {
             if (a[i].first == cur)
                 nodes.push(a[i].second);
         }
         
         for (i; i >= 0; i--) {
             if (a[i].first == cur)
                 nodes.push(a[i].second);
         }
     }
     cout << endl;
 }