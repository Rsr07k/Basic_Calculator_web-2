let btns=document.querySelectorAll(".buttons");
let ans=document.querySelector(".ans")


//to convert string into array so that we can separate num and operators during postfix conversion
function gettokens(x){
    let token=[];
    let str="";
   for(let i=0;i<x.length;i++){
    
    if(x[i]=='+' || x[i]=='-' || x[i]=='*' || x[i]=='/' || x[i]=='(' || x[i]==')' ){
        if(str!=="")
        token.push(str);
        
        token.push(x[i]);
        str="";

    }
    else {
        str+=x[i];
    }
   }
   token.push(str);
   return token;

}

//get postfix expression
function getpostfix(x){
    let st=[];
    let postfix=[];
    let p=new Map();
    p.set("+",1);
    p.set("-",1);
    p.set("*",2);
    p.set("/",2);
    
    for(let i=0;i<x.length;i++){
        if(!isNaN(Number(x[i]))){
            postfix.push(x[i]);
        }
        else{
            if(st.length==0)st.push(x[i]);
            else if(x[i]=="(" || p.get(x[i])>p.get(st[st.length-1]))st.push(x[i]);
            else if(x[i]==')'){
                while(st[st.length-1]!=='('){
                    postfix.push(st[st.length-1]);
                    st.pop();
                }
                st.pop();
            }
            else {
                while(st.length>0 && p.get(x[i])<=p.get(st[st.length-1])){
                    postfix.push(st[st.length-1]);
                    st.pop();
                }
                st.push(x[i]);
            }
            
        }
    }   
    while(st.length>0){
        postfix.push(st[st.length-1]);
        st.pop();

    } 
    return postfix;
    
}

    const evaluate=(curr)=>{
    let st=[];
    
    for(let i=0;i<curr.length;i++){
    if(!isNaN(Number(curr[i]))){
        st.push(Number(curr[i]));
    }
    else {
        let b=st.pop();
        let a =st.pop();
        if(curr[i]=="+")st.push(a+b);
        else if(curr[i]=='-')st.push(a-b);
        else if(curr[i]=='*')st.push(a*b);
        else st.push(a/b);
        
    }
    }
    return st[0];
    }

btns.forEach((btn)=>{
btn.addEventListener("click",function(){
    let x=btn.textContent;
    let curr=ans.textContent;
    if(x=="AC")ans.textContent="";
    else if(x=="DE" ){
        if( ans.textContent.length>0)
        ans.textContent=ans.textContent.slice(0,-1);
    }
    else if(x!=="="){
        ans.textContent+=x;
    }
    else {
        curr=gettokens(curr);
        console.log(curr);
        curr=getpostfix(curr);
        curr=evaluate(curr);
        curr=curr.toPrecision(5);
        ans.textContent=curr;
    
        
        
        
        
        

        
        
    }

   


    

});
});