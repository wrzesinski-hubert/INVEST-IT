import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPhotos } from "../api";
import { addItems, pageIncrement } from "../reducers/app";

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
    dispatch(pageIncrement());
    setIsLoading(false);
  };

  useEffect(() => {
    loadMoreItems();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      loadMoreItems();
    }
  };

  return (
    <div
      style={{
        minHeight: "90vh",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        justifyItems: "center",
        alignItems: "center",
        textAlign: "center",
        gap: 40,
      }}
    >
      {list.map((item, index) => (
        <div key={index}>
          <img src={item.urls.thumb} alt={item.user?.username} />
          <p>{item.user?.username}</p>
        </div>
      ))}{" "}
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default List;
