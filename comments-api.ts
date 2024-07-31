import express, { Request, Response } from 'express';
import { CommentValidator, CommentCreatePayload, IComment } from './types';
import { readFile } from 'fs/promises';
import { writeFile  } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const jsonMiddleware = express.json();
app.use(jsonMiddleware);

const PATH = '/api/comments';
const PORT = 3000;

const loadComments = async (): Promise<IComment[]> => {
    const rawData = await readFile('mock-comments.json', 'binary');
    return JSON.parse(rawData.toString());
};

const validateComment = (comment: CommentCreatePayload): CommentValidator => {
    if (Object.keys(comment).length === 0) {
        return 'Comment is absent or empty';
    }

    const fields = ['email', 'body', 'name', 'postId'];
    for (const field of fields) {
        if (!comment[field]) {
            return `Field ${field} is absent`;
        }
    } 

    return null;
};

const saveComments = async (data: IComment[]): Promise<void> => {
    await writeFile('mock-comments.json', JSON.stringify(data));
};

const compareValues = (target: string, compare: string) => {
    return target.toLowerCase() === compare.toLowerCase();
};

export const checkCommentUniq = (payload: CommentCreatePayload, comments: IComment[]): boolean => {
    const byEmail = comments.find(({ email }) => compareValues(payload.email, email));

    if (!byEmail) {
        return true;
    }

    const { body, name, postId } = byEmail;
    
    return !(
        compareValues(payload.body, body) &&
        compareValues(payload.name, name) &&
        compareValues(payload.postId.toString(), postId.toString())
    );
};

app.get(PATH, async (req: Request, res: Response) => {
    const comments = await loadComments();
    res.setHeader('Content-Type', 'aplication/json');
    res.send(comments);
});

// search comment by id, task 28.5.1
app.get(`${PATH}/:id`, async (req: Request<{ id: string }>, res: Response) => {
    const comments = await loadComments();
    const id = req.params.id;
    const commentById = comments.find(comment => id === comment.id.toString());

    if (!commentById) {
        res.status(404);
        res.send(`Comment with id ${id} is not found`);
        return;
    }

    res.setHeader('Content-Type', 'aplication/json');
    res.send(commentById);
});

app.post(PATH, async (req: Request<{}, {}, CommentCreatePayload>, res: Response) => {
    const validationResult = validateComment(req.body);
    console.log(validationResult);

    if (validationResult) {
        res.status(400);
        res.send(validationResult);
        return;
    }

    const comments = await loadComments();
    const isUniq = checkCommentUniq(req.body, comments);

    if (!isUniq) {
        res.status(422);
        res.send('Comment with the same fields already exists');
        return;
    }

    const id = uuidv4();
    comments.push({ ...req.body, id });
    await saveComments(comments);

    res.status(201);
    res.send(`Comment id:${id} has been added!`);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
