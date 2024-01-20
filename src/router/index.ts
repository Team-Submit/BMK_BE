
const router = express.Router();
const Used = require('controller/used');
const Group = require('controller/used');

router.post('/used/post', Used.used_post);
router.patch('/used/boards', Used.used_edit);
router.delete('/used/boards', Used.used_del);

router.post('/group/boards', Group.used_post);
router.patch('/group/boards', Group.used_edit);
router.delete('/group/boards', Group.used_del);

module.exports = router;



