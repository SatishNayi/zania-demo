import React, { useState, useCallback, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { BounceLoader } from "react-spinners";
interface CardProps {
  src: string;
  title: string;
  id: string;
  index: number;
  type: string;
  moveImage: (dragIndex: number, hoverIndex: number) => void;
}

const DregCard: React.FC<CardProps> = ({ src, title, id, index, type, moveImage }) => {
  
  /* Draga and Drop image*/
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [, drop] = useDrop({
    accept: "image",
    hover: (item: { index: number }, monitor: any) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveImage(dragIndex, hoverIndex);

      item.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: "image",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging()
      };
    }
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  /* code for Loader for Image loading */
  const setLoadingTrue = useCallback(() => {
    setLoaded(true);
  }, []);
  
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    const img = new Image();

    if (src) {
      // Now browser will start downloading image
      img.src = src;

      // In case imageSrc changed after loading or error
      setLoaded(false);

      // Subscribing on image load and error
      img.addEventListener("load", setLoadingTrue);
    }

    // Don't forget to unsubscribe, we don't need memory leaks)
    return () => {
      img.removeEventListener("load", setLoadingTrue);
    };
  }, [src, setLoadingTrue]);

  return (
    <div ref={ref} style={{ opacity }} className="card">
      <div className="card_caption">{title}</div>
      <PhotoProvider maskOpacity={0.3} bannerVisible={true} loadingElement={<BounceLoader/>}>
        <PhotoView src={src}>
          <div>
            {src && !loaded && (
              <div className="cardloader">
                <BounceLoader/>
              </div>
            )}
            {src && loaded ? <img src={src} alt={title} /> : <></>}
          </div>
        </PhotoView>
      </PhotoProvider>
    </div>
  );
};

export default DregCard;