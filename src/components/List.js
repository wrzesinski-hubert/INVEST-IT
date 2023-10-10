import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPhotos } from "../api";
import { addItems, pageIncrement } from "../reducers/app";
import "../App.css";

const List = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const list = useSelector((state) => state.app.list);
  const page = useSelector((state) => state.app.page);

  const loadMoreItems = async () => {
    setIsLoading(true);
    const { images } = await fetchPhotos({
      perPage: 30,
      page: page,
    });
    dispatch(addItems(images));
    setIsLoading(false);
  };

  useEffect(() => {
    loadMoreItems();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    page !== 1 && loadMoreItems();
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      dispatch(pageIncrement());
    }
  };

  return (
    <div className="listWrapper">
      {list.map((item, index) => (
        <div className="imageWrapper" key={index}>
          <img
            className="image"
            src={item.urls.thumb}
            alt={item.user?.username}
          />
          <p className="author">{item.user?.username}</p>
        </div>
      ))}
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default List;
