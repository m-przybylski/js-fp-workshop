import { shoppingData } from '../data/shopping';

describe('Immutable ES6 operations', () => {

	const john = {
		firstname: "John",
		lastname: "Lennon"
	}

	const paul = {
		firstname: "Paul",
		lastname: "McCartney"
	}

	const musician = {
		profession: "musician",
		salary: 5000
	}

	it('merge two objects', () => {
		const merge2objects = (obj1, obj2) => ({ ...obj1, ...obj2 });

		expect(merge2objects(john, musician)).toEqual({
			firstname: "John", lastname: "Lennon", profession: "musician", salary: 5000
		})

		expect(merge2objects(paul, musician)).toEqual({
			firstname: "Paul", lastname: "McCartney", profession: "musician", salary: 5000
		})
	})

	it('merging multiple objects', () => {
		const mergeManyObjects = (...objects) =>
			objects.reduce((acc, obj) => ({ ...acc, ...obj }), {});

		expect(mergeManyObjects({ id: 8492745921 }, john, musician)).toEqual({
			id: 8492745921, firstname: "John", lastname: "Lennon", profession: "musician", salary: 5000
		})

		expect(mergeManyObjects({ id: 5193421984 }, paul, musician)).toEqual({
			id: 5193421984, firstname: "Paul", lastname: "McCartney", profession: "musician", salary: 5000
		})
	})

	it('strip static attribute from objects', () => {
		let stripId = ({ id, ...rest }) => ({ ...rest });

		expect(stripId({
			id: 8492745921, firstname: "John", lastname: "Lennon"
		})).toEqual({
			firstname: "John", lastname: "Lennon"
		})

		expect(stripId(shoppingData[0])).toEqual({
			type: 'Clothes', name: 'Socks', price: 1.00, qty: 5
		})
	})

	it('strip dynamic attribute from objects', () => {
		let stripKey = (key, obj) => {
			let rest;
			({ [key]: obj[key], ...rest } = obj);
			return rest;
		}

		expect(stripKey('firstname', {
			id: 8492745921, firstname: "John", lastname: "Lennon"
		})).toEqual({
			id: 8492745921, lastname: "Lennon"
		})

		expect(stripKey('qty',
			stripKey('price', shoppingData[0]))).toEqual({
				type: 'Clothes', name: 'Socks', id: 421801449988
			})
	})
})
