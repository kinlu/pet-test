const should = require('should');
const rp = require('request-promise');

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

describe('Swagger pet API test - performance test',  () => {

	it('performane test a pet',  async () => {
		const requestArray = [];
		const requestAmount = 20;
		let allElapedTime = 0;

		for(i=0; i<requestAmount; i++){
			requestArray.push(rp({
			method: 'POST',
		    uri: 'https://petstore.swagger.io/v2/pet/',
		    headers: {
		        'accept': 'application/json'
		    },
		    body: data(),
		    time: true,
		    json: true,
		    resolveWithFullResponse: true,
			}))
		}

		await Promise.all(requestArray).then(response => {
			response.forEach(item => {
				item.statusCode.should.equal(200, "Status code should be 200");
				allElapedTime += item.elapsedTime;
			});
			const averageResponseTime = allElapedTime/requestAmount;
			averageResponseTime.should.be.below(300, "Response time should be less than 300ms");
		})

	});
})
