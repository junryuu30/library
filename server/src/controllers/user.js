const { user, book, rent } = require('../../models')

exports.addUsers = async (req, res) => {
    try {
        const data = req.body
        await user.create(data)

        res.send({
            status: 'success',
            message: 'Add user finished'
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.getUsers = async (req, res) => {
    try {

        const users = await user.findAll({
            include: [
      
              {
                model: book,
                as: "books",
                attributes: {
                  exclude: ["createdAt", "updatedAt", "idUser"],
                },
              },
            //   {
            //     model: rent,
            //     as: "rents",
            //     attributes: {
            //       exclude: ["createdAt", "updatedAt", "idUser", "idBook"],
            //     },
            //   },
      
            ],
            attributes: {
              exclude: ["password", "createdAt", "updatedAt"],
            },
          });
      
          res.send({
            status: "success",
            data: {
              users,
            },
          });
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.getUser = async (req, res) => {
    try {
        const { id } = req.params

        const data = await user.findAll({
            where: {
                id
            },
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt']
            }
        })

        res.send({
            status: 'success',
            data: {
                user: data
            }
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params

        await user.update(req.body, {
            where: {
                id
            }
        })

        res.send({
            status: 'success',
            message: `Update user id: ${id} finished`,
            data: req.body
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.deleteUser = async (req, res) => {
    // code here
    try {
        const { id } = req.params

        await user.destroy({
            where: {id}
        })

        res.send({
            status: 'success',
            message: `Delete user id: ${id} finished`
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.getUserBooks = async (req, res) => {
    try {
      const data = await user.findAll({
        include: {
          model: book,
          as: "books",
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
  
      res.send({
        status: "success",
        data,
      });
    } catch (error) {
      res.send({
        status: "failed",
        message: "Server Error",
      });
    }
  };