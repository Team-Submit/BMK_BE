import { AppDataSoure } from "../models/dataSource";
import { Group } from '../models/group.entity';

export const groupRepository = AppDataSoure.getRepository(Group);

const group_post = async (req, res) => {
    const { title, categori, price, content, image, personnelAll, transactionDate, time, wish} = req.body;

    const newGroupPost = new Group();
    newGroupPost.title = title;
    newGroupPost.categori = categori;
    newGroupPost.price = price;
    newGroupPost.content = content;
    newGroupPost.image = image;
    newGroupPost.personnelAll = personnelAll;
    newGroupPost.transactionDate = transactionDate;
    newGroupPost.time = time;
    newGroupPost.wish = wish;

    const group = await groupRepository.save(newGroupPost);
    return res.status(200).json(group);
};

const group_edit = async (req, res) => {
     const {id, title, categori, price, content, image, personnelAll, transactionDate, time, wish} = req.body;

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
        wish,
        time
    };

    const group = await groupRepository.update(id, update);
    return res.status(200).json(group);
};

const group_del = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'id가 올바르지 않습니다.'});
    }

    const group = await groupRepository.delete(id);
    return res.status(200).json(group);
};

const group_details = async (req, res) => {
    const groupId = req.params.groupId;

    const group = await groupRepository.findOne(groupId);

    if (!group) {
        return res.status(404).json({ message: '글을 찾지 못했습니다.' });
    }

    res.json(group);
};

const group_list = async (req, res) => {
    try {
        const groupList = await groupRepository.find();
        res.json(groupList);
    } catch (error) {
        console.error('Error while fetching used list:', error);
        res.status(500).json({ message: '서버에서 목록을 가져오는 중에 오류가 발생했습니다.' });
    }
}

const group_search = async (req, res) => {
    const title = req.query;

    if (!title) {
        return res.status(400).json({ message: '제목을 입력해주세요.' });
    }

    try {
        const searchResult = await groupRepository.find({ where: { title: title } });

        if (searchResult.length === 0) {
            return res.status(404).json({ message: '일치하는 게시물을 찾을 수 없습니다.' });
        }

        res.json(searchResult);
    } catch (error) {
        console.error('Error while searching by title:', error);
        res.status(500).json({ message: '검색 중 오류가 발생했습니다.' });
    }
};

module.exports = { group_post, group_edit, group_del, group_details, group_list, group_search };