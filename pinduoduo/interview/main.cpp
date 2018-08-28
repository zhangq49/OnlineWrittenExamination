#include<iostream>
#include<vector>
#include<queue>

using namespace std;

struct input_node {
    int id; // 0 -> root id
    int parent_id;
};

struct tree_node {
    int id; // 0 -> root id
    vector<tree_node*> childNodes;
};

tree_node* build(vector<input_node> inputs) {
    int inputs_size = inputs.size();

    if (inputs_size == 0) return nullptr;
    
    tree_node* root = nullptr;
    
    if (inputs_size == 1) {
        root = new tree_node;
        root->id = inputs[0].id;
        
        return root;
    }
    
    int has_tree_node[inputs_size];
    for (int i = 0; i < inputs_size; i++) {
        has_tree_node[i] = 0;
    }
    
    for (int i = 0; i < inputs_size; i++) {
        if (inputs[i].id == 0) {
            root = new tree_node;
            root->id = inputs[i].id;
            has_tree_node[i] = 1;
        } else {
            return nullptr;
        }
    }
    
    queue<tree_node*> childs;
    childs.push(root);
    while (!childs.empty()) {
        tree_node* curNode = childs.front();
        childs.pop();
        for (int i = 0; i < inputs_size; i++) {
            if (has_tree_node[i] == 0 && inputs[i].parent_id == curNode->id) {
                tree_node* newNode = new tree_node;
                newNode->id = inputs[i].id;
                curNode->childNodes.push_back(newNode);
                has_tree_node[i] = 1;
                childs.push(newNode);
            }
        }
    }
    
    return root;
}

int main() {

    return 0;
}