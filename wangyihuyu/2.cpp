#include <iostream>
#include <string>
#include <bitset>
using namespace std;

bitset<129> characterCheckHash;

void initCharacterCheckHash() {
    characterCheckHash.reset();
    // for (int i = 'a'; i <= 'z'; i++)
    //     characterCheckHash.set(i);
    // for (int i = 'A'; i <= 'Z'; i++)
    //     characterCheckHash.set(i);
    // for (int i = '0'; i <= '9'; i++)
    //     characterCheckHash.set(i);;
    characterCheckHash.set('!');
    characterCheckHash.set('@');
    characterCheckHash.set('#');
    characterCheckHash.set('$');
    characterCheckHash.set('%');
    characterCheckHash.set('^');
    characterCheckHash.set('&');
    characterCheckHash.set('*');
    characterCheckHash.set('(');
    characterCheckHash.set(')');
    characterCheckHash.set('_');
    characterCheckHash.set('-');
    characterCheckHash.set('=');
    characterCheckHash.set('+');
    characterCheckHash.set('[');
    characterCheckHash.set(']');
    characterCheckHash.set('{');
    characterCheckHash.set('}');
    characterCheckHash.set(',');
    characterCheckHash.set('.');
    characterCheckHash.set('<');
    characterCheckHash.set('>');
    characterCheckHash.set('/');
    characterCheckHash.set('?');
}

bool isDigit(char c) {
    if (c >= '0' && c <= '9')
        return true;
    return false;
}

bool isDaxie(char c) {
    if (c >= 'A' && c <= 'Z')
        return true;
    return false;
}

bool isXiaoxie(char c) {
    if (c >= 'a' && c <= 'z')
        return true;
    return false;
}

bool isPasswordWeak(string& password) {
    if (password.length() < 8) {
        return true;
    }
    
    bool flag1 = false, flag2 = false, flag3 = false, flag4 = false;
    for (int i = 0; i < password.length(); i++) {
        if (isDigit(password[i])) flag1 = true;
        if (isDaxie(password[i])) flag2 = true;
        if (isXiaoxie(password[i])) flag3 = true;
        if (characterCheckHash.test(password[i]))
            flag4 = true;
    }
    if (!(flag1 && flag2 && flag3 && flag4)) return true;
    
    for (int i = 0; i < password.length() - 2; i++) {
        if (isDigit(password[i]) && isDigit(password[i + 1]) && isDigit(password[i + 2])) {
            if ((password[i + 2] - password[i + 1]) == (password[i + 1] - password[i]))
                return true;
        }
    }
    
    for (int i = 0; i < password.length() - 2; i++) {
        if (isDaxie(password[i]) && isDaxie(password[i + 1]) && isDaxie(password[i + 2])) {
            if ((password[i + 2] - password[i + 1] == 1) && (password[i + 1] - password[i]) == 1)
                return true;
        }
    }
    
    for (int i = 0; i < password.length() - 2; i++) {
        if (isXiaoxie(password[i]) && isXiaoxie(password[i + 1]) && isXiaoxie(password[i + 2])) {
            if ((password[i + 2] - password[i + 1] == 1) && (password[i + 1] - password[i]) == 1)
                return true;
        }
    }
    
    if (password.find("password") != string::npos)
        return true;
    
    if (password.find("admin") != string::npos)
        return true;
    
    if (password.find("qwerty") != string::npos)
        return true;
    
    if (password.find("hello") != string::npos)
        return true;
    
    if (password.find("iloveyou") != string::npos)
        return true;
    
    if (password.find("112233") != string::npos)
        return true;
    
    return false;
}

int main() {
    initCharacterCheckHash();
    int n;
    cin >> n;
    string tmp;
    while (n--) {
        cin >> tmp;
        bool isWeak = isPasswordWeak(tmp);
        if (isWeak)
            cout << "no" << endl;
        else
            cout << "yes" << endl;
    }
    
    return 0;
}