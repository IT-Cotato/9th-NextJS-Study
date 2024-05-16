'use client';

import { ObjectId } from 'mongodb';
import { useEffect, useState } from 'react';

interface IComment {
  parentId: string | undefined;
}
interface IResult {
  _id: ObjectId;
  comment: string;
  parent: ObjectId;
  author: ObjectId;
}
export default function Comment({ parentId }: IComment) {
  const [comment, setComment] = useState('');
  const [data, setData] = useState<IResult[]>([]);

  useEffect(() => {
    fetch(`/api/comment/list?parentId=${parentId}`)
      .then((r) => r.json())
      .then((result: IResult[]) => {
        setData(result);
      });
  }, []);

  return (
    <div className="flex flex-col items-start">
      <div>댓글 목록</div>
      {data.map((item, index) => (
        <p key={index}>{item.comment}</p>
      ))}
      <input
        onChange={(e) => {
          setComment(e.target.value);
        }}
        className="border-2"
      />
      <button
        onClick={() => {
          fetch('/api/comment/new', {
            method: 'POST',
            body: JSON.stringify({ comment, parentId }),
          });
        }}
      >
        댓글 전송
      </button>
    </div>
  );
}
