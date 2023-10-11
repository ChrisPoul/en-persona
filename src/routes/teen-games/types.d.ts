type TeenGame = 'DARE' | 'NHIE' | 'TRUTH' | 'WYR';
type TeenGameRating = 'pg' | 'pg13' | 'r';

interface TeenQuestion {
	type: TeenGame;
	rating: TeenGameRating;
	question: string;
	translations: TeenQuestionTranslations;
}
interface TeenQuestionTranslations {
	es: string | null;
}
