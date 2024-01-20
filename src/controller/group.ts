import { AppDataSoure } from "../models/dataSource";
import { Group } from "../models/group";

export const userRepository = AppDataSoure.getRepository(Group);

exports.group_post = async (req, res) => {
    const { title, categori, price, content, image, personnelAll, transactionDate, time} = req.body;

    const newGroupPost = new Group();
    newGroupPost.title = title;
    newGroupPost.categori = categori;
    newGroupPost.price = price;
    newGroupPost.content = content;
    newGroupPost.image = image;
    newGroupPost.personnelAll = personnelAll;
    newGroupPost.transactionDate = transactionDate;
    newGroupPost.time = time;

    const group = await userRepository.save(newGroupPost);
    return res.status(200).json(group);
};

exports.group_edit = async (req, res) => {
     const {id, title, categori, price, content, image, personnelAll, transactionDate, time} = req.body;

    if (!id) {
        return res.status(400).json({ message: 'id가 올바르지 않습니다.'});
    }

    const update = {
        title,
        categori,
        price,
        content,
        image,
        personnelAll,
        transactionDate,
        time
    };

    const group = await userRepository.update(id, update);
    return res.status(200).json(group);
};

exports.group_del = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'id가 올바르지 않습니다.'});
    }

    const group = await userRepository.delete(id);
    return res.status(200).json(group);
};