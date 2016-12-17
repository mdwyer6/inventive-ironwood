var dwolla = require('dwolla-v2');

var client = new dwolla.Client({
  id: '812-116-6852',
  secret: '7mhdwpuiEMu0B0hOxLFq3MEeWECTHGJTQSfmFIqNTyx847hp44',
  environment: 'sandbox'
});

var accountToken = new client.Token({'access_token': 'mIlGHC6dMs4tpQITzKSKM1tn7DT0N7iHTy2rG3w8czWWmmTo2p'});

var createVerifiedCustomer = (firstName, lastName, email, ipAddress, address1, address2, city, state, zip, dob, ssn) => {
  if (address2) {
    var requestBody = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      ipAddress: ipAddress,
      type: 'personal',
      address1: address1,
      address2: address2,
      city: city,
      state: state,
      postalCode: zip,
      dateOfBirth: dob,
      ssn: ssn
    };
  } else {
    requestBody = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      ipAddress: ipAddress,
      type: 'personal',
      address1: address1,
      city: city,
      state: state,
      postalCode: zip,
      dateOfBirth: dob,
      ssn: ssn
    };
  }
  accountToken
  .post('customers', requestBody)
  .then(function(res) {
    console.log('Worked');
    res.headers.get('location');
  });

};

// createVerifiedCustomer('Nate', 'Graf', 'njgraf512@gmail.com', '10.10.10.10', '944 Market Street', null, 'San Francisco', 'CA', '94102', '1989-01-01', '1234');
var getUserId = (email) => {
  return accountToken
  .get('customers')
  .then((res) => {
    var customerList = res.body._embedded.customers;
    for (var i = 0; i < customerList.length; i++) {
      if (customerList[i].email === email) {
        return customerList[i].id;
      }
    }
  });
};

var createIavToken = (userId) => {
  var customerUrl = 'https://api-uat.dwolla.com/customers/' + userId;
  var token;
  return accountToken
    .post(`${customerUrl}/iav-token`)
    .then((res) => res.body.token );

};


// createIavToken('5e92f31d-a9df-47e9-b1cd-00649e2634fc');

var getUserFundingId = (userId) => {
  var accountUrl = 'https://api-uat.dwolla.com/customers/' + userId;
  return accountToken
  .get(`${accountUrl}/funding-sources`)
  .then((res) => res.body._embedded['funding-sources'][0].id);
};

// getUserFundingId('b9fc0d7c-de2c-4e90-9538-b7bd3642eebe').then(link => console.log(link));


var transferMoney = (sourceFundId, destFundId, amount) => {
  var requestBody = {
    _links: {
      source: {
        href: 'https://api-uat.dwolla.com/funding-sources/' + sourceFundId
      },
      destination: {
        href: 'https://api-uat.dwolla.com/funding-sources/' + destFundId
      }
    },
    amount: {
      currency: 'USD',
      value: amount
    }
  };
  return accountToken
  .post('transfers', requestBody)
  .then((res) => {
    res.headers.get('location');
    return res;
  });
};


// transferMoney('9ad47e31-e81d-47f6-9c41-a63488df667e', '0e0b9ff5-fb05-454e-a6c2-48f15a392ab5', '500');

module.exports = {
  transferMoney: transferMoney,
  createIavToken: createIavToken,
  getUserId: getUserId,
  createVerifiedCustomer: createVerifiedCustomer,
  getUserFundingId: getUserFundingId
};
  // <script type="text/javascript">
  // $('#start').click(function() {
  //   var iavToken = 'uzKcnebvwacKSwP2jfQ6WeL5Eg8j6gvumE1URdCg1fpalkwKnE';
  //   console.log(dwolla);
  //   dwolla.configure('uat');
  //   dwolla.iav.start(iavToken, {container: 'iavContainer', microDeposits: false, fallbackToMicroDeposits: true}, function(err, res) {
  //     console.log('Error: ' + JSON.stringify(err) + ' -- Response: ' + JSON.stringify(res));
  //   });
  // });
  // </script>
