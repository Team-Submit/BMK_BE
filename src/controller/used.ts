import { AppDataSoure } from "../models/dataSource";
import Used from "../models/usedEntity";

export const usedRepository = AppDataSoure.getRepository(Used);


const used_post = async (req, res) => {
    try {
        const { title, category, price, content, image, place, writer } = req.body;

        const newUsedPost = new Used();
        newUsedPost.title = title;
        newUsedPost.category = category;
        newUsedPost.price = price;
        newUsedPost.content = content;
        newUsedPost.image = image;
        newUsedPost.place = place;
        newUsedPost.writer = writer;

        const used = await usedRepository.save(newUsedPost);
        return res.status(200).json(used);
    } catch (error) {
        console.error('Error while creating used list:', error);
        res.status(500).json({ message: '서버에서 글을 생성하는 중에 오류가 발생했습니다.' });
    }
};

const used_edit = async (req, res) => {
    try {
        const { title, category, price, content, image, place, writer } = req.body;
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({ message: 'id가 올바르지 않습니다.'});
        }

        const update = {
            title,
            category,
            price,
            content,
            image,
            place,
            writer
        };

        const used = await usedRepository.update(id, update);
        return res.status(200).json(used);
    } catch (error) {
        console.error('Error while editing used list:', error);
        res.status(500).json({ message: '서버에서 글을 수정하는 중에 오류가 발생했습니다.' });
    }
};

const used_del = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({ message: 'id가 올바르지 않습니다.' });
        }

        const used = await usedRepository.delete(id);
        return res.status(200).json(used);
    } catch (error) {
        console.error('Error while deleting used list:', error);
        res.status(500).json({ message: '서버에서 글을 삭제하는 중에 오류가 발생했습니다.' });
    }
};

const used_details = async (req, res) => {
    try {
        const usedId = req.params.usedId;

        const used = await usedRepository.findOne({where: {used_id: usedId}});

        if (!used) {
            return res.status(404).json({ message: '글을 찾지 못했습니다.' });
        }

        res.json(used);
    } catch (error) {
        console.error('Error while bring used list:', error);
        res.status(500).json({ message: '서버에서 글을 가져오는 중에 오류가 발생했습니다.' });
    }
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
    try {
        const { title } = req.query;

        if (!title) {
            return res.status(400).json({ message: '제목을 입력해주세요.' });
        }

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
        const usedItemId = req.params.usedId;
        const usedItem = await usedRepository.findOne({ where: { used_id: usedItemId } });
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

const used_picks = async (req, res) => {
    try {
        const usedItemId = req.params.usedId;
        const usedItem = await usedRepository.findOne({ where: { used_id: usedItemId } });
        if (!usedItem) {
            return res.status(404).json({ message: 'Used item not found.' });
        }

        usedItem.wish = true;
        await usedRepository.save(usedItem);

        res.status(200).json({ message: 'wish column updated successfully.' });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

export { used_post, used_edit, used_del, used_details, used_list, used_search, used_end, used_picks };