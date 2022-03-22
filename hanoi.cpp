#include <iostream>
#include <vector>
#include <string>
using namespace std;
vector <int> stuff[4];
string ABC(int i){
	switch (i){
		case 1:return "f1";break;
		case 2:return "f2";break;
		case 3:return "f3";break;
	}
	return 0;
}
void ptABC(){
	cout << "f1" << ':';
	for (int i=0;i<stuff[1].size();i++){
		cout << stuff[1][i] << " " ;
	}
	cout << endl;
	cout << "f2" << ':';
	for (int i=0;i<stuff[2].size();i++){
		cout << stuff[2][i] << " " ;
	}
	cout << endl;
	cout << "f3" << ':';
	for (int i=0;i<stuff[3].size();i++){
		cout << stuff[3][i] << " " ;
	}
	cout << endl;
	return ;
}
void move(int f1,int f2,int f3,int n){
	//1>2 先將f1底層以外的圓盤移到f2 
	//1>3 將底盤移到f3 
	//2>3 再將f2的圓盤移到f3 
	if (n==1) {
		stuff[f3].push_back(stuff[f1].back());
		stuff[f1].pop_back();
		cout << "Move ring " << stuff[f3].back() << "from " << ABC(f1) << " to " << ABC(f3) << endl;
		ptABC();
	}else{
		move(f1,f3,f2,n-1);
		stuff[f3].push_back(stuff[f1].back());
		stuff[f1].pop_back();
		cout << "Move ring " << stuff[f3].back() << "from " << ABC(f1) << " to " << ABC(f3) << endl;
		ptABC();
		move(f2,f1,f3,n-1);
	}
}
int main(){
	int n;
	printf("個數:");
	cin >> n;
	stuff[1].clear(); 
	stuff[2].clear();
	stuff[3].clear();
	for (int i=n;i>=1;i--){
		stuff[1].push_back(i);
	}
	ptABC();
	move(1,2,3,n);
	return 0;
} 

