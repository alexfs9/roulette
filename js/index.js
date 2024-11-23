import { options } from './options.js';
import { getCurrentRotation, getPositionForProbability, probabilityToGrades } from './utilities.js';

const roulette = document.getElementById('roulette');
const root = document.documentElement;
let optionsContainer;
const winnerText = document.getElementById('winner-text');
let winner = '';
let loadingAnimation;
let sorting = false;
const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A6",
    "#FF8633",
    "#33FFF0",
    "#8D33FF",
    "#FFF233"
];

function sort() {
    sorting = true;
    loadingAnimation = setInterval(() => {
        switch(winnerText.textContent){
			case ".":
				winnerText.textContent = "..";
				break;
			case "..":
				winnerText.textContent = "...";
				break;
			default:
				winnerText.textContent = ".";
				break;
		}
    }, 500);

    const drawWinner = Math.random();
    const rouletteSpin = (1 - drawWinner) * 360 + 360 * 10; 
    root.style.setProperty('--rouletteSpin', rouletteSpin + 'deg');
    roulette.classList.toggle('spin', true);
    let totalProbability = 0;
    options.forEach((option) => {
        if (drawWinner * 100 > totalProbability && drawWinner * 100 <= totalProbability + option.probability) {
            winner = option.name;
        }
        totalProbability += option.probability;
    });
}

roulette.addEventListener('animationend', () => {
    roulette.style.transform = 'rotate(' + getCurrentRotation(roulette) + 'deg)';
    roulette.classList.toggle('spin', false);
    sorting = false;
    winnerText.textContent = winner;
    clearInterval(loadingAnimation);
});

document.getElementById('sort').addEventListener('click', () => {
    if (!sorting) sort();
});

function loadRoulette() {
    if (optionsContainer) roulette.removeChild(optionsContainer);
    optionsContainer = document.createElement('div');
    optionsContainer.id = 'options-container';
    roulette.appendChild(optionsContainer);
    let totalProbability = 0;

    options.forEach((option, i) => {
        let optionElement = document.createElement('div');
        optionElement.classList.toggle('option', true);
        optionElement.style = `
            --color: ${colors[i % colors.length]};
            --deg: ${probabilityToGrades(totalProbability)}deg;
            ${getPositionForProbability(option.probability)}`;
        optionsContainer.appendChild(optionElement);

        const elementName = document.createElement('p');
        elementName.textContent = option.name;
        elementName.classList.add('name');
        elementName.style = `width : calc(${option.probability} * var(--scale) * 1.5 / 80);
			transform: rotate(${probabilityToGrades(option.probability) / 2 + probabilityToGrades(totalProbability)}deg)`;
        optionsContainer.appendChild(elementName);

        const elementSeparator = document.createElement('div');
        elementSeparator.style = `transform: rotate(${probabilityToGrades(totalProbability)}deg)`;
        elementSeparator.classList.add('separator');
        optionsContainer.appendChild(elementSeparator);

        totalProbability += option.probability;

        roulette.style.transform = 'rotate(0deg)';
        winnerText.textContent = '¡Comienza a girar!';
    });
}

loadRoulette();