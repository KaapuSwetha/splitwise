import React from "react";
import { useCollection } from "./useCollection";
import { useWatch } from "./useWatch";

import { useApp } from "../components/RealmApp";
import atlasConfig from "../atlasConfig.json";
import { createObjectId } from "../utils";
import { useMovieContext } from "../components/Context";

const { dataSourceName } = atlasConfig;

export function useGroupsList() {
  // Set up a list of todos in state
  const app = useApp();
  const { groups, setGroups, profile } = useMovieContext();

  // Get a client object for the todo item collection
  const GroupCollection = useCollection({
    cluster: dataSourceName,
    db: "todo",
    collection: "groups",
  });

  //   Fetch all todos on load and whenever our collection changes (e.g. if the current user changes)
  //   React.useEffect(() => {
  //     getFriends();
  //   }, [FriendsCollection]);

  // Use a MongoDB change stream to reactively update state when operations succeed
  // useWatch(FriendsCollection, {
  //   onInsert: (change) => {
  //     setGroups([...groups, change.fullDocument]);
  //   },
  // });

  const getGroups = async () => {
    try {
      const fetchGroups = await GroupCollection.find();
      console.log(fetchGroups, "fetchGroups");
      setGroups(fetchGroups);
    } catch (error) {
      console.log(error, "errr");
    }
  };

  const createGroup = async (group) => {
    try {
      const groupDetails = {
        name: group.name,
        balances: { [profile.username]: 0 },
        members: [app.currentUser.id],
        chats: [{ message: "hi", name: profile.username, time: new Date() }],
        payments: [],
      };

      const res = await GroupCollection.insertOne(groupDetails);
    } catch (error) {
      console.log(error, "eroo");
    }
  };

  const addPersonInGroup = async (groupId, personId) => {
    try {
      await GroupCollection.updateOne(
        { _id: groupId },
        { $push: { members: personId } }
      );
    } catch (error) {
      console.log(error, "eroo");
    }
  };

  const updateGroupPayment = async (id, payment) => {
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

  return {
    getGroups,
    createGroup,
    addPersonInGroup,
    updateGroupPayment,
  };
}
