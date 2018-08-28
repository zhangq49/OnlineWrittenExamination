#include<algorithm>
#include<iostream>
#include<vector>

using namespace std;

bool judge_core(string str1, string str2){
	if(str1.length()!=str2.length()){
		return false;
	}
	
	bool j1 = true, j2 = true;
	int i;
	for(i=0;i<str2.length();i++){
		if(str2[i]==str1[0]){
			break;
		}
	} 

	int start1 = i;

	for(int j=0;j<str1.length();j++){
		if(str2[start1] == str1[j]){
			start1 = (start1+1);
			if(start1==str2.length()){
				start1 = 0;
			}
		}else{
			j1 = false;
			break;
		}
	}

	int start2 = i;
	for(int j=0;j<str1.length();j++){
		if(str2[start2] == str1[j]){
			start2 = (start2-1);
			if(start2==-1){
				start2 = str2.length()-1;
			}
		}else{
			j2 = false;
			break;
		}
	}

	if(j1||j2){
		return true;
	}else{
		return false;
	}
}

bool check(vector<string> record){
	for(int i = 0; i<record.size(); i++){
		for(int j = i + 1; j<record.size(); j++){
			if(judge_core(record[j], record[i])){
				return true;
			}
		}
	}
	return false;
}

int main(){
	int t;
	cin >> t;
	vector<string>result;
	while(t--){
		int n;
		cin>>n;
		vector<string>record(n,"");
		for(int i=0;i<n;i++){
			cin>>record[i];
		}
		if(check(record)){
			result.push_back("Yeah");
		}else{
			result.push_back("Sad");
		}
	}

	for(int i=0;i<result.size()-1;i++){
		cout<<result[i]<<endl;
	}

	cout<<result[result.size()-1];
	return 0;
}
