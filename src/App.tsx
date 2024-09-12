import React,{ useEffect, useState } from "react";
import DregCard from "./components/DragCard"; 

type galleryList = {
  id: string;
  img: string;
  title: string;
  type: string;
}[]

const card: galleryList | (() => galleryList) = [];

const App: React.FC = () => {
  const [images, setImages] = useState<galleryList>(card);
  const moveImage = React.useCallback((dragIndex: number, hoverIndex: number) => {
    setImages((prevCards) => {
      const clonedCards = [...prevCards];
      const removedItem = clonedCards.splice(dragIndex, 1)[0];

      clonedCards.splice(hoverIndex, 0, removedItem);
      return clonedCards;
    });
  }, []);
  useEffect(() => {
    fetch('/api/getGalary')
      .then((response) => response.json())
      .then((data) => {
        debugger;
        console.log(data);
        setImages(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  
  return (
    <main>
      {React.Children.toArray(
        images.map((image, index) => (
          <DregCard
            src={image.img}
            title={image.title}
            id={image.id}
            index={index}
            type={image.type}
            moveImage={moveImage}
          />
        ))
      )}
    </main>
  );
};

export default App;

