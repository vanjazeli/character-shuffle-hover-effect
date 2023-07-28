const textShuffle = {
	target: document.querySelectorAll('.js-target'),
	characters: '0123456789abcdefghijklmnopqrstuvwxyz+=-*&^%$#@!~<>________________________________________________________________--------------------------------',
	word: '',

	cycleInterval: 30,

	init: function () {
		this.settings();
	},

	settings: function () {
		const hoverTarget = (e) => {
			this.word = e.target.getAttribute('data-word');
			const targetElement = e.target;
			this.randomizeWordMultipleTimes(targetElement, 5, textShuffle.cycleInterval);
			setTimeout(() => this.revealCharacters(targetElement), 5 * textShuffle.cycleInterval);
		};

		const clickTarget = (e) => {
			e.preventDefault();
			setTimeout(() => {
				const link = e.target.getAttribute('href');
				window.location.href = link;
			}, 1000);
		};

		this.target.forEach((element) => {
			element.addEventListener('mouseenter', hoverTarget);
		});

		this.target.forEach((element) => {
			element.addEventListener('click', clickTarget);
		});
	},

	randomizeWord: function () {
		let randomizedWord = '';
		for (let i = 0; i < this.word.length; i++) {
			const randomIndex = Math.floor(Math.random() * this.characters.length);
			randomizedWord += this.characters[randomIndex];
		}
		return randomizedWord;
	},

	randomizeWordMultipleTimes: function (targetElement, times, interval) {
		let count = 0;
		const randomizeInterval = setInterval(() => {
			if (count >= times) {
				clearInterval(randomizeInterval);
			} else {
				targetElement.textContent = this.randomizeWord();
				count++;
			}
		}, interval);
	},

	revealCharacters: function (targetElement) {
		let revealedCharacters = 0;
		const revealInterval = setInterval(() => {
			const randomizedWord = this.randomizeWord();
			const currentWord = this.word.slice(0, revealedCharacters) + randomizedWord.slice(revealedCharacters);
			targetElement.textContent = currentWord;
			revealedCharacters++;

			if (revealedCharacters >= this.word.length) {
				clearInterval(revealInterval);
				targetElement.textContent = this.word;
			}
		}, this.cycleInterval);
	},
};

export default textShuffle;
