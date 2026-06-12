let btns=document.querySelectorAll(".buttons");
let ans=document.querySelector(".ans")

btns.forEach((btn)=>{
btn.addEventListener("click",function(){
    let x=btn.textContent;
    let curr=ans.textContent;
    if(x=="AC")ans.textContent="";
    else if(x=="DE" && ans.textContent.length>0)ans.textContent=ans.textContent.slice(0,-1);
    else if(x!=="="){
        ans.textContent+=x;
    }
    else {
        let first="";
        let second="";
        let symbol="";
        for(let i=0;i<curr.length;i++)
        {   
            if(i==0 && curr[0]=='-'){
                first+=curr[0];
            }
            else if(  (curr.charCodeAt(i)<=57 && curr.charCodeAt(i)>=48)){
                first+=curr[i];
            }
            else {
                second=first;
                first="";
                symbol=curr[i];
            }
            
        }
        if(symbol=="*")
        ans.textContent=Number(second)*Number(first);
        else if(symbol=="/")
        ans.textContent=Number(second)/Number(first);
        else if(symbol=="+")
        ans.textContent=Number(second)+Number(first);
        else if(symbol=="-")
        ans.textContent=Number(second)-Number(first);
        
    }

   


    

});
});