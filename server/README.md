# Delete data with ORM Sequelize

To perform delete specific record data from specific table with ORM Sequelize, we can use method `destroy()` from our model.

For a simple example:  
```javascript
const { user } = require('../../models')

try {
  await user.destroy({
    where: {
      condition
    }
  });
} catch(err) {
  console.log(err)
}
```  

References: [Delete data with Sequelize](https://sequelize.org/master/manual/model-querying-basics.html#simple-delete-queries)