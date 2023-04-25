import React from 'react';

interface Props {
	text: string;
	level: number;
	hr?: boolean;
}

export default function Header({
	text, level, hr,
}: Props) {
	let headerEl;

	switch (level) {
		case 1:
			headerEl = <h1>{text}</h1>;
			break;
		case 2:
			headerEl = <h2>{text}</h2>;
			break;
		case 3:
			headerEl = <h3>{text}</h3>;
			break;
		case 4:
			headerEl = <h4>{text}</h4>;
			break;
		case 5:
			headerEl = <h5>{text}</h5>;
			break;
		case 6:
			headerEl = <h6>{text}</h6>;
			break;
		default:
			headerEl = <h3>{text}</h3>;
			break;
	}

	return (
		<div className="row">
			<header className="col">{headerEl}</header>
			{hr ?? ''}
		</div>
	);
}
