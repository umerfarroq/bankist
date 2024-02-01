//BANKIST APP
//DATA FOR BANKIST APP
const account1={
    owner:'Jonas Schmedtmann',
    movements:[200,450,-400,3000,-650,-130,70,1300],
    interestRate:1.2,
    pin:1111,
   

    movementsDates: [
        "2019-11-18T21:31:17.178Z",
        "2019-12-23T07:42:02.383Z",
        "2020-01-28T09:15:04.904Z",
        "2020-04-01T10:17:24.185Z",
        "2020-05-08T14:11:59.604Z",
        "2020-07-26T17:01:17.194Z",
        "2020-07-28T23:36:17.929Z",
        "2020-08-01T10:51:36.790Z",
      ],
      currency: "EUR",
      locale: "pt-PT", 
};
const account2={
    owner:'Jessica Davis',
    movements:[5000,3400,-150,-790,-3210,-1000,8500,-30],
    interestRate:1.5,
    pin:2222,
    movementsDates: [
        "2019-11-18T21:31:17.178Z",
        "2019-12-23T07:42:02.383Z",
        "2020-01-28T09:15:04.904Z",
        "2020-04-01T10:17:24.185Z",
        "2020-05-08T14:11:59.604Z",
        "2020-07-26T17:01:17.194Z",
        "2020-07-28T23:36:17.929Z",
        "2020-08-01T10:51:36.790Z",
      ],
    currency: "USD",
    locale: "en-US",
};
const account3={
    owner:'Steven Thomas Williams',
    movements:[200,-200,340,-300,-20,50,400],
    interestRate:0.7,
    pin:3333,
    movementsDates: [
        "2019-11-18T21:31:17.178Z",
        "2019-12-23T07:42:02.383Z",
        "2020-01-28T09:15:04.904Z",
        "2020-04-01T10:17:24.185Z",
        "2020-05-08T14:11:59.604Z",
        "2020-07-26T17:01:17.194Z",
        "2020-07-28T23:36:17.929Z",
        "2020-08-01T10:51:36.790Z",
      ],
      currency: "USD",
      locale: "en-US",
};
const account4={
    owner:'Sarah Smith',
    movements:[430,1000,700,50,90],
    interestRate:1,
    pin:4444,
    movementsDates: [
        "2019-11-18T21:31:17.178Z",
        "2019-12-23T07:42:02.383Z",
        "2020-01-28T09:15:04.904Z",
        "2020-04-01T10:17:24.185Z",
        "2020-05-08T14:11:59.604Z",
        "2020-07-26T17:01:17.194Z",
        "2020-07-28T23:36:17.929Z",
        "2020-08-01T10:51:36.790Z",
      ],
      currency: "EUR",
      locale: "pt-PT",
};

const accounts=[account1,account2,account3,account4];

//SELECTING ELEMENTS


const containerMovements=document.querySelector('.movements');
const labelBalance=document.querySelector('.balance-value');
const lableSumIn=document.querySelector('.bottom-amount-in');
const labelSumOut=document.querySelector('.bottom-amount-out');
const labelinterest=document.querySelector('.bottom-amount-interst');
const inputLoginUsername=document.querySelector('.input-login-user');
const inputLoginPassword=document.querySelector('.input-login-password');
const loginButton=document.querySelector('.btn-login');
const loginMessage=document.querySelector('.login-message');
const containerApp=document.querySelector('.main-app-container');
const buttonTransfer=document.querySelector('.btn-transfer');
const transferInputField=document.querySelector('.transfer-account');
const transferAmount=document.querySelector('.transfer-amount');
const loanInputField=document.querySelector('.lone-input-field');
const loanButton=document.querySelector('.btn-request-lone');
const CloseAccountUser=document.querySelector('.input-closeacc-user');
const closeAccountPin=document.querySelector('.input-closeacc-pin')
const sortButton=document.querySelector('.btn-sort');
const closeAccBtn=document.querySelector('.btn-close-acc');
const labelDate=document.querySelector('.date');
const labelTimer=document.querySelector('.timer');


const formatcurr=function(value,locale,currency){
    return new Intl.NumberFormat(locale,{
        style:'currency',
        currency:currency ,
    }).format(value);

}
//DOM ELEMENTS FOR DISPLAYING MOVEMENTS


