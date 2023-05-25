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

export const getCustomers = () => customerData;

export const addCustomer = newRecord => {
  setCustomerData([...customerData, {...newRecord, id: Math.random()}]);
};

export const deleteCustomer = id => {
  const newCustomers = customerData.filter(item => item.id != id);
  setCustomerData(newCustomers);
};

export const copyCustomer = id => {
  const [record] = customerData.filter(item => item.id == id);
  setCustomerData([...customerData, {...record, id: Math.random()}]);
};

export const updateCustomer = updatedRecord => {
  const temp = customerData.map(item => {
    if (item.id == updatedRecord.id) {
      return updatedRecord;
    }
    return item;
  });
  setCustomerData([...temp]);
};
