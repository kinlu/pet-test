const should = require('should');
const axios = require('axios');

const data = () => {
	const id = Math.floor(Math.random() * 10000) + 1  
	return {
		"id": id,
		    "category": {
		        "id": 0,
		        "name": "string"
		    },
		    "name": "doggie",
		    "photoUrls": [
		        "string"
		    ],
		    "tags": [
		        {
		            "id": 0,
		            "name": "string"
		        }
		    ],
		    "status": "available"
	};
}

const instance = axios.create({
	baseURL: 'https://petstore.swagger.io/v2/pet',
	headers: {'accept': 'application/json'}
});

describe('Swagger pet API test - get a pet',  () => {

	const testData = data();

	beforeEach(async () => {
		await instance({
			method: 'post',
			data: testData
		})
	});

	it('should get a pet',  async () => {
		await instance.get("/" + testData.id)
			.then(response => {
				response.status.should.equal(200)
				response.data.name.should.equal(testData.name);
				response.data.status.should.equal(testData.status);
			 })
	});
})

describe('Swagger pet API test - update a pet', () => {
	
	const testData = data();

	beforeEach(async () => {
		await instance({
			method: 'post',
			data: testData
		})
	});

	it('should update a pet name', async () => {
		testData.name = 'piggie';

		await instance({
			method: 'put',
			data: testData
		}).then(response => {
			response.status.should.equal(200)
			response.data.name.should.equal(testData.name)
		  })
	})
})

describe('Swagger pet API test - delete a pet', () => {
	
	const testData = data();

	beforeEach(async () => {
		await instance({
			method: 'post',
			data: testData
		})
	});

	it('should delete a pet', async () => {
		await instance.delete('/' + testData.id)
			.then(response => {
		    	response.status.should.equal(200)
		  	})
	});
})
