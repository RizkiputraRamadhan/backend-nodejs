import Animal from "../models/AnimalModel.js";
import User from "../models/UserModel.js";
import path from "path";
import fs from "fs";
// Get all animals with status 'publish'
export const getAnimal = async (req, res) => {
    try {
        const response = await Animal.findAll({
            where: {
                status_adoption: 'publish',
            },
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Terjadi kesalahan server" });
    }
};
// Get all animals with status 'proses'
export const getAnimalProses = async (req, res) => {
    try {
        const response = await Animal.findAll({
            where: {
                status_adoption: 'proses',
            },
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Terjadi kesalahan server" });
    }
};


// Get all animals with status 'approved'
export const getAnimalApprove = async (req, res) => {
    try {
        const response = await Animal.findAll({
            where: {
                status_adoption: 'approve',
            },
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Terjadi kesalahan server" });
    }
};

// create animal news
export const createAnimal = async (req, res) => {
    if(req.files === null) return res.status(400).json({msg: "No Files Uploaded"});
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name)
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg', '.webp'];
    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "File Tidak didukung"});
    if(fileSize > 5000000) return res.status(422).json({msg: "image terlalu besar maxsimal 5 MB"});

    file.mv(`./public/images/${fileName}`, async(err)=> {
        if(err) return res.status(500).json({msg: err.message});
    });
    
    try {
        await Animal.create({
                image: fileName,
                url: url,
                name: req.body.name,
                breed: req.body.breed,
                sex: req.body.sex,
                age: req.body.age,
                color: req.body.color,
                description: req.body.description,
                status_adoption: req.body.status_adoption,
                pengadopsi: req.body.pengadopsi,
                mails: req.body.mails,
        });
        res.status(201).json({ msg: "Animal Created" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



// Show animal by ID
export const getAnimalById = async (req, res) => {
    try {
        const animalId = req.params.id;
        const animal = await Animal.findByPk(animalId);
        if (!animal) {
            return res.status(404).json({ msg: "Data tidak ditemukan." });
        }

        if (animal.status === 'proses') {
            return res.status(400).json({ msg: 'Animal adoption is already in process. Cannot adopt again.' });
        }

        res.status(200).json(animal);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Terjadi kesalahan server" });
    }
};


//update animal
export const updateAnimal = async(req, res) =>{
   const animal = await Animal.findOne({
        where:{
            id: req.params.id
        }
    });
    if(!animal) return res.status(404).json({msg: "data not found"});
    let fileName = "";
    if(req.files === null) {
        
    } else {
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name)
        fileName = file.md5 + ext;
        const allowedType = ['.png', '.jpg', '.jpeg', '.webp'];
            if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "File Tidak didukung"});
            if(fileSize > 5000000) return res.status(422).json({msg: "image terlalu besar maxsimal 5 MB"});

            const filePath = `./public/images/${Animal.image}`;
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        

            file.mv(`./public/images/${fileName}`, async(err)=> {
                if(err) return res.status(500).json({msg: err.message});
            });
        }
     const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

        try {
            await Animal.update({
                    image: fileName,
                    url: url,
                    name: req.body.name,
                    breed: req.body.breed,
                    sex: req.body.sex,
                    age: req.body.age,
                    color: req.body.color,
                    description: req.body.description,
                    status_adoption: req.body.status_adoption,
                    pengadopsi: req.body.pengadopsi,
                    mails: req.body.mails,
            }, {
                where:{
                    id: req.params.id
                }
            });
            res.status(200).json({msg: "Animal Updated"});
        } catch (error) {
            console.log(error.message);
        }
    }

// update status publish
export const handleStatusPublish = async (req, res) => {
    try {
        const animalId = req.params.id;
        const animal = await Animal.findOne({
            where: {
                id: animalId
            }
        });

        if (!animal) {
            return res.status(404).json({ error: 'Hewan tidak ditemukan' });
        }

        await Animal.update(
            {
                 status_adoption: 'publish',
                 pengadopsi: '',
                 mails: '' 
             },{
                where: {
                    id: animalId
                }
            }
        );

        res.status(200).json({
            msg: "Animal Berhasil dipublish", 
            status: 200
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Terjadi kesalahan server' });
    }
};


//update status proses
export const handleStatusProses = async (req, res) => {
    try {
        const animalId = req.params.id;
        const userEmail = req.body.userEmail;

        const user = await User.findOne({
            where: {
                email: userEmail
            }
        });
        const animal = await Animal.findOne({
            where: {
                id: animalId
            }
        });

        if (!animal || !user) {
            return res.status(404).json({ msg: 'Data tidak ditemukan' });
        }

        await Animal.update(
            { 
                status_adoption: 'proses',
                pengadopsi:  user.name ,
                mails:  user.email
             },
            {
                where: {
                    id: animalId
                }
            }
        );

        res.status(200).json({msg: "Animal Sedang Diproses"});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Terjadi kesalahan server' });
    }
};

//update status approve
export const handleStatusApprove = async (req, res) => {
    try {
        const animalId = req.params.id;
        const animal = await Animal.findOne({
            where: {
                id: animalId
            }
        });

        if (!animal) {
            return res.status(404).json({ error: 'Hewan tidak ditemukan' });
        }

        await Animal.update(
            { status_adoption: 'approve' },
            {
                where: {
                    id: animalId
                }
            }
        );

        res.status(200).json({msg: "Animal Disetujui diadopsi"});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: 'Terjadi kesalahan server' });
    }
};


// Delete animal
export const deleteAnimal = async (req, res) => {
    try {
        const animalId = req.params.id;
        const existingAnimal = await Animal.findByPk(animalId);

        if (!existingAnimal) {
            return res.status(404).json({ msg: "Data tidak ditemukan. Tidak ada yang dihapus." });
        }
        const filePath = `./public/images/${existingAnimal.image}`;
        fs.unlinkSync(filePath)
        await Animal.destroy({
            where: {
                id: animalId
            }
        });
        res.status(200).json({ msg: "Animal successfully deleted" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Terjadi kesalahan server" });
    }
};
