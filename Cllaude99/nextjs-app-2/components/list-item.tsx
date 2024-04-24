'use client';

import styles from '@/styles/List/list.module.css';
import Link from 'next/link';

interface IListItem {
  result: any[];
}
export default function ListItem({ result }: IListItem) {
  return (
    <>
      {result.map((info, index) => (
        <li key={index} className={styles.contents}>
          <Link href={`/detail/${info._id}`}>
            <div key={index}>
              <h4>{info.title}</h4>
              <p>{info.content}</p>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <span>
              <Link href={`/edit/${info._id}`}>✏️</Link>
            </span>
            <span
              className="cursor-pointer"
              onClick={() => {
                fetch(`/api/post/delete?id=${info._id}`, {
                  method: 'POST',
                }).then(() => {
                  console.log('삭제 완료');
                });
              }}
            >
              🗑️
            </span>
          </div>
        </li>
      ))}
    </>
  );
}
