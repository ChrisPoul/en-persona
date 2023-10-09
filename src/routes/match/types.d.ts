interface Player {
	name: string;
	score: number;
}

interface Match {
	id?: string;
	gameTitle: string;
	comments: string;
	started: string;
	ended: string;
}

interface Round {
	players: Player[];
	winner: Player | null;
}
