import { useQuery } from "@tanstack/react-query";
import React from "react";
import newRequest from "../../utils/newRequest";

const Review = ({ review }) => {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: [review.userId],
    queryFn: () =>
      newRequest.get(`users/${review.userId}`).then((res) => {
        return res.data;
      }),
  });
  console.log("single review", data);
  console.log("single review id", review);
  return (
    <div>
      <div className="item">
        {isLoading ? (
          "Loading"
        ) : error ? (
          "Something went wrong"
        ) : (
          <div key={review._id}>
            <div className="user">
              <img
                className="pp"
                src="https://w7.pngwing.com/pngs/312/283/png-transparent-man-s-face-avatar-computer-icons-user-profile-business-user-avatar-blue-face-heroes-thumbnail.png"
                alt=""
              />
              <div className="info">
                <span>{data.username}</span>
                <div className="country">
                  <img
                    src="https://w7.pngwing.com/pngs/908/509/png-transparent-flag-of-india-computer-icons-indian-flag-rectangle-orange-thumbnail.png"
                    alt=""
                  />
                  <span>{data.country}</span>
                </div>
              </div>
            </div>
            <div className="stars">
              {Array(review.star)
                .fill()
                .map((star, i) => (
                  <img src="/img/star.png" alt="" />
                ))}

              <span>{review.star}</span>
            </div>
            <p>{review.desc}</p>
            <div className="helpful">
              <span>Helpful?</span>
              <img src="/img/like.png" alt="" />
              <span>Yes</span>
              <img src="/img/dislike.png" alt="" />
              <span>No</span>
            </div>
          </div>
        )}
      </div>
      <hr />
    </div>
  );
};

export default Review;
