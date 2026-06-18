let btns = document.querySelectorAll(".buttons");
let ans = document.querySelector(".ans");

// Helper to check if a string character is an operator
function isOperator(char) {
    return ['+', '-', '*', '/'].includes(char);
}

// Convert string into tokens, correctly sticking negative signs to numbers
function gettokens(x) {
    let token = [];
    let str = "";
    
    for (let i = 0; i < x.length; i++) {
        // A minus sign is a negative number prefix if:
        // 1. It is at the absolute beginning of the string index (i == 0)
        // 2. Or it follows another operator (e.g., *-, /-, +-) or an opening parenthesis '('
        if (x[i] === '-' && (i === 0 || isOperator(x[i - 1]) || x[i - 1] === '(')) {
            str += x[i]; // Keep minus attached to the upcoming number string
            continue;
        }

        if (x[i] == '+' || x[i] == '-' || x[i] == '*' || x[i] == '/' || x[i] == '(' || x[i] == ')') {
            if (str !== "") token.push(str);
            token.push(x[i]);
            str = "";
        } else {
            str += x[i];
        }
    }
    if (str !== "") token.push(str);
    return token;
}

// get postfix expression
function getpostfix(x) {
    let st = [];
    let postfix = [];
    let p = new Map();
    p.set("+", 1);
    p.set("-", 1);
    p.set("*", 2);
    p.set("/", 2);

    for (let i = 0; i < x.length; i++) {
        if (!isNaN(Number(x[i]))) {
            postfix.push(x[i]);
        } else {
            if (st.length == 0) st.push(x[i]);
            else if (x[i] == "(" || p.get(x[i]) > p.get(st[st.length - 1])) st.push(x[i]);
            else if (x[i] == ')') {
                while (st[st.length - 1] !== '(') {
                    postfix.push(st[st.length - 1]);
                    st.pop();
                }
                st.pop();
            } else {
                while (st.length > 0 && p.get(x[i]) <= p.get(st[st.length - 1])) {
                    postfix.push(st[st.length - 1]);
                    st.pop();
                }
                st.push(x[i]);
            }
        }
    }
    while (st.length > 0) {
        postfix.push(st[st.length - 1]);
        st.pop();
    }
    return postfix;
}

const evaluate = (curr) => {
    let st = [];

    for (let i = 0; i < curr.length; i++) {
        if (!isNaN(Number(curr[i]))) {
            st.push(Number(curr[i]));
        } else {
            let b = st.pop();
            let a = st.pop();
            if (curr[i] == "+") st.push(a + b);
            else if (curr[i] == '-') st.push(a - b);
            else if (curr[i] == '*') st.push(a * b);
            else st.push(a / b);
        }
    }
    return st[0];
}

function isValidExpression(expr) {
    if (expr.length == 1 && isNaN(Number(expr[0]))) return false;

    // 1. Allow a negative sign after an operator or parenthesis (e.g. *-, /-, (-, but NOT --, +-, or .-)
    // Blocks invalid repetitions like ++, **, //, .., +*, etc.
    if (/[\+\*\/]{2,}|[\-]{2,}|[\.]{2,}|[\+\*\/]\.|\.[\+\-\*\/]/.test(expr)) return false;

    // 2. Check if it starts or ends with an invalid operator
    // (Starting with a '-' or '+' is now perfectly OK for negative/positive entries!)
    if (/^[\*\/]/.test(expr) || /[\+\-\*\/]$/.test(expr)) return false;

    // 3. Check for empty parentheses like ()
    if (/\(\)/.test(expr)) return false;

    // 4. Check for mismatched parentheses balance
    let count = 0;
    for (let char of expr) {
        if (char === '(') count++;
        if (char === ')') count--;
        if (count < 0) return false; 
    }
    if (count !== 0) return false; 

    return true;
}

btns.forEach((btn) => {
    btn.addEventListener("click", function () {
        let x = btn.textContent;
        let curr = ans.textContent;
        
        if (curr == "Wrong Expression" || curr == "Infinity" ||curr=="-Infinity" || curr == "NaN") {
            ans.textContent = "";
            curr = "";
        }
        
        if (x == "AC") ans.textContent = "";
        else if (x == "DE") {
            if (ans.textContent.length > 0)
                ans.textContent = ans.textContent.slice(0, -1);
        }
        else if (x !== "=") {
            ans.textContent += x;
        }
        else if (x == "=" && curr === "") ans.textContent = "";
        else {
            if (!isValidExpression(curr)) {
                ans.textContent = "Wrong Expression";
                return; 
            }
            curr = gettokens(curr);
            console.log(curr);
            curr = getpostfix(curr);
            curr = evaluate(curr);
            
            // Format answer smoothly
            if (!isNaN(curr)) {
                curr = parseFloat(curr.toPrecision(5));
            }
            ans.textContent = curr;
        }
    });
});