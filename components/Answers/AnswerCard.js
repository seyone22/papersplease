'use client'
import React from "react";

const AnswerCard = ({answer}) => {
    return (
        <li key={answer._id}>
            <p>{answer.answerText}</p>
            <p>Votes: {answer.votePositive}</p>
            {/* Displaying 'Superuser Upvoted' if the answer was upvoted by a superuser */}
            {answer.superVotesPositive && <p>Superuser Upvoted</p>}
        </li>
    )
}
export default AnswerCard;