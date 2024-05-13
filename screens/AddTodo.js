import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Switch,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import { addTodoReducer } from "../redux/todosSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function AddToDo() {
  const [name, setName] = React.useState("");
  const [date, setDate] = React.useState(new Date());
  const [showTimePicker, setShowTimePicker] = React.useState(false);
  const [isToday, setIsToday] = React.useState(false);

  // useSelector nos permite acceder al estado que tenemos en redux y obtener los "todos"
  const listadoTodos = useSelector((state) => state.todos.todos);

  // Permite utilizar la instancia dispatch para utilizar los reducers
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const addToDo = async () => {
    const newTodo = {
      id: Math.floor(Math.random() * 1000000),
      text: name,
      hour: date.toString(),
      isToday: isToday,
      isCompleted: false,
    };
    try {
      // Guarda un dato en el almacenamiento local pero hay que pasarlo a JSON
      await AsyncStorage.setItem(
        "@Todos",
        JSON.stringify([...listadoTodos, newTodo]) // Guarda el nuevo todo en el almacenamiento local
      );
      // Hace saber a redux que se creo un nuevo "todo"
      dispatch(addTodoReducer(newTodo));
      console.log("Tarea agregada correctamente");
      navigation.goBack();
    } catch (error) {
      console.log("Error al agregar la tarea", error);
    }
  };

  const handleShowTimePicker = () => {
    setShowTimePicker(true);
  };

  const handleTimeChange = (event, selectedDate) => {
    setShowTimePicker(false);
    setDate(selectedDate || date);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nueva Tarea</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Nombre</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Tarea"
          placeholderTextColor="#00000050"
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Hora</Text>
        <TouchableOpacity
          style={styles.textInput}
          onPress={handleShowTimePicker}
        >
          <Text>{date.toLocaleTimeString()}</Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={date}
            mode={"time"}
            is24Hour={true}
            display="spinner"
            onChange={handleTimeChange}
            style={{ width: "75%" }}
          />
        )}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Tarea del día</Text>
        <Switch
          value={isToday}
          onValueChange={(value) => {
            setIsToday(value);
          }}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={addToDo}>
        <Text style={{ color: "#fff" }}>Agregar Tarea</Text>
      </TouchableOpacity>
      <Text style={{ color: "#00000050" }}>
        Si no se tilda "Tarea del día", la tarea se asigna automáticamente para
        mañana.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 35,
    marginTop: 10,
  },
  inputTitle: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 24,
  },
  textInput: {
    borderBottomColor: "#00000050",
    borderBottomWidth: 1,
    width: "75%",
  },
  inputContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingBottom: 30,
  },
  button: {
    marginTop: 30,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    height: 50,
    borderRadius: 10,
  },
});
