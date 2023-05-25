const customerApiEndpoint = 'http://localhost:3000/api/customer';
//const customerApiEndpoint = 'https://nodeapi.pyther.com/customer';

let customerData = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'First Item',
    email: 'vivek@pyther.com',
    address: 'India',
    phone: '9724232340',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    name: 'Vivek',
    email: 'vivek@pyther.com',
    address: 'India',
    phone: '9724232340',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: 'Rama',
    email: 'vivek@pyther.com',
    address: 'India',
    phone: '9724232340',
  },
];

function setCustomerData(data) {
  customerData = data;
}

export const getCustomers = () => {
  return fetch(customerApiEndpoint)
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
      console.error(error);
    });
};

export const addCustomer = async customer => {
  return fetch(customerApiEndpoint, {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customer),
  })
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

export const updateCustomer = async customer => {
  return fetch(customerApiEndpoint, {
    method: 'PUT', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customer),
  })
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

export const deleteCustomer = async ({id}) => {
  return fetch(customerApiEndpoint, {
    method: 'DELETE', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({id}),
  })
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

export const copyCustomer = id => {
  const [record] = customerData.filter(item => item.id == id);
  setCustomerData([...customerData, {...record, id: Math.random()}]);
};
