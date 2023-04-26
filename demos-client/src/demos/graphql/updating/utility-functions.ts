import type { Maybe, Person } from '../../../generated/graphql';

export function renderPeople(people: Person[], separator: string = ',') {
	// Cases where it shouldn't render
	if (!people || !Array.isArray(people) || people.length === 0) return '';

	return people.map((p) => `${p.firstName} ${p.lastName}`)
		.join(separator);
}

export function stringToPeople(value: string, separator: string | RegExp = ', ') {
	let people: Array<Partial<Person>> = [];
	if (!value) return people;

	let names: string[] = value.split(separator);
	for (let name of names) {
		let [firstName, lastName] = name.split(/\s+/);
		people.push({
			firstName,
			lastName,
		});
	}
}

export function getPeople(people?: Maybe<Person[]>) {
	if (!people) return undefined;
	return renderPeople(people);
}
