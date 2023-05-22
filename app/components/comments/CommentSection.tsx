import { CommentEntity, DefaultService } from "@/generated";
import React, { FC } from "react";
// import '../../css/CommentsSection.css';
// import ReplySection from "../replies/ReplySection";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { useAtom } from "jotai";
import { authAtom } from "@/app/state/atoms/atom";

interface Comment extends CommentEntity {
}

interface Props {
    comments: CommentEntity[]; 
    onNewReply: (commentId: string, newReply: any) => void;
    setComments: (newComments: CommentEntity[]) => void;
}

const CommentsSection: FC<Props> = ({ comments, onNewReply, setComments }) => {
    const [auth] = useAtom(authAtom);
    const handleLike = async (commentId: string, userId: string) => {
        try {
            const updatedVote = await DefaultService.votesControllerUpvote(userId, commentId);
            const updatedComments = comments.map((comment) =>
                comment.id === commentId ? { ...comment, votes: [...comment.votes, updatedVote] } : comment
            );
            console.log('updatedComments:', updatedComments);
            setComments(updatedComments);
        } catch (error) {
            console.error("Error liking comment:", error);
        }
    };

    const handleDislike = async (commentId: string, userId: string) => {
        try {
            const updatedVote = await DefaultService.votesControllerDownvote(userId, commentId);
            const updatedComments = comments.map((comment) =>
                comment.id === commentId ? { ...comment, votes: [...comment.votes, updatedVote] } : comment
            );
            setComments(updatedComments);
        } catch (error) {
            console.error("Error disliking comment:", error);
        }
    };


    return (
        <div style={{ padding: 0 }}>
            {comments.map((comment, index) => (
                <div key={index} className="commentBox">
                    <p>
                        <strong>
                            {comment.user && comment.user.firstName ? comment.user.firstName : 'Гость'}:
                        </strong>
                        {comment.content}
                    </p>
                    <p>
                        {new Date(comment.created_at).toLocaleString()}
                        <button onClick={() => handleLike(comment.id, auth.userId)}><ThumbUpIcon /></button>
                        <span>{comment.votes ? comment.votes.filter(vote => vote.value === true).length : 0}</span>
                        <button onClick={() => handleDislike(comment.id, auth.userId)}><ThumbDownAltIcon /></button>
                    </p>
                    <p>
                        Ответов: {comment.replies?.length ?? 0}
                    </p>
                    {/* <ReplySection replies={comment.replies} onNewReply={onNewReply} commentId={comment.id} /> */}
                </div>
            ))}
        </div>
    );
};

export default CommentsSection;