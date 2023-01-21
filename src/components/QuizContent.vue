<!-- eslint-disable -->
<template>
  <div class="quiz">
    <div v-if="!quizDone" class="progress">
      <span style="font-weight: bold">{{ currentQuestion.index + 1 }}</span> out
      of <span style="font-weight: bold"> {{ quizList.length }}</span> questions
    </div>
    <div v-show="!quizDone" class="quiz-content">
      <div class="question" tabindex="0">{{ currentQuestion.question }}</div>
      <div
        class="answer"
        v-for="(option, indexa) in currentQuestion.options"
        :key="indexa"
      >
        <label
          :for="'answer' + (currentQuestion.index + 1) + '-' + (indexa + 2)"
          tabindex="1"
        >
          {{ option }}
          <input
            hidden="hidden"
            :name="'choice-question' + currentQuestion.index + 1"
            type="radio"
            value="index"
            :id="'answer' + (currentQuestion.index + 1) + '-' + (indexa + 2)"
            @click="
              saveAnswer(
                currentQuestion.index,
                option,
                currentQuestion.question
              )
            "
          />
        </label>
      </div>
    </div>
    <div
      class="next-btn"
      v-if="!quizDone"
      @click="getCurrentQuestion()"
      tabindex="2"
    >
      {{ btnText }}
    </div>
  </div>
  <div v-show="quizDone" class="score-container">
    <div>
      Your score is {{ correctAnswers }} out of {{ quizList.length }}.
      <div
        v-for="(question, indexb) in quizUserInput"
        :key="indexb"
        class="quiz-content"
      >
        {{ question.question }}
        <div>
          <p>Your answer: <span style="font-style: italic; font-weight: bold;">{{ question.answer }}</span></p>
          <p v-if="question.correct" style="background-color: #42b983; color: white; font-weight: bold;">Correct!</p>
          <p v-if="!question.correct" style="background-color: #b94242; color: white; font-weight: bold;">Incorrect</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "QuizContent",
  data() {
    var currentQuestionOptions = ["", "", "", ""];
    return {
      queryString: "",
      quizList: [
        {
          question: "",
          options: [""],
          correctAnswer: "",
        },
      ],
      currentQuestion: {
        index: 0,
        question: "",
        options: currentQuestionOptions,
      },
      quizUserInput: [
        {
          index: "",
          question: "",
          answer: "",
          correct: false,
        },
      ],
      correctAnswers: 0,
      quizDone: false,
      thisQuestionNumber: 0,
      btnText: "Next question",
    };
  },
  props: {
    query: String,
  },
  created() {
    if (this.query) {
      this.queryString = this.query;
      this.getQuizFromApi(this.queryString);
    }
  },
  methods: {
    async getQuizFromApi(quiz: any) {
      try {
        var newQuiz;
        await axios.get(quiz).then((res) => {
          newQuiz = res.data.results;
        });
        this.makeQuiz(newQuiz);
        this.getCurrentQuestion();
      } catch (error) {
        alert("Error getting quiz from api");
      }
    },
    decodeHtml(html: any) {
      var txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
    },
    makeQuiz(quizFromApi: any) {
      const length = quizFromApi.length;
      this.quizList.shift();
      this.quizUserInput.shift();
      if (quizFromApi) {
        for (let i = 0; i < length; i++) {
          var question = this.decodeHtml(quizFromApi[i].question);
          var options = [];
          var correctAnswer = this.decodeHtml(quizFromApi[i].correct_answer);
          options.push(correctAnswer);

          for (let j = 0; j < quizFromApi[i].incorrect_answers.length; j++) {
            var option = this.decodeHtml(quizFromApi[i].incorrect_answers[j]);
            options.push(option);
          }
          this.quizList.push({
            question: question,
            options: options,
            correctAnswer: correctAnswer,
          });
        }
      }
    },
    getCurrentQuestion() {
      this.clearAnswers();
      this.selectedAnswer();
      var index = this.thisQuestionNumber;
      if (index >= this.quizList.length) {
        this.checkScore();
      } else {
        this.currentQuestion.index = index;
        this.currentQuestion.question = this.quizList[index].question;
        this.currentQuestion.options = this.quizList[index].options;
        this.thisQuestionNumber++;
      }
    },
    saveAnswer(index: any, answer: string, question: string) {
      var answerIsCorrect = false;
      var prevAnswer = -1;
      if (this.quizList[index].correctAnswer == answer) {
        answerIsCorrect = true;
      }
      for (let i = 0; i < this.quizUserInput.length; i++) {
        if (this.quizUserInput[i].index == index) {
          prevAnswer = i;
        }
      }
      if (prevAnswer != -1) {
        this.quizUserInput[prevAnswer].answer = answer;
        this.quizUserInput[prevAnswer].correct = answerIsCorrect;
        this.quizUserInput[prevAnswer].question = question;
      } else {
        this.quizUserInput.push({
          index: index,
          question: question,
          answer: answer,
          correct: answerIsCorrect,
        });
      }
    },
    checkScore() {
      var score = 0;
      this.quizDone = true;
      this.quizUserInput.forEach((answer: any) => {
        if (answer.correct == true) {
          score++;
        }
      });
      this.correctAnswers = score;
    },
    selectedAnswer() {
      /* eslint-disable */
      var options = document.querySelector(".quiz-content")?.querySelectorAll("label");

      options?.forEach((element: any) => {
        element.addEventListener("click", function() {
          options?.forEach(label => label.classList.remove("selected"));
          element.classList.add("selected");
        });
      });
    },
    clearAnswers() {
      /* eslint-disable */
      var options = document.querySelector(".quiz-content")?.querySelectorAll("label");
      options?.forEach(label => label.classList.remove("selected"));
    },
  },
});
</script>

<style scoped>
.quiz {
  display: flex;
  flex-direction: column;
  margin: auto;
  justify-content: center;
  align-items: center;
}
.progress {
  min-width: 350px;
  background-color: #f3f3f3;
  color:#333;
  padding: 16px;
  margin-top: 40px;
}
.quiz-content {
  background-color: #f3f3f3;
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 16px 40px;
  margin-top: 40px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 15%);
  min-width: 300px;
  max-width: 1020px;
}

.question {
  margin: 24px 0;
  font-size: 20px;
}

.answer {
  cursor: pointer;
  margin: 8px 0;
  border-radius: 5px;
  background-color: white;
}
.answer:hover,
.answer:active {
  font-weight: bold;
  background-color: rgb(196, 196, 196);
  color: white;
}

label {
  display: block;
  min-height: 100%;
  height: 100%;
  padding: 16px;
  border-radius: 5px;
  cursor: pointer;
}

.selected {
  background-color: rgb(100, 100, 249);
  color: white;
  font-weight: bold;
}

.next-btn {
  padding: 16px;
  margin: 40px;
  background-color: #42b983;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.next-btn:hover {
  box-shadow: 0 2px 8px rgb(0 0 0 / 25%);
}

.score-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
