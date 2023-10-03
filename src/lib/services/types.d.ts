type TeenGame = 'DARE' | 'NHIE' | 'TRUTH' | 'WYR';

interface TeenQuestion {
	type: TeenGame;
	rating: 'pg' | 'pg13' | 'r';
	question: string;
	translations: TeenQuestionTranslations;
}
interface TeenQuestionTranslations {
	es: string;
}
