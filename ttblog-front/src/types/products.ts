export type Post = {
    id: string,
    title: string,
    imageUrl: string,
    content: string,
    ts: number,
    videoUrl?: string,
};

export type Comment = {
    id: string,
    postId: string,
    userId: string,
    content: string,
    ts: number;
};