let root = document.getElementById('root');
let questions = [];
let score = 0;


rootPage();

function rootPage(){   // The first page befor clikc on "Play" or "Score Board"
    root.innerHTML=`
                <div id="start-component" class="text-center d-flex justify-content-center align-items-center" style="height:100vh;">
                    <div style="width:500px;">
                        <h1 class="display-4 text-primary font-weight-bold">Trivia Game</h1>
                        <button class="btn rounded-0 btn-lg btn-primary d-block my-5" style="width:100%" id="home" onclick="getQuestions()">Play</button>
                        <button class="btn rounded-0 btn-lg btn-primary d-block my-5" id="score-board" style="width:100%;" onclick="scoreBoard()">Score Board</button>
                    </div>    
                </div>
                <div id="game-container">
                </div>
                `;
}


let count = 0;
async function getQuestions(){  // Get questions from API
    score = 0;
    count = 0   // If we click on "Play Again" We will come to the above function, and we need to reset the counter
    let response = await fetch('https://opentdb.com/api.php?amount=100');
    let {results} = await response.json();
    questions = results;
    createQuestionPage(1, questions[0].question, questions[0].incorrect_answers[0], questions[0].incorrect_answers[1], questions[0].incorrect_answers[2], questions[0].correct_answer);
}

function Driver(questionNumber, correctAnswer){
    let index = parseInt(questionNumber);
    let answer = questions[index-1].correct_answer;
    if(answer === correctAnswer)
        score += 10;
    if(index === 10){
        finalPage();
    }else{
        createQuestionPage(index+1, questions[index].question, questions[index].incorrect_answers[0], questions[index].incorrect_answers[1], questions[index].incorrect_answers[2], questions[index].correct_answer);
    }
}


function createQuestionPage(questionNumber, question, option1, option2, option3, answer){
    count++;
    console.log(count)
    clearInterval(timerIndex);
    if(count < 10){
        document.getElementById('timer').innerHTML ='';
        onStartClick()
    }
    else{
        document.getElementById('timer').innerHTML ='';
    }
    let homePage = document.getElementById('start-component');
    let gameContainer = document.getElementById('game-container');
    homePage.classList.remove('d-flex');
    homePage.classList.add('d-none');
    gameContainer.style = '';
    gameContainer.className = '';
    let answerOptions = [option1, option2, option3, answer];
    let radnomOptionIndex = [];
    while(radnomOptionIndex.length < 4){
        let index = Math.floor(Math.random()*4);
        if(!radnomOptionIndex.includes(index))
            radnomOptionIndex.push(index);
    }
    console.log("answer",answer);

    gameContainer.innerHTML=`
                            <div class="d-flex justify-content-between">
                                <h1 class="display-4" id="progessText">Question ${questionNumber}/10</h1>
                                <h1 class="display-4">Score</h1>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <div style="width:250px">
                                    <div class="progress rounded-0" style="width:100%; height:46px;">
                                        <div class="progress-bar bg-info rounded-0" style="width: ${questionNumber*10}%;" ></div>
                                    </div>
                                </div>
                                <h1 class="text-info">${score}</h1>
                            </div>
                            <h3 class="font-weight-light">${question}</h3>
                            <div>
                                <input type="radio" id="option0" name="options">
                                    <div class="input-group border d-flex" style="width:100%">
                                        <span class="input-group-text bg-primary text-white border-0 rounded-0" style="width:34px" id="basic-addon1">A</span>
                                        <label for="option0" class="my-auto ml-4" style="width:calc(100% - 58px)">
                                            ${answerOptions[radnomOptionIndex[0]]}
                                        </label>
                                    </div>
                            </div>
                            <div>
                                <input type="radio" id="option1" name="options">
                                    <div class="input-group border d-flex" style="width:100%">
                                        <span class="input-group-text bg-primary text-white border-0 rounded-0" style="width:34px" id="basic-addon1">B</span>
                                        <label for="option1" class="my-auto ml-4" style="width:calc(100% - 58px)">
                                            ${answerOptions[radnomOptionIndex[1]]}
                                        </label>
                                    </div>
                            </div>
                            <div>
                                <input type="radio" id="option2" name="options">
                                    <div class="input-group border d-flex" style="width:100%">
                                        <span class="input-group-text bg-primary text-white border-0 rounded-0" style="width:34px" id="basic-addon1">C</span>
                                        <label for="option2" class="my-auto ml-4" style="width:calc(100% - 58px)">
                                            ${answerOptions[radnomOptionIndex[2]]}
                                        </label>
                                    </div>
                            </div>
                            <div>
                                <input type="radio" id="option3" name="options">
                                    <div class="input-group border d-flex" style="width:100%">
                                        <span class="input-group-text bg-primary text-white border-0 rounded-0" style="width:34px" id="basic-addon1">D</span>
                                        <label for="option3" class="my-auto ml-4" style="width:calc(100% - 58px)">
                                            ${answerOptions[radnomOptionIndex[3]]}
                                        </label>
                                    </div>
                            </div>
                            `;
        let option0id = document.getElementById(`option0`);
        let option1id = document.getElementById('option1');
        let option2id = document.getElementById('option2');
        let option3id = document.getElementById('option3');

        option0id.addEventListener('click',()=>{Driver(questionNumber, answerOptions[radnomOptionIndex[0]])});
        option1id.addEventListener('click',()=>{Driver(questionNumber, answerOptions[radnomOptionIndex[1]])});
        option2id.addEventListener('click',()=>{Driver(questionNumber, answerOptions[radnomOptionIndex[2]])});
        option3id.addEventListener('click',()=>{Driver(questionNumber, answerOptions[radnomOptionIndex[3]])});
}


