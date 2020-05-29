//quiz JS by Jacky Wang

function buildMc(ques){
	const output = [];
	ques.forEach(
		(currentQuestion,questionNumber) => {
			const answers = [];
			
			for(letter in currentQuestion.answers){
				answers.push(
				`<label>
					<input type="radio" name="question${questionNumber}" value="${letter}">
					${letter} :
					${currentQuestion.answers[letter]}
				 </label>
				 <br>`
				)
			}
			
			output.push(
				`<div class="question"> ${(questionNumber+ 1) + ". " + currentQuestion.question} </div>
        		<div class="answers"> ${answers.join('')} </div><br>`
			);
		}
	);
	McContainer.innerHTML = output.join('');
}
function buildDefineQues(ques){
	const output = [];
	ques.forEach(
		(currentQuestion,questionNumber) => {
			const answer = `<label>
								<input style="width: 500px;" type="text" id = "ques${questionNumber}" name="defquestion${questionNumber}" value="">
							 </label>`
			output.push(
				`<div class="defquestion">${(questionNumber+ 1) + ". " + currentQuestion.question}</div>
				 <div class="defanswers"> ${answer} </div><br>`

			)
		});
	defineContainer.innerHTML = output.join('');
}

function showSAResults(){
	const quesContainers = defineContainer.querySelectorAll('.defquestion');
	let correct = 0;
	defineQues.forEach((currentQues,quesNum)=>{
		const currentAnswer = document.getElementById("ques" + quesNum).value;
		let ifCorrect = false;
		for(key in currentQues.keywords){
			if(currentAnswer.toLowerCase().includes(currentQues.keywords[key])){
				correct++;
				ifCorrect = true;
				quesContainers[quesNum].style.color = 'green';
				break;
			}
		}
		if(!(ifCorrect)){
			quesContainers[quesNum].style.color = 'red';
			document.getElementById("ques" + quesNum).value = currentQues.answer;
		}
	});
	SaResultContainer.innerHTML = `You got ${correct} out of ${defineQues.length}`;
}

function showMcResults(){
	const answerContainers = McContainer.querySelectorAll('.answers');
	const quesContainers = McContainer.querySelectorAll('.question');
	let correct = 0;
	
	mcQues.forEach((currentQues,quesNum)=>{
		const answerContainer = answerContainers[quesNum];
		const selector = `input[name=question${quesNum}]:checked`;
		const userPut = (answerContainer.querySelector(selector) || {}).value;
		
		if(userPut === currentQues.correctAnswer){
			correct++;
			quesContainers[quesNum].style.color='green';
		}else{
			quesContainers[quesNum].style.color = 'red';
		}
	});
	
	McResultContainer.innerHTML = `You got ${correct} out of ${mcQues.length}`
}

const McContainer = document.getElementById('mcquiz');
const defineContainer = document.getElementById('defques');
const McResultContainer = document.getElementById('results');
const SaResultContainer = document.getElementById('saResults');
const saButton = document.getElementById('submitSA')
const mcButton = document.getElementById('submit');
const mcQues = [
  {
    question: "What is a drawback of case study?",
    answers: {
      a: "The result cannot be generalized",
      b: "Some case studies are unethical",
      c: "It can only offer casue and effect relationship"
    },
    correctAnswer: "a"
  },
  {
    question: "A way to study an individual or a group is an example of",
    answers: {
      a: "Naturalistic observation",
      b: "Case study",
      c: "Survey"
    },
    correctAnswer: "b"
  },
  {
    question: "What is the purpose of double blind procedure?",
    answers: {
      a: "Researchers don't know which group the participants are in",
      b: "To ehance placebo effect",
      c: "To avoid bias",
      d: "To reduce placebo effect"
    },
    correctAnswer: "d"
  },
  {
    question: "What is the purpose of a natrualistic observation?",
    answers: {
      a: "To establish casue and effect",
      b: "To figure out the effect of changing a variable",
      c: "To test a hypothesis",
      d: "To observe a behavior"
    },
    correctAnswer: "d"
  },
  {
    question: "A student is considering to figure out the effect of drought on plant growth. What kind of research method should she use?",
    answers: {
      a: "correlational study",
      b: "experiment",
      c: "cross-sectional study"
    },
    correctAnswer: "b"
  },
  {
    question: "What are confounding variables?",
    answers: {
      a: "Variables that are controlled",
      b: "Variables that is being tested",
      c: "Variables that affects the dependent variable",
      d: "Variables that should be considered to test when conducting an experiment",
	  e: "Variables that affects  the independent variable"
	 
    },
    correctAnswer: "c"
  },
  {
    question: "What does it mean to be statistical significant?",
    answers: {
      a: "A cause and effect relationship cannot established.",
      b: "The likelyhood that the result occurs by chance is little.",
      c: "There is a correlation between the variables."
	 
    },
    correctAnswer: "b"
  },
  {
    question: "What is illusory correlation",
    answers: {
      a: "A relationship between two variables is evident",
      b: "Believing there is a relationship between two variables when there actually isn't",
      c: "Refers to the fact that correlation does not mean causation."
    },
    correctAnswer: "b"
  }
];
const defineQues = [
	{
		question: "Define independent variable: ",
		keywords: ["manipulate","change","experimented","does not dependent","studied"],
		answer:"correct answer: can be something like: the variable that is controlled and manipulated by the experimenter"
	},
	{
		question: "A student wants to investigate the effect of ADHD. What research method is the most suitable?",
		keywords: ["naturalistic observation","observation"],
		answer: "correct answer: natrualistic observation"
	},
	{	
		question: "A researcher studies a group of students for several month. What research method is the researcher utilizing?",
	 	keywords: ["longitudinal study","longitudinal"],
		answer: "correct answer: longitudinal study"
	},
	{
		question:"In a experiment,a researcher uses a random number generator to determine which group a participant is assigned to. What is the researcher utilizing?",
		keywords:["random assignment"],
		answer:"correct answer: random assignment"
	},
	{
		question: "Define operational defination",
		keywords:["exact","carefully worded","statement"],
		answer: "correct answer: a carefully worded statement of the operations used in a research"
	}
];

buildMc(mcQues);
buildDefineQues(defineQues);
console.log("created by Jacky Wang")
mcButton.addEventListener('click',showMcResults);
saButton.addEventListener('click',showSAResults);