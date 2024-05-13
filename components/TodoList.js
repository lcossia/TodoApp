import * as React from "react";
import { FlatList, Text } from "react-native";
import Todo from "./Todo";

export default function TodoList({ todosData }) {
  return (
    <FlatList
      data={todosData}
      renderItem={({ item }) => <Todo {...item} />}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}