const displayMovements=function(acc,sort=false){
    containerMovements.innerHTML='';

    // const movs = sort ? [...acc.movements].sort((a, b) => b - a) : acc.movements;
    console.log('this is acc in displaymovements', acc.movements)
    const movs=sort ? acc.movements.slice().sort(function(a,b){
        return a-b;
    }): acc.movements;
    console.log(movs);

    movs.forEach(function(mov,i){
        const type=mov>=0 ? `deposit` : `withdrawal`;
        const date=new Date(acc.movementsDates[i]);
        const month=date.getMonth()+1;
        const year=date.getFullYear();
        const day=date.getDate();

    // const displayDate=`${day}/${month}/${year}`;
    const displayDate=new Intl.DateTimeFormat(acc.locale).format(date);
       
        const formattedMov=formatcurr(mov,acc.locale,acc.currency);

        
        //     style:'currency',
        //     currency:acc.currency  ,
        // }).format(mov);
        
        const html=`
        <div class="movements-row">
                        <div class="movements-type">
                            <p class="movements-type-para movements-type-${type}">${i+1} ${type} </p>
                            <div class="movements-date">
                                <p>${displayDate}</p>
                            </div>
                        </div>
                       
                        <div class="movements-amount"> 
                            <p>${formattedMov}</p>
                        </div>
                    </div>
        `;

        containerMovements.insertAdjacentHTML('afterbegin',html);
    });
};



 



//DISPLAY bALANCE FUNCTION
const CalcDisplayBalance=function(acc){
    acc.balance=acc.movements.reduce(function(acc,cur,i){
        return acc+cur;
    } ,0);
    labelBalance.textContent=formatcurr(acc.balance,acc.locale,acc.currency); 
    // console.log(acc);

}


//USERNAME 
const createUsernames=function(accs){
    accs.forEach(function(acc){
        acc.username=acc.owner
        .toLocaleLowerCase().split(' ')
        .map(function(name){
        return name[0];
        }).join(''); 
    });
  
};
createUsernames(accounts);
//DISPLAYIN BOTTOM SUMMERY IN
const calcDisplaySummary=function(acc){
    const incomes=acc.movements.filter(function(mov,i){
        return mov>0;
    }).reduce(function(acc,curr){
        return acc+curr;
    },0)
    lableSumIn.textContent=formatcurr(incomes,acc.locale,acc.currency);
    ;
};



//DISPLAY BOTTOM SUMMARY OUT
const calcDisplaySummaryOut=function(acc){
    const incomeOut=acc.movements.filter(function(mov,i){
        return mov<0;
    }).reduce(function(acc,cur,i){
        return acc+cur;
    },0);
    labelSumOut.textContent=formatcurr(Math.abs(incomeOut),acc.locale,acc.currency);
    ;


    //CALCULATING INTEREST

    const interest=acc.movements.filter(function(mov){
        return mov>0;
    }).map(function(deposit){
        return   (deposit*acc.interestRate)/100;
    }).filter(function(int ,i,arr){
        // console.log(arr);
        return int>=1;
    }).
    reduce(function(acc,int){
        return acc+int
    },0)
    const roundedInterest = interest.toFixed(2);
    labelinterest.textContent=formatcurr(roundedInterest,acc.locale,acc.currency);
    ;

}
 const updateUI=function(acc){
     //DISPLAY MOVEMENTS
     displayMovements(acc);

     //DISPLAY BALANCE
     CalcDisplayBalance(currentAccount);
     //DISPLAY SUMMARY
     calcDisplaySummary(acc);
     //DISPLAY SUMMARY OUT
     calcDisplaySummaryOut(acc); 
 }



const startLoginOutTimer=function(){
    const tick=function(){
        const min=String( Math.trunc(time/60)).padStart(2,0);
        const sec=String(time%60).padStart(2,0);
        labelTimer.textContent=`${min}:${sec}`;

       
        if(time===0){
            clearInterval(timer);
            loginMessage.textContent='Login to get started';
            containerApp.style.opacity=0;
        }
        time--;
    }
    let time=10000;
    tick();
    const timer=setInterval(tick,1000);
    return timer;
}
// currentAccount=account1;
// updateUI(currentAccount);
// containerApp.style.opacity=100;
let currentAccount,timer;
// const now=new Date();
// const day=now.getDate();
// labelDate.textContent=`${day}/${month}/${year},${hour}:${min}`;
loginButton.addEventListener('click',function(Event){
    Event.preventDefault();
    console.log('LOGIN');

    currentAccount=accounts.find(function(acc){
        if(acc.username === inputLoginUsername.value);
        return true;
            
        
    });
//     const now=new Date();
// const day=now.getDate();
// const month=now.getMonth()+1;
// const year=now.getFullYear();
// const hour=now.getHours();
// const min=now.getMinutes();

// labelDate.textContent=`${day}/${month}/${year}/${hour}/${min}`;
   
    currentAccount=accounts.find(acc => acc.username === inputLoginUsername.value);
    console.log(currentAccount);
    if(currentAccount?.pin === Number(inputLoginPassword.value) ){
        //DISPLAY UI AND WELCOME MESSAGE
        
        loginMessage.textContent=`Welcome back,${currentAccount.owner.split(' ')[0]}`
        console.log('LOGIN');
        containerApp.style.opacity=100;
       
    }
   
    // const month=now.getMonth()+1;
    // const year=now.getFullYear();
    // const hour=now.getHours();
    // const min=now.getMinutes();
    // const day=now.getDate();
    // labelDate.textContent=`${day}/${month}/${year},${hour}:${min}`;
    const now=new Date();
    const options={
        hour:'numeric',
        minute:'numeric',
        day:'numeric',
        month:'numeric',
        year:'numeric',
    };
    // const locale=navigator.language;
    // console.log(locale);

    labelDate.textContent=new Intl.DateTimeFormat(currentAccount.locale,options).format(now);
 
    //CLEAR INPUT FIELDS
        inputLoginUsername.value=inputLoginPassword.value='';
        inputLoginPassword.blur();

        if(timer) clearInterval(timer);
        timer=startLoginOutTimer();
  
    updateUI(currentAccount);
});

