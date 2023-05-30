var question = document.querySelector('div.css-901oao.r-jwli3a.r-1mkrsdo.r-1x35g6')
var observer;
var answerGPT;
var answerSonic;
var parent
var divGPT
var divAnswerGPT
var divSonic
var divAnswerSonic

function createDiv() {
        parent = document.querySelector("div.css-1dbjc4n.r-16y2uox.r-1wtj0ep.r-b5h31w.r-hnxvie").firstChild;
        divGPT = document.createElement('div');

        divGPT.className = 'css-1dbjc4n r-b5h31w r-1dzdj1l r-156q2ks';
        divAnswerGPT = document.createElement("div");
        divAnswerGPT.className = 'css-1dbjc4n r-lrvibr css-901oao r-jwli3a r-1mkrsdo r-1x35g6 r-10x3wzx r-q4m81j';
        divGPT.appendChild(divAnswerGPT);
        divGPT.style.backgroundColor = "rgb(17, 20, 33)";
        divGPT.style.boxShadow = "rgb(32 74 108) 0px 8px 0px";
        divGPT.style.marginTop = "20px";
        divGPT.style.cursor = "pointer";


        divSonic = document.createElement('div');
        divSonic.className = 'css-1dbjc4n r-b5h31w r-1dzdj1l r-156q2ks';
        divAnswerSonic = document.createElement("div");
        divAnswerSonic.className = 'css-1dbjc4n r-lrvibr css-901oao r-jwli3a r-1mkrsdo r-1x35g6 r-10x3wzx r-q4m81j';
        divSonic.appendChild(divAnswerSonic);
        divSonic.style.backgroundColor = "rgb(17, 20, 33)";
        divSonic.style.boxShadow = "rgb(32 74 108) 0px 8px 0px";
        divSonic.style.marginTop = "20px";
        divSonic.style.cursor = "pointer";
        document.body.style.border = "1px solid green";

}


async function requestGPT() {
    console.log("Question : " + question.innerText)


    fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': ''
        },
        body: JSON.stringify({
            'model': 'text-davinci-003',
            'prompt': question.innerText + 'Répond en 10 mots maximum.',
            'temperature': 0,
            'max_tokens': 30
        })
    }).then(response => response.json())
        .then(response => responseGPT(response.choices[0].text))
        .catch(err => {
            console.error(err)
            divAnswerSonic.innerText = "Erreur de connexion à GPT";
        });



}

async function requestSonic() {
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'X-API-KEY': ''
        },
        body: JSON.stringify({
            enable_google_results: true,
            enable_memory: false,
            input_text: question.innerText +'Répond en 5 mots maximum.',
        })
    };

    fetch('https://api.writesonic.com/v2/business/content/chatsonic?engine=premium&language=fr', options)
        .then(response => response.json())
        .then(response => responseSonic(response.message))
        .catch(err => {
            console.error(err)
            divAnswerSonic.innerText = "Erreur de connexion à Sonic";
        });

}



function responseGPT(response) {
    // strip all special characters but keep spaces
    answerGPT = response.replace(/[^\S ]+/g, "");
    console.log("Réponse GPT : " + answerGPT);

    //add the answer to the input css-11aywtz r-jwli3a r-16y2uox r-1mkrsdo r-1x35g6 r-t66pp7 r-10paoce

    divAnswerGPT.innerHTML = "Réponse GPT: <b>" + answerGPT + "</b>";

    




}

function responseSonic(response) {
    answerSonic = response.replace(/[^\S ]+/g, "");
    
    console.log("Réponse Sonic : " + answerSonic);
    //add the answer to the input css-11aywtz r-jwli3a r-16y2uox r-1mkrsdo r-1x35g6 r-t66pp7 r-10paoce

    //apend the answer to the div
    divAnswerSonic.innerHTML = "Réponse Sonic : <b>" + answerSonic + "</b>";


    //input.innerText = answers[0].text;

}

function requestApi() {
    divAnswerGPT.innerText = "Chargement de la réponse GPT...";
    divAnswerSonic.innerText = "Chargement de la réponse Sonic...";

    requestGPT();
    requestSonic();
    
}


// if div question exist and !=  of "La partie va bientôt commencer" start main() else retry until it exist
function start() {
    question = document.querySelector('div.css-901oao.r-jwli3a.r-1mkrsdo.r-1x35g6')
    console.log("start : " + question)
    document.body.style.border = "1px solid orange";
    if (question && question.innerText != "La partie va bientôt commencer") {
        console.log("start : " + question.innerText)
    
        createDiv();
        requestApi()
        // get everytime the div changes and execute the function "test"
        observer = new MutationObserver(requestApi);
        
        // add onclick event to the two div
        divGPT.addEventListener("click", copyGPT);
        divSonic.addEventListener("click", copySonic);

        divAnswerSonic.innerText = "Chargement de la réponse Sonic...";
        divAnswerGPT.innerText = "Chargement de la réponse GPT...";

    } else {
        setTimeout(start, 1000);
    }
}


// copyGPT
function copyGPT() {
    // css-11aywtz r-jwli3a r-16y2uox r-1mkrsdo r-1x35g6 r-t66pp7 r-10paoce
    var input = document.querySelector('input.css-11aywtz.r-jwli3a.r-16y2uox.r-1x35g6')
    input.value = answerGPT.replace(".", "");
    // Submit the input
    
    // Focus on the input
    input.focus();


}

// copySonic
function copySonic() {
    // css-11aywtz r-jwli3a r-16y2uox r-1mkrsdo r-1x35g6 r-t66pp7 r-10paoce
    var input = document.querySelector('input.css-11aywtz.r-jwli3a.r-16y2uox.r-1x35g6')
    input.value = answerSonic.replace(".", "");;
    // Submit the input

    input.focus();

}
document.body.style.border = "1px solid orange";


   
chrome.runtime.onMessage.addListener(data => {
    console.log(data);
    if (data == "activate") {
        observer.observe(question, {
            childList: true,
            subtree: true,
            characterData: true
        });
        parent.appendChild(divGPT);
        parent.appendChild(divSonic);
    } else if (data == "deactivate") {
        observer.disconnect();
        parent.removeChild(divGPT);
        parent.removeChild(divSonic);
    } else if (data == "status") {
        console.log(observer);
        chrome.runtime.sendMessage(observer == undefined || observer.takeRecords().length == 0 ? "inactive" : "active");
    }
});

start();



// https://docs.writesonic.com/reference/chatsonic_v2businesscontentchatsonic_post-1