const { book, user } = require("../../models");

exports.getBooks = async (req, res) => {
  try {
    let data = await book.findAll({
      include: {
        model: user,
        as: "user",
        attributes: {
          exclude: ["createdAt", "updatedAt", "password"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "idUser"],
      },
    });
    // data = JSON.parse(JSON.stringify(data));

    // data = data.map((item) => {
    //   return {
    //     ...item,
    //     image: process.env.PATH_FILE + item.image,
    //   };
    // });

    data.map((item)=>{
      item.image = process.env.PATH_FILE + item.image
    })

    res.send({
      status: "success...",
      data,
    });
  } catch (error) {
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};


exports.getBook = async (req, res) => {
  try {
    const { id } = req.params;
    let data = await book.findOne({
      where: {
        id,
      },
      include: [
        {
          model: user,
          as: 'user',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'idUser'],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    data = {
      ...data,
      image: process.env.PATH_FILE + data.image,
    };

    res.send({
      status: 'success...',
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};


exports.addBook = async (req, res) => {
  try {
    const data = req.body;

    let newBook = await book.create({
      ...data,
      image: req.file.filename,
      idUser: req.user.id,
    });

    newBook = JSON.parse(JSON.stringify(newBook));

    newBook = {
      ...newBook,
      image: process.env.PATH_FILE + newBook.image,
    };

    res.send({
      status: "success",
      data: { newBook },
    });
  } catch (error) {
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    data.image = req.file.filename;

    await book.update(data, {
      where: {
        id,
      },
    });
    book.image = req.file.filename;

    res.send({
      status: "success",
      message: `Update book id: ${id} finished`,
      data: req.body,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.deleteBook = async (req, res) => {
  // code here
  try {
      const { id } = req.params

      await book.destroy({
          where: {id}
      })

      res.send({
          status: 'success',
          message: `Delete book id: ${id} finished`
      })
  } catch (error) {
      console.log(error)
      res.send({
          status: 'failed',
          message: 'Server Error'
      })
  }
}
