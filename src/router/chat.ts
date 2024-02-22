import express, { Router } from "express";

const router: Router = express.Router();
const chat = require('../controller/chat');

// 채팅방 만들기
router.post('/', chat.create_room);
// 채팅방 목록 조회
router.get('/room', chat.room_list);
// 채팅방 메세지 조회
router.get('/:roomId', chat.message);
// 채팅방 참여
router.post('/join', chat.join_room);
// 채팅 보내기
router.post('/send', chat.send_message);

export default router;