import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function MAGICPLANTS() {
  const [plantName, setPlantName] = useState("");
  const [frequency, setFrequency] = useState("");

  const [plants, setPlants] = useState<any[]>([]);

  const addPlant = () => {
    if (plantName.trim() === "") {
      Alert.alert("Error", "Ingresa el nombre de la planta.");
      return;
    }

    if (frequency.trim() === "") {
      Alert.alert("Error", "Ingresa la frecuencia de riego.");
      return;
    }

    const freq = Number(frequency);

    if (isNaN(freq) || freq <= 0) {
      Alert.alert(
        "Error",
        "La frecuencia debe ser un número mayor a cero."
      );
      return;
    }

    const newPlant = {
      id: Date.now(),
      name: plantName,
      frequency: freq,
      lastWatering: "",
      progress: 0,
      history: [],
    };

    setPlants([...plants, newPlant]);

    setPlantName("");
    setFrequency("");

    Alert.alert("Éxito", "Planta agregada correctamente.");
  };

  const waterPlant = (id: number) => {
    const currentDate = new Date().toLocaleString();

    const updatedPlants = plants.map((plant) => {
      if (plant.id === id) {
        const newProgress =
          plant.progress + 20 > 100
            ? 100
            : plant.progress + 20;

        return {
          ...plant,
          lastWatering: currentDate,
          progress: newProgress,
          history: [currentDate, ...plant.history],
        };
      }

      return plant;
    });

    setPlants(updatedPlants);

    Alert.alert("Riego registrado");
  };

  const deletePlant = (id: number) => {
    Alert.alert(
      "Eliminar",
      "¿Deseas eliminar esta planta?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sí",
          onPress: () => {
            setPlants(
              plants.filter((plant) => plant.id !== id)
            );
          },
        },
      ]
    );
  };

  const getStatus = (progress: number) => {
    if (progress >= 80) {
      return "Excelente";
    }

    if (progress >= 40) {
      return "Bien";
    }

    return "Necesita atención";
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>MAGIC PLANTS</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre de la planta"
        value={plantName}
        onChangeText={setPlantName}
      />

      <TextInput
        style={styles.input}
        placeholder="Frecuencia de riego (días)"
        keyboardType="numeric"
        value={frequency}
        onChangeText={setFrequency}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={addPlant}
      >
        <Text style={styles.buttonText}>
          Agregar Planta
        </Text>
      </TouchableOpacity>

      {plants.length === 0 ? (
        <Text style={styles.emptyText}>
          No hay plantas registradas.
        </Text>
      ) : (
        plants.map((plant) => (
          <View key={plant.id} style={styles.card}>
            <Text style={styles.plantTitle}>
                {plant.name}
            </Text>

            <Text>
              Frecuencia: {plant.frequency} días
            </Text>

            <Text>
              Último riego:{" "}
              {plant.lastWatering || "Sin registros"}
            </Text>

            <Text>
              Estado: {getStatus(plant.progress)}
            </Text>

            <Text style={styles.section}>
              Progreso de cuidado
            </Text>

            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${plant.progress}%`,
                  },
                ]}
              />
            </View>

            <Text>{plant.progress}%</Text>

            <TouchableOpacity
              style={styles.waterButton}
              onPress={() =>
                waterPlant(plant.id)
              }
            >
              <Text style={styles.buttonText}>
                Registrar Riego
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() =>
                deletePlant(plant.id)
              }
            >
              <Text style={styles.buttonText}>
                Eliminar Planta
              </Text>
            </TouchableOpacity>

            <Text style={styles.section}>
              Historial de Riegos
            </Text>

            {plant.history.length === 0 ? (
              <Text>Sin registros.</Text>
            ) : (
              plant.history.map(
                (
                  item: string,
                  index: number
                ) => (
                  <Text key={index}>
                      {item}
                  </Text>
                )
              )
            )}
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F2FFF2",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },

  button: {
    backgroundColor: "green",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  emptyText: {
    textAlign: "center",
    marginTop: 20,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },

  plantTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  section: {
    marginTop: 10,
    fontWeight: "bold",
  },

  progressBar: {
    height: 20,
    backgroundColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 5,
    marginBottom: 5,
  },

  progressFill: {
    height: "100%",
    backgroundColor: "green",
  },

  waterButton: {
    backgroundColor: "#2E8B57",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },

  deleteButton: {
    backgroundColor: "#D9534F",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
});