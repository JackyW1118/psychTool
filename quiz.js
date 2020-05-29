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
	saButton.disabled = true;

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
			document.getElementById("ques" + quesNum).value = "Correct Answer: " + currentQues.answer;
		}
	});
	SaResultContainer.innerHTML = `You got ${correct} out of ${defineQues.length}`;
}


function showMcResults(){
	mcButton.disabled = true;

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
  },
  {
    question: "Why aren't experiment always the best option?",
    answers: {
      a: "It does not suggest cause and effect relationship",
      b: "There are ethical concerns",
      c: "It is always more expensive than other research methods"
    },
    correctAnswer: "b"
  },
  {
    question: "What is phineas gage an example of?",
    answers: {
      a: "Case study",
      b: "Experiment",
      c: "Correlational study"
    },
	correctAnswer: "a"
  }
];
const defineQues = [
	{
		question: "Define independent variable: ",
		keywords: ["manipulate","change","experimented","does not dependent","studied"],
		answer:"can be something like: the variable that is controlled and manipulated by the experimenter"
	},
	{
		question: "A student wants to investigate the effect of schizophrenia on behavior. What research method is the most suitable?",
		keywords: ["naturalistic observation","case study"],
		answer: "natrualistic observation or case study"
	},
	{	
		question: "A researcher studies a group of students for several month. What research method is the researcher utilizing?",
	 	keywords: ["longitudinal study","longitudinal"],
		answer: "longitudinal study"
	},
	{
		question:"In an experiment,a researcher uses a random number generator to determine which group a participant is assigned to. What is the researcher utilizing?",
		keywords:["random assignment"],
		answer:"random assignment"
	},
	{
		question: "Define operational defination",
		keywords:["exact","carefully worded","statement"],
		answer: "a carefully worded statement of the operations used in a research"
	},
	{
		question: "In a study, researchers are trying to determine the effect of sunlight on student's performance in a test. What is the independent variable?",
		keywords:["sunlight","effect of sunlight","light"],
		answer:"the effect of sunlight"
	},
	{
		question: "For the same study as the last question. What would be an operational defination of the dependent variable?",
		keywords:["score","numerical score","grade","mark"],
		answer:"the numerical score or grade mark students received on the test"
	},
	{
		question: "Find mean of this set of data: [4,7,8,2,5,7,9]",
		keywords:["6","six"],
		answer:"(4+7+8+2+5+7+9)/7=6"
	},
	{
		question: "Which term refers to perceiving a relationship between variables even when no such relationship exists",
		keywords:["illusory correlation"],
		answer:"illusory correlation"
	},
	{
		question: "Define mode:",
		keywords:["occured most frequent","most frequent","occured the most","occured most","most commmon","most often"],
		answer:"the value occured most often"
	},
	{
		question: "A researcher randomly selects people to participate in a research. What selection method is the researcher utilizing?",
		keywords:["random selection"],
		answer:"random selection"
	},
	{
		question: "Find the median of this sorted data set: [2,4,5,7,8,9,12]",
		keywords:["7","seven"],
		answer:"the value in the middle is 7"
	},
];

buildMc(mcQues);
buildDefineQues(defineQues);
console.log("created by Jacky Wang")
mcButton.addEventListener('click',showMcResults);
saButton.addEventListener('click',showSAResults);