//TRANSFER AMOUNT FEATURE
buttonTransfer.addEventListener('click',function(e){
    e.preventDefault();
    const amount=Number(transferAmount.value);
    const receiveAcc=accounts.find(function(acc){
        if(acc.username===transferInputField.value){
            console.log(acc);
            
            return acc;
            
        }
       
        
    });

    console.log(amount,receiveAcc);
    transferInputField.value=transferAmount.value=''; 
    if(amount>0 && currentAccount.balance >= amount && receiveAcc && receiveAcc?.username !== currentAccount.username){
        currentAccount.movements.push(-amount);
        receiveAcc.movements.push(amount);
//add transfer date
        currentAccount.movementsDates.push(new Date().toISOString());
        receiveAcc.movementsDates.push(new Date().toISOString());
        updateUI(currentAccount);
    }

    
}); 

//REQUEST LONE BUTTON
loanButton.addEventListener('click',function(acc){
    const loanAmount=Number(loanInputField.value);
    if(loanAmount >0 ){
        currentAccount.movements.push(loanAmount);

        currentAccount.movementsDates.push(new Date().toISOString());
       
        console.log(currentAccount);
        setTimeout(function(){
            updateUI(currentAccount);
        },2500)
        
    }
    else{
        alert('please enter positive number');
    }
    loanInputField.value=''; 
   
});

//CLOSE ACCOUNT FUNCTIONALITY

closeAccBtn.addEventListener('click',function(acc){
    acc.preventDefault();
    if(CloseAccountUser.value===currentAccount.username && Number(closeAccountPin.value)){
        containerApp.style.opacity=0;
        loginMessage.textContent=`Log in to get started`
    }
    // const requestedUsername=CloseAccountUser.value;
    // const passWord=Number(closeAccountPin.value);
    // currentAccount=accounts.find(function(acc){
    //     return acc.username===requestedUsername ;
        
    // });
   

    
    

    // if(currentAccount && passWord===currentAccount.pin){
    //     containerApp.style.opacity=0;
    // }
    // console.log(currentAccount);
    CloseAccountUser.value='';
    closeAccountPin.value='';

});




//IMPLEMENTING SORT FUNCTIONALITY
let sorted=false;
sortButton.addEventListener('click', function(e){
    e.preventDefault();
    
    displayMovements(currentAccount,!sorted);
    console.log('this is current account',currentAccount);
    // console.log(acc);
    sorted=!sorted;
})

const bankDeposit=accounts.flatMap(mov => mov.movements).filter(acc => acc>0).reduce((acc,curr,i)=> acc+curr,0 )
console.log(bankDeposit);

const bankDeposit1000=accounts.flatMap(mov => mov.movements)
.reduce((acc,curr,i)=> curr>=1000 ? ++acc : acc ,0 );
console.log(bankDeposit1000);


// const sums=accounts.flatMap(mov => mov.movements)
// .reduce((sum,curr) => {
//     curr>0 ? (sum.deposits+=curr) : (sum.withdrawals+=curr)
//     return sums
// },
// {deposits:0,withdrawals:0}
// )
// console.log(sums);

const sums=accounts.flatMap(acc => acc.movements).reduce((sums,cur)=>{
    cur>=0 ? sums.deposits+=cur : sums.withdrawals+=cur;
    return sums;

},{deposits:0 , withdrawals:0})
console.log(sums);





