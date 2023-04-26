import { useQuery } from '@apollo/client';
import { type Movie } from '../../../generated/graphql';
import { GET_MOVIE_TITLES } from '../graphql-queries';

type TitleAndId = Pick<Movie, 'title' | 'id'>;
interface PickMovieByTitleProps {
	pickMovie: (id: number) => void;
}
export function PickMovieByTitle({ pickMovie }: PickMovieByTitleProps) {
	const { loading, data } = useQuery<{ movies: TitleAndId[] }>(GET_MOVIE_TITLES);

	return (
		<>
			<label
				htmlFor="movie-titles"
				className="form-label"
			>
				Select a movie
			</label>
			<select
				onChange={(event) => pickMovie(Number(event.currentTarget.value))}
				name="movie-titles"
				id="movie-titles"
				className="form-select"
				disabled={loading}
			>
				<option value="">{loading ? 'Loading....' : 'Pick a movie'}</option>
				{data?.movies.map(({ title, id }) => (
					<option
						value={id}
						key={id}
					>
						{title}
					</option>
				))}
			</select>
		</>
	);
}
