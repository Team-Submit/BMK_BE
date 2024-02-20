import { AppDataSoure } from "../models/dataSource";
import { Used } from "../models/used";

export const usedRepository = AppDataSoure.getRepository(Used);


const used_post = async (req, res) => {
    const { title, categori, price, content, image, place, success, writer, wish } = req.body;

    const newUsedPost = new Used();
    newUsedPost.title = title;
    newUsedPost.categori = categori;
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
    const { id, title, categori, price, content, image, place, success, writer, wish } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'id가 올바르지 않습니다.'});
    }

    const update = {
        title,
        categori,
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
};

const used_search = async (req, res) => {
    const title = req.query;

    if (!title) {
        return res.status(400).json({ message: '제목을 입력해주세요.' });
    }

    try {
        const searchResult = await usedRepository.find({ where: { title: title } });

        if (searchResult.length === 0) {
            return res.status(404).json({ message: '일치하는 게시물을 찾을 수 없습니다.' });
        }

        res.json(searchResult);
    } catch (error) {
        console.error('Error while searching by title:', error);
        res.status(500).json({ message: '검색 중 오류가 발생했습니다.' });
    }
};

const used_end = async (req, res) => {
    try {
        const usedItem = await usedRepository.findOne(req.used_id);
        if (!usedItem) {
            return res.status(404).json({ message: 'Used item not found.' });
        }

        usedItem.success = false;
        await usedRepository.save(usedItem);

        res.status(200).json({ message: 'Success column updated successfully.' });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

module.exports = { used_post, used_edit, used_del, used_details, used_list, used_search, used_end };