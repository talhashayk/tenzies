import React, { useEffect, useState } from "react";
import "./App.css";
import Die from "./components/Die.js";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
	let [tenzies, setTenzies] = useState(false);
	let [dice, setDice] = useState(allNewDice());

	useEffect(() => {
		const allHeld = dice.every((die) => die.isHeld);
		const firstValue = dice[0].value;
		const sameValues = dice.every((die) => die.value === firstValue);
		if (allHeld & sameValues) {
			setTenzies(true);
		}
	}, [dice]);

	function generateNewDie() {
		return {
			value: Math.ceil(Math.random() * 6),
			isHeld: false,
			id: nanoid(),
		};
	}

	function allNewDice() {
		const newDice = [];
		for (let i = 0; i < 10; i++) {
			newDice.push(generateNewDie());
		}
		return newDice;
	}

	const diceElements = dice.map((die) => (
		<Die
			k
			ey={die.id}
			value={die.value}
			isHeld={die.isHeld}
			holdDice={() => holdDice(die.id)}
		/>
	));

	function rollDice() {
		if (tenzies) {
			setTenzies(false);
			setDice(allNewDice());
		} else {
			setDice((prevDice) =>
				prevDice.map((die) => {
					return die.isHeld ? die : generateNewDie();
				})
			);
		}
	}

	function holdDice(id) {
		setDice((prevDice) =>
			prevDice.map((die) => {
				return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
			})
		);
	}

	return (
		<main>
			{tenzies && <Confetti />}
			<h1 className="title">Tenzies</h1>
			<p className="instructions">
				Roll until all dice are the same. Click each die to freeze it at
				its current value between rolls.
			</p>
			<div className="dice-container">{diceElements}</div>
			<button className="roll-dice-cta" onClick={rollDice}>
				{tenzies ? "New Game" : "Roll"}
			</button>
		</main>
	);
}
