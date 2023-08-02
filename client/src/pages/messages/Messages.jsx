import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Messages.scss";
import moment from "moment";

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const queryClient = useQueryClient();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequest.get(`/conversations`).then((res) => {
        return res.data;
      }),
  });

  console.log(data);
  const message = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
  maxime cum corporis esse aspernatur laborum dolorum? Animi
  molestias aliquam, cum nesciunt, aut, ut quam vitae saepe repellat
  nobis praesentium placeat.`;

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  const handleRead = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="messages">
      {isLoading ? (
        "loading"
      ) : error ? (
        "Something went wrong"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Messages</h1>
          </div>
          <table>
            <tbody>
              <tr>
                <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
                <th>Last Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
              {data.map((c) => {
                console.log("c hai ye", c);
                return (
                  <tr
                    className="active"
                    // ((currentUser.isSeller && !c.readBySeller) || (!currentUser.isSeller && !c.readByBuyer)) && "active"}
                    key={c._id}
                  >
                    <td>
                      {" "}
                      <Link to={`/message/${c.id}`} className="link">
                        {currentUser.isSeller ? c.buyerId : c.sellerId}{" "}
                      </Link>
                    </td>
                    <td>{c?.lastMessage?.substring(0, 100)}...</td>
                    <td>{moment(c.updatedAt).fromNow()}</td>
                    <td>
                      {((currentUser.isSeller && !c.readBySeller) ||
                        (!currentUser.isSeller && !c.readByBuyer)) && (
                        <button onClick={() => handleRead(c.id)}>
                          Mark as Read
                        </button>
                      )}
                      {/* {(currentUser.isSeller && !c.readBySeller) ||
                      (!currentUser.isSeller && !c.readByBuyer && (
                        <button onClick={() => handleRead(c.id)}>
                          Mark as Read
                        </button>
                      ))} */}
                    </td>
                  </tr>
                );
              })}

              <tr>
                <td>Troy Oliver</td>
                <td>{message.substring(0, 100)}</td>
                <td>1 week ago</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Messages;
