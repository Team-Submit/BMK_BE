import { AppDataSoure } from "../models/dataSource";
import { Used } from "../models/used";

export const usedRepository = AppDataSoure.getRepository(Used);


const used_post = async (req, res) => {
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

    const used = await usedRepository.save(newUsedPost);
    return res.status(200).json(used);
};

const used_edit = async (req, res) => {
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

    const used = await usedRepository.update(id, update);
    return res.status(200).json(used);
};

const used_del = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'id가 올바르지 않습니다.' });
    }

    const used = await usedRepository.delete(id);
    return res.status(200).json(used);
};

const used_details = async (req, res) => {
    const usedId = req.params.usedId;

    const used = await usedRepository.findOne(usedId);

    if (!used) {
        return res.status(404).json({ message: '글을 찾지 못했습니다.' });
    }

    res.json(used);
};

const used_list = async (req, res) => {
    try {
        const usedList = await usedRepository.find();
        res.json(usedList);
    } catch (error) {
        console.error('Error while fetching used list:', error);
        res.status(500).json({ message: '서버에서 목록을 가져오는 중에 오류가 발생했습니다.' });
    }
}

module.exports = { used_post, used_edit, used_del, used_details, used_list };