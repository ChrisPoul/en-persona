interface Player {
	name: string;
	score: number;
}

interface Match {
	id?: string;
	gameTitle: string;
	rounds: Round[];
	comments: string;
	created: string;
}

interface Round {
	players: Player[];
	winner: Player | null 
}
