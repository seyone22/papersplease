//authenticate handler receives HTTP requests sent to the authenticate route(/api/users/authenticate)

import {apiHandler, usersRepo} from 'app/api';

export default apiHandler({
    post: authenticate
});

async function authenticate(req, res) {
    const user = await usersRepo.authenticate(req.body);
    return res.status(200).json(user);
}