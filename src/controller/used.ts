import { AppDataSoure } from "../models/dataSource";
import { Used } from "../models/used";

export const userRepository = AppDataSoure.getRepository(Used);


exports.used_post = async (req, res) => {
    const { title, categori, floor, price, content, image, place, success, writer, wish } = req.body;

    const newUsedPost = new Used();
    newUsedPost.title = title;
    newUsedPost.categori = categori;
    newUsedPost.floor = floor;
    newUsedPost.price = price;
    newUsedPost.content = content;
    newUsedPost.image = image;
    newUsedPost.place = place;
    newUsedPost.success = success;
    newUsedPost.writer = writer;
    newUsedPost.wish = wish;

    const used = await userRepository.save(newUsedPost);
    return res.status(200).json(used);
};

exports.used_edit = async (req, res) => {
    const { id, title, categori, floor, price, content, image, place, success, writer, wish } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'id가 올바르지 않습니다.'});
    }

    const update = {
        title,
        categori,
        floor,
        price,
        content,
        image,
        place,
        success,
        writer,
        wish
    };

    const used = await userRepository.update(id, update);
    return res.status(200).json(used);
};

exports.used_del = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'id가 올바르지 않습니다.'});
    }

    const used = await userRepository.delete(id);
    return res.status(200).json(used);
};
