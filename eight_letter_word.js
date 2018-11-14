let fs = require('fs');

fs.readFile('./Documents/words.txt', 'utf8', function (error, data) {
	
	if (error) {
		console.log('error:', error); // Print the error if one occurred 
		return; 
	}
	
	DICTIONARY = data.split("\n").map((word) => {
		return word.toLowerCase();
	});

	var startingWords = DICTIONARY.filter((word) => {
		return word.length === 8;
	});

	function deepSearch(word) {

		if (word.length === 1) {
			return ".";
		} else {
			var subwords = allSubWords(word).filter((subword) => {
				return isAWord(subword);
			});

			if (subwords.length === 0) {
				return {};
			} else {
				return subwords.reduce((obj, subword) => {
					var searchResult = deepSearch(subword);
					if (!isEmpty(searchResult)) {
						obj[subword] = searchResult;
					}
					return obj;
				}, {});
			}
		}
	}


	startingWords.forEach((word) => {
		var rez = deepSearch(word);
		if (!isEmpty(rez)) {
			console.log(word, JSON.stringify(rez));	
		}
	});

});

function isEmpty(obj) {
	if (typeof obj === 'object') {
		return Object.keys(obj).length === 0;
	} else {
		return false;
	}
	
}

function isAWord(test) {
	return DICTIONARY.some((word) => {
		return word === test;
	});
}

function allSubWords(word) {
	let subwords = [];
	for(let i = 0; i < word.length; i++) {
		subwords.push(word.slice(0, i) + word.slice(i + 1));
	}
	// console.log(subwords);
	return subwords;
}







