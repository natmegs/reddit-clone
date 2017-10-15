import { Comment } from './comment.model';

export class Post {
    text: string;
    title: string;
    author: string;
    score: number;
    comments: Comment[];
}