function finalPage(){
    let gameContainer = document.getElementById('game-container');
    gameContainer.className = 'd-flex flex-column justify-content-center align-items-center';
    gameContainer.style = "height:100vh;"
    gameContainer.innerHTML=`<div class="row text-center" style="width:100%;">
                                <h3 class="display-3 col-12 text-info my-1 text-light">Score: ${score}</h3>
                                <div class="col-12"><input type="text" placeholder="username" class="form-control col-6 py-1 mx-auto px-3 my-1" id="username"></div>
                                <div class="col-12"><button class="btn btn-info btn-sm p-2 my-1 rounded-0" id="save-btn" disabled>Save</button></div>
                                <div class="col-12"><button class="btn btn-info btn-lg p-2 my-1 rounded-0" id="play-again-btn">Play Again</button></div>
                                <div class="col-12"><button class="btn btn-info btn-lg p-2 my-1 rounded-0" id="go-home-btn">Home Page</button></div>
                            </div>
                            `;
    document.getElementById('username').addEventListener('keypress',toggleDisabled);
    document.getElementById('username').addEventListener('keyup',toggleDisabled);
    document.getElementById('save-btn').addEventListener('click', handleSave);
    document.getElementById('play-again-btn').addEventListener('click', getQuestions);
    document.getElementById('go-home-btn').addEventListener('click', rootPage);
}


function scoreBoard(){
    let highscoreArray = [];

    for(let i=0; i<localStorage.length; i++){
        let key = localStorage.key(i)
        let obj = JSON.parse(localStorage.getItem(key));
        highscoreArray.push(obj);
    }
    let compare = (a, b) =>{
        return b.score - a.score;
    }
    highscoreArray.sort(compare)
    
    root.innerHTML=`
                        <div id="start-component" class="text-center d-flex justify-content-center align-items-center" style="height:100vh;">
                            <div style="width:500px;">
                                <h1 class="display-4 text-info font-weight-bold">Score Board</h1>
                                ${
                                    highscoreArray.map((element)=>{
                                        return `<p class="displa-4 lead">${element.name} - ${element.score}</p>`;
                                    }).join('')
                                }
                                <div class="col-12"><button class="btn btn-info btn-lg p-2 my-1 rounded-0" id="go-home-btn">Go home</button></div>
                            </div>    
                        </div>
                    `;                               
    document.getElementById('go-home-btn').addEventListener('click', rootPage);                    
}


function handleSave(){
    let usrename = document.getElementById('username').value;
    let storedItem = localStorage.getItem(usrename)
    
    if(storedItem!==null){
        localStorage.setItem(usrename,JSON.stringify({'name':usrename, 'score': Math.max(storedItem, score)}))
    }else{
        localStorage.setItem(usrename, JSON.stringify({'name':usrename, 'score': Math.max(storedItem, score)}));
    }
    document.getElementById('username').value = '';
}


function toggleDisabled(){   // To save new user
    let usrename = document.getElementById('username');
    let saveBtn = document.getElementById('save-btn');
    if(usrename.value !== '')
        saveBtn.removeAttribute('disabled');
    else
        saveBtn.setAttribute('disabled', '');
}


const startBtn = document.getElementById('start-component');
startBtn.addEventListener('click',onStartClick)
let timerIndex;
    function onStartClick(){    // Timer
        let time= 15;
        timerIndex = setInterval(() => {
            document.getElementById('timer').innerHTML = time;
            time--;
            if(time < 0) {
                alert("You didn't answer the question --> Game Over")
                clearInterval(timerIndex);
                finalPage();
            }
        }, 1000);

    }
