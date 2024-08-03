//switch case 

#include <iostream>
using namespace std;
int main(){
  int num = 10;
  int test = 40;

  switch(num){
    case 1 : cout<<"hello"<<endl;
             break;
    case 10: cout<<"welcome sir"<<endl;
             break;
    case 3 : cout<<"wOw"<<endl;
             break;
    
  }

  switch(test){
    case 10 : cout<<"10"<<endl;
             break;
    case 40: cout<<"40"<<endl;
             break;
    case 30 : cout<<"30"<<endl;
             break;

  }

  
}

//continue is not valiad in switch case


//perfectly added here 
//switch case CALCAULATOR
/*
#include <iostream>
using namespace std;
int main(){
         cout<<"Welcome to our calculator"<<endl;
         cout<<"Enter the first number"<<endl;
         int a;
         cin>>a;
         cout<<"Enter the second number"<<endl;
         int b;
         cin>>b;
         char c; //don't use int here
         cout<<"Enter operation +,-,*or / you want to perform"<<endl;
         cin>>c;
         switch (c){
                  case '+': cout<<"The sum of two numbers is"<<a+b<<endl;
                  break;
                  case '-' : cout<<a-b<<endl;
                  break;
                  case '*': cout<<a*b<<endl;
                  break;
                  case '/': cout<<a/b<<endl;
                  break;
         }
         
         
         
}*/
