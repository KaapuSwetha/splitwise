import React from "react";
import { useCollection } from "./useCollection";
import { useWatch } from "./useWatch";

import { useApp } from "../components/RealmApp";
import atlasConfig from "../atlasConfig.json";
import { createObjectId } from "../utils";
import { useMovieContext } from "../components/Context";

const { dataSourceName } = atlasConfig;

export function useFrendsList() {
  // Set up a list of todos in state
  const app = useApp();
  const { friends, setFriedns, profile } = useMovieContext();

  // Get a client object for the todo item collection
  const FriendsCollection = useCollection({
    cluster: dataSourceName,
    db: "todo",
    collection: "friends",
  });

  //   Fetch all todos on load and whenever our collection changes (e.g. if the current user changes)
  //   React.useEffect(() => {
  //     getFriends();
  //   }, [FriendsCollection]);

  // Use a MongoDB change stream to reactively update state when operations succeed
  // useWatch(FriendsCollection, {
  //   onInsert: (change) => {
  //     setFriedns([...friends, change.fullDocument]);
  //   },

  //   onDelete: (change) => {
  //     const newFrnds = friends.filter(
  //       (item) =>
  //         item._id.toHexString() !== change.documentKey._id.toHexString()
  //     );
  //     console.log(newFrnds, "newFrnds");
  //     setFriedns(newFrnds);
  //   },

  //   onUpdate: (change) => {
  //     try {
  //       const newFrnds = [...friends];
  //       const index = newFrnds.findIndex(
  //         (obj) =>
  //           obj._id.toHexString() === change.documentKey._id.toHexString()
  //       );
  //       if (index !== -1) {
  //         newFrnds.splice(index, 1, change.fullDocument);
  //       }
  //       setFriedns(newFrnds);
  //     } catch (error) {
  //       console.log(error, "error");
  //     }
  //   },
  // });

  const getFriends = async () => {
    try {
      const fetchFriends = await FriendsCollection.find();
      setFriedns(fetchFriends);
    } catch (error) {
      console.log(error, "errr");
    }
  };

  // Given a draft todo, format it and then insert it
  const sendRequest = async (frndRequest) => {
    if (frndRequest.user_to === app.currentUser.id) {
      return Promise.reject({ data: "You cant sedown acccount" });
    }

    frndRequest.user_from = app.currentUser.id;
    frndRequest.user_from_name = profile.username;

    frndRequest[profile.username] = 0;
    frndRequest[frndRequest.user_to_name] = 0;

    frndRequest.isFrend = false;
    frndRequest._id = createObjectId();
    frndRequest.chats = [
      { message: "hi", name: profile.username, time: new Date() },
    ];
    frndRequest.payments = [];

    const fd = friends.find(
      (chat) =>
        (chat.user_from === frndRequest.user_from &&
          chat.user_to === frndRequest.user_to) ||
        (chat.user_from === frndRequest.user_to &&
          chat.user_to === frndRequest.user_from)
    );

    if (fd) {
      return Promise.reject({ data: "User Already In Friends List" });
    }

    try {
      const res = await FriendsCollection.insertOne(frndRequest);
    } catch (err) {
      console.error(err);
    }
  };

  // Toggle whether or not a given todo is complete
  const updateChat = async (id, todo) => {
    try {
      todo.time = new Date();
      todo.name = profile.username;

      await FriendsCollection.updateOne(
        { _id: id },
        { $push: { chats: todo } }
      );
    } catch (error) {
      console.log(error, "errro");
    }
  };

  const updatePayment = async (id, payment) => {
    try {
      const frndObj = friends.find(
        (item) => item._id.toHexString() === payment.id.toHexString()
      );

      const otheruserName =
        frndObj.user_from_name === frndObj[payment.paid]
          ? frndObj.user_from_name
          : frndObj.user_to_name;

      console.log(otheruserName, "otheruserName");
      const paidName = payment.paid;

      var paidAmount = 0;
      var otherNameAmount = 0;

      if (payment.type === "split") {
        const ff = parseFloat(payment.amount) / 2;
        paidAmount = frndObj[paidName] + ff;

        otherNameAmount = frndObj[otheruserName] - ff;
      } else {
        const ff = parseFloat(payment.amount);
        paidAmount = frndObj[paidName] + ff;

        otherNameAmount = frndObj[otheruserName] - ff;
      }

      payment.time = new Date();

      delete payment.id;

      const update = {
        $push: { payments: payment },
        $set: { [otheruserName]: otherNameAmount, [paidName]: paidAmount },
      };

      await FriendsCollection.updateOne({ _id: id }, update);
    } catch (error) {
      console.log(error, "errro");
    }
  };

  const acceptFrnd = async (frnd) => {
    await FriendsCollection.updateOne(
      { _id: frnd._id },
      { $set: { isFrend: !frnd.isFrend } }
    );
  };

  const deleteRequest = async (obj) => {
    return await FriendsCollection.deleteOne(obj);
  };

  return {
    getFriends,
    sendRequest,
    updateChat,
    deleteRequest,
    acceptFrnd,
    updatePayment,
  };
}
