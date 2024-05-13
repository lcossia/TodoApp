import * as React from "react";
import { StatusBar } from "react-native";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import TodoList from "../components/TodoList";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { hideCompletedReducer, setTodosReducers } from "../redux/todosSlice";

export default function Home() {
  // Obtenemos los todos del estado de redux
  const todos = useSelector((state) => state.todos.todos);

  // Estado para ocultar los completados
  const [isHidden, setIsHidden] = React.useState(false);

  // Hook para navegar entre pantallas
  const navigation = useNavigation();

  // Hook para utilizar los reducers
  const dispatch = useDispatch();

  React.useEffect(() => {
    const getTodos = async () => {
      try {
        const todos = await AsyncStorage.getItem("@Todos");
        if (todos !== null) {
          dispatch(setTodosReducers(JSON.parse(todos)));
        }
      } catch (error) {
        console.log("Error al obtener las tareas", error);
      }
    };
    getTodos();
  }, []);

  // Funcion para ocultar los completados
  const handleHide = async () => {
    if (isHidden) {
      setIsHidden(false);
      const todos = await AsyncStorage.getItem("@Todos");
      if (todos !== null) {
        dispatch(setTodosReducers(JSON.parse(todos)));
      }
      return;
    }
    setIsHidden(!isHidden);
    dispatch(hideCompletedReducer());
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Image
        source={{
          uri: "https://www.pngfind.com/pngs/m/685-6854994_react-logo-no-background-hd-png-download.png",
        }}
        style={styles.pic}
      />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.title}>Hoy</Text>
        <TouchableOpacity onPress={handleHide}>
          <Text style={{ color: "#61dbfb", fontWeight: "bold" }}>
            {isHidden ? "Mostrar Completados" : "Ocultar Completados"}
          </Text>
        </TouchableOpacity>
      </View>
      <TodoList todosData={todos.filter((todo) => todo.isToday)} />
      <Text style={styles.title}>Mañana</Text>
      <TodoList todosData={todos.filter((todo) => !todo.isToday)} />
      <TouchableOpacity
        onPress={() => navigation.navigate("Add")}
        style={styles.button}
      >
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 30,
    backgroundColor: "#fff",
  },
  pic: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignSelf: "flex-end",
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 35,
    marginTop: 20,
    color: "#262626",
  },
  button: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#000",
    alignSelf: "flex-end",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowRadius: 5,
    elevation: 5,
  },
  plus: {
    fontSize: 42,
    color: "#fff",
    position: "absolute",
    top: -9,
    left: 9,
  },
});
