import {openDatabase} from 'react-native-sqlite-storage';

const customerDB = openDatabase({name: 'CustomerDB.db'});

setTimeout(function () {
  customerDB.transaction(function (txn) {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='customers'",
      [],
      function (txn, res) {
        console.log('item:customerDB:::', res.rows.length);
        if (res.rows.length == 0) {
          txn.executeSql('DROP TABLE IF EXISTS customers', []);
          txn.executeSql(
            'CREATE TABLE IF NOT EXISTS customers(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20),email VARCHAR(20),phone VARCHAR(20), address VARCHAR(255))',
            [],
          );
        }
      },
    );
  });
}, 1000);

//promise or callback
export var getCustomers = () => {
  var sql = 'select * from customers';
  return new Promise(function (resolve, reject) {
    customerDB.transaction(function (txn) {
      txn.executeSql(
        sql,
        [],
        function (txn, res) {
          let records = [];
          for (let i = 0; i < res.rows.length; i++) {
            records.push(res.rows.item(i));
          }
          records.json = () => {
            res;
          };
          console.log('result:', res);
          resolve(records);
        },
        function (error) {
          console.log('error:', error);
        },
      );
    });
  });
};

export const addCustomer = customer => {
  var sql = `INSERT INTO customers (name, email, phone, address) VALUES ("${customer.name}", "${customer.email}", "${customer.phone}","${customer.address}")`;
  return new Promise(function (resolve, reject) {
    customerDB.transaction(function (txn) {
      txn.executeSql(
        sql,
        [],
        function (txn, res) {
          res.json = () => {
            res;
          };
          resolve(res);
        },
        function (error) {
          console.log('error:', error);
        },
      );
    });
  });
};

export const deleteCustomer = id => {
  var sql = `DELETE FROM customers WHERE id='${id}'`;
  return new Promise(function (resolve, reject) {
    customerDB.transaction(function (txn) {
      txn.executeSql(
        sql,
        [],
        function (txn, res) {
          res.json = () => {
            res;
          };
          resolve(res);
        },
        function (error) {
          console.log('error:', error);
        },
      );
    });
  });
};

export const updateCustomer = customer => {
  const sql = `UPDATE customers SET name='${customer.name}', email='${customer.email}', phone='${customer.phone}', address='${customer.address}' WHERE id='${customer.id}'`;
  console.log(sql);
  return new Promise(function (resolve, reject) {
    customerDB.transaction(function (txn) {
      txn.executeSql(
        sql,
        [],
        function (txn, res) {
          res.json = () => {
            res;
          };
          resolve(res);
        },
        function (error) {
          console.log('error:', error);
        },
      );
    });
  });
};

export const getCustomerById = id => {
  var sql = `SELECT * from customers WHERE id='${id}'`;
  return new Promise(function (resolve, reject) {
    customerDB.transaction(function (txn) {
      txn.executeSql(
        sql,
        [],
        function (txn, res) {
          let records = [];
          for (let i = 0; i < res.rows.length; i++) {
            records.push(res.rows.item(i));
          }
          records.json = () => {
            res;
          };
          console.log('result:', res);
          resolve(records);
        },
        function (error) {
          console.log('error:', error);
        },
      );
    });
  });
};