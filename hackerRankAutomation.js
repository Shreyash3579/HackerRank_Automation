const puppeteer = require('puppeteer');
const Codeobj = require('./AnswerCodeToBeSubmiited');

const loginLink = "https://www.hackerrank.com/auth/login";
const email = 'fewivev481@tagbert.com';
const password = '9532764100';

let page;

const browserOpenpromise = puppeteer.launch({ 
    headless: false,
    args: ['--start-maximized'],
    defaultViewport: null
});

browserOpenpromise.then(function(browserObj){
    let newPageOpenPromise = browserObj.newPage();                 // open new tab
    return newPageOpenPromise;
}).then(function(newTab){
    page = newTab;
    let pageOpenPromise = page.goto(loginLink);
    return pageOpenPromise;
}).then(function(){
    let emailisenteredpromise = page.type("input[id='input-1']", email, {delay: 50});
    return emailisenteredpromise;
}).then(function(){
    let passwordisentered = page.type("input[type= 'password']", password, {delay: 50});
    return passwordisentered;
}).then(function(){
    return page.click('button[data-analytics="LoginPassword"]');
}).then(function(){
    let waitforele = page.waitForSelector("li.topic-card a[data-attr1= 'algorithms']", {visible: true});
    return waitforele;
}).then(function(){
    let clickonalgopromise = page.click("li.topic-card a[data-attr1= 'algorithms']");
    return clickonalgopromise;
}).then(function(){
    let goTowarmup = page.waitForSelector("input[value= 'warmup']",{visible: true});
    return goTowarmup;
}).then(function(){
    return page.click("input[value= 'warmup']");
}).then(function(){
    let waitfor3sec = page.waitForTimeout(3000);
    return waitfor3sec;
}).then(function(){
    let allQuestionspromise = page.$$('button.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled',{delay: 50});
    return allQuestionspromise;                            // $ -> document.querySelector() , $$ -> document.querySelectorAll() -> ShortHand expressions
}).then(function(questionArr){
    console.log("No. of Questions", questionArr.length);
    let questionWillBeSolved = questionSolver(page, questionArr[0], Codeobj.answers[0]);
    return questionWillBeSolved;
})




function questionSolver(page, question, answer){
    return new Promise(function(resolve, reject){                  // creation of a new promise -> generic syntax
        let questionWillBeClicked = question.click();

        questionWillBeClicked.then(function(){
            let editorinfocuspromise = page.waitForSelector('.monaco-editor.no-user-select.vs', {visible: true});
            return editorinfocuspromise;
        }).then(function(){
            return page.click('.monaco-editor.no-user-select.vs');
        }).then(function(){                     // cannot automate writing in original editor (due to autocompletion of braces). So, we will click on checkbox adjacent to custom input -> write code here and then copy and paste to editor
            return page.waitForSelector('input.checkbox-input',{visible: true});
        }).then(function(){
            return page.click('input.checkbox-input');
        }).then(function(){
            return page.waitForSelector('textarea.custominput', {visible: true});            // textarea.custominput -> can also be written
        }).then(function(){
            return page.type('textarea.custominput', answer, {delay: 20});
        }).then(function(){
            let ctrlishold = page.keyboard.down("Control");                   // down -> to press and hold, press -> to  just press once
            return ctrlishold;                                                // control -> wont work on mac from here
        }).then(function(){
            let Aispressed = page.keyboard.press("A", {delay: 50});
            return Aispressed;
        }).then(function(){
            let Xispressed = page.keyboard.press("X",{delay: 50});
            return Xispressed;
        }).then(function(){
            let ctrlisunhold = page.keyboard.up("Control");
            return ctrlisunhold;
        }).then(function(){
            return page.click('.monaco-editor.no-user-select.vs');
        }).then(function(){
            let ctrlishold = page.keyboard.down("Control");                   // down -> to press and hold, press -> to  just press once
            return ctrlishold;
        }).then(function(){
            let Aispressed = page.keyboard.press("A", {delay: 50});
            return Aispressed;
        }).then(function(){
            let Vispressed = page.keyboard.press("V",{delay: 50});
            return Vispressed;
        }).then(function(){
            let ctrlisunhold = page.keyboard.up("Control");
            return ctrlisunhold;
        }).then(function(){
            return page.click('.hr-monaco_run-code');
        }).then(function(){
            resolve();
        }).catch(function(err){
            reject();
        })
})

}