const codeOb=require('./quesAns.js')

const puppeteer=require("puppeteer");

const link="https://www.hackerrank.com/auth/login";

const browserOpenPromise=puppeteer.launch({
    headless : false,
    args : ["--start-maximized"],
    defaultViewport : null,
    slowMo : true
})
let page;

browserOpenPromise.then(function(browser){
    return browser.newPage();
}).then(function(newTab){
    page=newTab;
    return page.goto(link);
}).then(function(){
    return page.waitForSelector('input[type="text"]',{visible : true});
}).then(function(){
    return page.type('input[type="text"]',"ransingkaran495@gmail.com");
}).then(function(){
    return page.type('input[type="password"]',"Karan@2002");
}).then(function(){
    return page.click('button[data-analytics="LoginPassword"]');
}).then(function(){
    let clickOnAlgorithms=waitAndClick(".track-name",page);
    return clickOnAlgorithms;
}).then(function(){
    let clickWarmUp=waitAndClick('input[value="warmup"]',page);
    return clickWarmUp;
}).then(function(){
    return page.waitFor(3000);
}).then(function(){
    let allChalengePromise=page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled');
    return allChalengePromise;
}).then(function(quesArr){
    console.log('quesArr length = ',quesArr.length);
    let quesSolvePromise=quesSolver(page,quesArr[0],codeOb.ans[0])
    return quesSolvePromise;
})


function waitAndClick(selector,cpage){
    return new Promise(function(resolve,reject){
        let waitForModelPromise = cpage.waitForSelector(selector)
        waitForModelPromise.then(function(){
            return cpage.click(selector)
        }).then(function(){
            resolve();
        }).catch(function(err){
            reject();
        })
    })
}

function quesSolver(page,question,ans){
    return new Promise(function(resolve,reject){
        let quesWillBeClicked=question.click();
        quesWillBeClicked.then(function(){
            let editorClick=waitAndClick('.monaco-editor.no-user-select.vs',page);
            return editorClick;
        }).then(function(){
            let pressCtrl=page.keyboard.down("Control")
            return pressCtrl;
        }).then(function(){
            let pressA=page.keyboard.press('A');
            return pressA;
        }).then(function(){
            let unPressCtrl=page.keyboard.up("Control");
            return unPressCtrl;
        }).then(function(){
            let pressBacspace=page.keyboard.press("Backspace");
            return pressBacspace;
        }).then(function(){
            return page.type('.monaco-editor.no-user-select.vs',ans);
        }).then(function(){
            let submitQues=waitAndClick('.ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled',page);
            return submitQues;
        }).then(function(){
            resolve();
        }).catch(function(err){
            reject();
        })
    })
}