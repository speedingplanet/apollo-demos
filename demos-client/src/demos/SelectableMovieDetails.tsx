import { type Movie } from '../data/all-data-typed';
import { type MovieDetailsProps } from './ObjectAsProps';

type MovieKeys = Array<keyof Movie>;

export default function SelectableMovieDetailsWrapper() {
	let raiders: Movie = {
		id: 1,
		title: 'Raiders of the Lost Ark',
		year: 1981,
		directors: ['Stephen Spielberg'],
		writers: [
			'Lawrence Kasdan',
			'George Lucas',
			'Philip Kaufman',
		],
		rating: 5,
		genres: [
			'action',
			'adventure',
			'supernatural',
		],
	};

	let fieldsToDisplay: MovieKeys = [
		'title',
		'year',
		'directors',
	];

	return (
		<SelectableMovieDetails
			movie={raiders}
			showFields={fieldsToDisplay}
		/>
	);
}

interface SelectableMovieDetailsProps extends MovieDetailsProps {
	showFields: MovieKeys;
}

// export function SelectableMovieDetails(props: MovieDetailsProps & { showFields: MovieKeys }) {
export function SelectableMovieDetails(props: SelectableMovieDetailsProps) {
	return (
		<ul>
			{props.showFields.map((field, index) => (
				<li key={index}>
					{field}: {props.movie[field]}
				</li>
			))}
		</ul>
	);
}
