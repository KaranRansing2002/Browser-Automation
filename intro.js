const puppeteer=require("puppeteer"); 

console.log("before");

let page;

const browserOpenPromise=puppeteer.launch({
    headless : false,
    slowMo : true,
    defaultViewport : null,
    args : ["--start-maximized"]
});
browserOpenPromise.then(function(browser){
    let pageOpenPromise = browser.pages();
    return pageOpenPromise;
}).then(function (browserPages){
    page=browserPages[0];
    let gotoPromise=page.goto("https://www.google.com");
    return gotoPromise;
}).then(function(){
    let elementWaitPromise=page.waitForSelector("input[type='text']",{visible : true});
    return elementWaitPromise;
}).then(function(){
    //console.log("reached");
     return page.type("input[type='text']","pepcoding");
}).then(function(){
    return page.keyboard.press("Enter");
}).then(function(){
    return page.waitForSelector("h3.LC20lb.DKV0Md",{visible : true});
}).then(function(){
    return page.click("h3.LC20lb.DKV0Md");
})
.catch(function(err){
    console.log(err);
})
console.log("after");