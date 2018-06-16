
import {Request, Response} from 'express';

function homePageController(req: Request, res: Response) {
    res.send({status: 200, message: 'it is alive!'});
}

export {homePageController};
