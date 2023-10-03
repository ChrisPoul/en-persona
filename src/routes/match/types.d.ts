interface Player {
	name: string;
	score: number;
}

interface Match {
	id?: string;
	gameTitle: string;
	players: Player[];
	comments: string;
	created: string;
}
