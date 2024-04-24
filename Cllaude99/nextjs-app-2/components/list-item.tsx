'use client';
import { ObjectId } from 'mongodb';
import Link from 'next/link';
import { useState } from 'react';

interface IListItem {
  index: number;
  infoId: ObjectId;
  title: string;
  content: string;
}

export default function ListItem({ index, infoId, title, content }: IListItem) {
  const [deletedItems, setDeletedItems] = useState<ObjectId[]>([]);

  const handleDelete = async (id: ObjectId) => {
    await fetch(`/api/post/delete`, {
      method: 'POST',
      body: JSON.stringify(id),
    });

    setDeletedItems([...deletedItems, id]);
  };

  return (
    <>
      <div
        key={index}
        className={`flex flex-col gap-2 p-5 mb-1 transition-all duration-1000 bg-white shadow-md list-item-begin rounded-xl  ${
          deletedItems.includes(infoId) ? 'hidden' : ''
        }`}
      >
        <Link href={`/detail/${infoId}`}>
          <div key={index}>
            <h4 className="m-0 text-xl font-semibold">{title}</h4>
            <p className="mx-0 my-1 text-gray-500">{content}</p>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <span>
            <Link href={`/edit/${infoId}`}>✏️</Link>
          </span>
          <span className="cursor-pointer" onClick={() => handleDelete(infoId)}>
            🗑️
          </span>
        </div>
      </div>
    </>
  );
}
