import { AppDataSoure } from "../models/dataSource";
import ChatRooms from "../models/chatRoom.entity";
import ChatMessages from "../models/chatMessages.entity";
import User from "../models/user.entity";

export const chatRoomRepository = AppDataSoure.getRepository(ChatRooms);
export const chatMessagesRepository = AppDataSoure.getRepository(ChatMessages);
export const userRepository = AppDataSoure.getRepository(User);

// 채팅방 만들기
const create_room = async (req, res) => {
    try {

        // const user = await Used.findOne({ where: { /* 사용자를 식별할 수 있는 조건 */ } });
        // if (!user) {
        //     return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
        // }
        // const name = user.username + '님의 채팅방';

        const { name } = req.body;

        const newRoom = await chatRoomRepository.create({ roomName: name });

        await chatRoomRepository.save(newRoom);

        return res.status(201).json({ message: '채팅방이 성공적으로 생성되었습니다.', room: newRoom });
    } catch (error) {
        console.error('채팅방 생성 중 오류 발생:', error);
        return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
    }
};

// 채팅방 목록 조회
const room_list = async (req, res) => {
    try {
        const rooms = await chatRoomRepository.find();

        return res.status(200).json({ rooms });
    } catch (error) {
        console.error('채팅방 목록 조회 중 오류 발생:', error);
        return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
    }
};

// 채팅방 메세지 조회
const message = async (req, res) => {
    try {
        const { roomId } = req.params;

        const messages = await chatMessagesRepository.find({ where: { roomId } });

        return res.status(200).json({ messages });
    } catch (error) {
        console.error('채팅방 메시지 조회 중 오류 발생:', error);
        return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
    }
};

// 채팅방 참여
const join_room = async (req, res) => {
    try {
        const { studentId, roomId } = req.body;

        const user = await userRepository.findOne({where: { studentId }});
        if (!user) {
            return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
        }

        const room = await chatRoomRepository.findOne({where: {roomId}});
        if (!room) {
            return res.status(404).json({ error: '채팅방을 찾을 수 없습니다.' });
        }

        if (!Array.isArray(room.participants)) {
            room.participants = [];
        }

        room.participants.push(user);

        await chatRoomRepository.save(room);


        return res.status(200).json({ message: '채팅방에 성공적으로 참여되었습니다.' });
    } catch (error) {
        console.error('채팅방 참여 중 오류 발생:', error);
        return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
    }
};

// 채팅 보내기
const send_message = async (req, res) => {
    try {
        const { roomId, senderId, message } = req.body;

        const room = await chatRoomRepository.findOne({ where: {roomId} });
        if (!room) {
            return res.status(404).json({ error: '채팅방을 찾을 수 없습니다.' });
        }

        const sender = await userRepository.findOne({ where: {studentId: senderId} });
        if (!sender) {
            return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
        }

        const sendTime = new Date();

        const newMessage = chatMessagesRepository.create({
            roomId,
            senderId,
            content: message,
            sendTime: sendTime.toISOString()
        });

        await chatMessagesRepository.save(newMessage);

        return res.status(200).json({ message: '메시지를 성공적으로 전송했습니다.' });
    } catch (error) {
        console.error('메시지 전송 중 오류 발생:', error);
        return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
    }
};

module.exports = { create_room, room_list, message, join_room, send_message };