const {user, rent, book} = require("../../models")

exports.getRents = async (req, res) => {
    try {
        const idUser = req.user.id;
        let data = await rent.findAll({
            where: {
                idUser,
            },
            attributes: {
                exlude: ["updatedAt", "idUser", "idBook"],
            },
            include: [
                {
                    model: book,
                    as: "book",
                    attributes:{
                        exclude: [
                            "updatedAt",
                            "idUser",
                            "desc",
                        ],
                    }
                },
                {
                    model: user,
                    as: "user",
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "password", "status"]
                    },
                },
            ],
            attributes: {
                exclude: ["idBook", "idbook","idUser", "iduser", "updatedAt"],
              },
        });

        data = JSON.parse(JSON.stringify(data));

        data = data.map((item) => {
            return {
              ...item,
              book: {
                ...item.book,
                image: process.env.PATH_FILE + item.book.image,
              },
            };
          });

        res.send({
            status:"success",
            data,
        });
        
    } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message:"Server Error",
        });
    }
};

exports.addRent = async (req, res) => {
    try {
        let data = req.body;

        data = {
            ...data,
            idUser: req.user.id,
        };

        await rent.create(data);

        res.send({
            status:"success",
            message: "Add rent finished",
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message:"Server Error",
        })
        
    }
}