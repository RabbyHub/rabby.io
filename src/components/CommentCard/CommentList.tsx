import { HorizontalScroll } from "../HorizontalScroll/HorizontalScroll";
import CommentCard from "./CommentCard";
import { COMMENT_RAW_ARRS } from "./constant";
import styles from './style.module.scss';
const CommentList = ({rows = 2}) => {
    const groupComments = Array.from({ length: rows }, (_, i) =>
        COMMENT_RAW_ARRS.filter((_, idx) => idx % rows === i)
    );
    return (
      <div className={styles.commentList}>
      {groupComments.map((rowComments, rowIdx) => (
        <div key={rowIdx}>
          <HorizontalScroll
            speed={70}
            direction={rowIdx % 2 === 0 ? 'right' : 'left'}
            infiniteLoop
            pauseOnHover={true}
            className={styles.commentRow}
          >
            {rowComments.map((item) => (
              <CommentCard item={item} key={item.id}/>
            ))}
          </HorizontalScroll>
        </div>
            ))}
      </div>
  );
};

export default CommentList;