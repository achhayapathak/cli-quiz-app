#!/usr/bin/env node
// A shebang used to tell the system to execute the code with node.js

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

let playerName;

const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow("Are you truly that smart? \n");

  await sleep();
  rainbowTitle.stop();
}

async function askName() {
  const answers = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "What is your name?",
    default() {
      return "Player";
    },
  });

  playerName = answers.player_name;
  console.log(chalk.bold.green("Welcome ", chalk.bold.cyan(playerName), "!"));
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner("Checking answer...").start();
  await sleep();

  if (isCorrect) {
    spinner.success({ text: `Nice work ${playerName}. That's a legit answer` });
  } else {
    spinner.error({ text: `💀💀💀 Game over, you lose ${playerName}!` });
    process.exit(1);
  }
}

async function question1() {
  const answers = await inquirer.prompt({
    name: "question_1",
    type: "list",
    message: "How many months have 28 days?\n",
    choices: ["1", "2", "Depends if theres a leap year or not", "All of them"],
  });

  return handleAnswer(answers.question_1 === "All of them");
}

async function question2() {
  const answers = await inquirer.prompt({
    name: "question_2",
    type: "list",
    message:
      "If you have a bowl with six apples and you take away four,\n how many apples do you have?\n",
    choices: ["2", "4", "6", "None"],
  });
  return handleAnswer(answers.question_2 === "4");
}

async function question3() {
  const answers = await inquirer.prompt({
    name: "question_3",
    type: "list",
    message: `A farmer has 17 goats. All of them but 8 die.\n How many goats are alive? \n`,
    choices: ["17", "🐏", "8", "9"],
  });

  return handleAnswer(answers.question_3 === "8");
}

async function question4() {
  const answers = await inquirer.prompt({
    name: "question_4",
    type: "list",
    message: "Which is heavier: a ton of bricks or a ton of feathers?\n",
    choices: [
      "A ton of bricks",
      "A ton of feathers",
      "They are both the same weight",
      "It depends on the type of bricks", // Correct
    ],
  });
  return handleAnswer(answers.question_4 === "They are both the same weight");
}

async function question5() {
  const answers = await inquirer.prompt({
    name: "question_5",
    type: "list",
    message:
      "There are two clocks of different colors: The green clock is broken and doesnt run at all,\n but the yellow clock loses one second every 24 hours. Which clock is more accurate? \n",
    choices: ["The green clock", "The yellow clock", "Neither", "Both"],
  });

  return handleAnswer(answers.question_5 === "The green clock");
}

function winner() {
  // console.clear();
  figlet(
    `Congrats , ${playerName} !\n You Win \n\n $ 1 , 0 0 0 , 0 0 0`,
    (err, data) => {
      console.log(gradient.pastel.multiline(data) + "\n");
      process.exit(0);
    }
  );
}

console.clear();
await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
winner();
