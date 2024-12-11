import React from 'react';
import { useCollection } from './useCollection';
import { useApp } from '../components/RealmApp';
import atlasConfig from '../atlasConfig.json';
import { createObjectId } from '../utils';
import { useMovieContext } from '../components/Context';

const { dataSourceName } = atlasConfig;

export function useProfile() {
  // Set up a list of todos in state
  const app = useApp();
  const{profile,setProfile}= useMovieContext();

  const [profileloading, setProfileLoading] = React.useState(true);
  const [findFrnd, setfindFrnd] = React.useState(null);

  // Get a client object for the todo item collection
  const todoItemCollection = useCollection({
    cluster: dataSourceName,
    db: 'todo',
    collection: 'users',
  });

  // Fetch all todos on load and whenever our collection changes (e.g. if the current user changes)
  //   React.useEffect(() => {
  //     let shouldUpdate = true;
  //     const fetchTodos = todoItemCollection.find({})
  //     if (shouldUpdate) {
  //       fetchTodos.then((fetchedTodos) => {
  //         setTodos(fetchedTodos);
  //         setLoading(false);
  //       });
  //     }
  //     return () => {
  //       shouldUpdate = false;
  //     }
  //   }, [todoItemCollection]);

  // Get User Profile Detials
  const getProfile = async () => {
    try {
      const fetchProfile = await todoItemCollection.findOne({
        owner_id: app.currentUser.id,
      });
  
      setProfile(fetchProfile);
      setProfileLoading(false);
    } catch (error) {
      console.log(error, 'errr');
    }
  };

  const getProfileByName = async ({ name }) => {
    try {
      const fetchProfile = await todoItemCollection.findOne({
        username: name,
      });

      return fetchProfile
    } catch (error) {
      console.log(error, 'errr');
    }
  };

  // Given a draft todo, format it and then insert it
  const saveProfile = async (draftTodo) => {
    if (!profile) {


      const findExit = await todoItemCollection.findOne({
        username: draftTodo?.username,
      });

      if(findExit) { 
        Promise.reject({data:'UserName Alredady Exist'})
      }

      draftTodo.owner_id = app.currentUser.id;
      draftTodo._id = createObjectId();

      try {
        await todoItemCollection.insertOne(draftTodo);
        getProfile();
      } catch (err) {
        if (err.error.match(/^Duplicate key error/)) {
          console.warn(
            `The following error means that this app tried to insert a todo multiple times (i.e. an existing todo has the same _id). In this app we just catch the error and move on. In your app, you might want to debounce the save input or implement an additional loading state to avoid sending the request in the first place.`
          );
        }
        console.error(err);
      }
    }
  };

  // Toggle whether or not a given todo is complete
  const toggleTodo = async (todo) => {
    await todoItemCollection.updateOne(
      { _id: todo._id },
      { $set: { isComplete: !todo.isComplete } }
    );
  };

  // Delete a given todo
  const deleteTodo = async (todo) => {
    await todoItemCollection.deleteOne({ _id: todo._id });
  };

  return {
    profileloading,
    profile,
    toggleTodo,
    deleteTodo,
    getProfile,
    saveProfile,
    getProfileByName,
    findFrnd,
  };
}
