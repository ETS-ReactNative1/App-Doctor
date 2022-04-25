import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Input, Icon } from "react-native-elements";
import Headline from "../subcomponents/Headline";
import CategoryList from "../subcomponents/CategoryList";
import Card from "../subcomponents/Card";
import QuickRoute from "../subcomponents/QuickRoute";
import doctors from "../consts/Doctor";
import pageImages from "../consts/PageImages";
import SearchDoctor from "../subcomponents/SearchDoctor";
export default function HomeScreen({ navigation }) {
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const { width } = Dimensions.get("screen");
  const cardWidth = width / 1.9;

  return (
    <View style={styles.container}>
      <Headline />

      <ScrollView
        nestedScrollEnabled={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.textHeader}>Find your doctor here</Text>
        </View>

        <SearchDoctor />

        <CategoryList />

        <View>
          <FlatList
            onMomentumScrollEnd={(e) => {
              setActiveCardIndex(
                Math.round(e.nativeEvent.contentOffset.x / cardWidth)
              );
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={doctors}
            contentContainerStyle={{ paddingVertical: 30, paddingLeft: 20 }}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                disabled={activeCardIndex != index}
                activeOpacity={1}
                onPress={() => navigation.navigate("Booking", item)}
              >
                <Card doctor={item} index={index} />
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={styles.headerQuickAcess}>
          <Text style={styles.textHeaderQuickAccess}>Quick Access</Text>
        </View>

        <View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={pageImages}
            contentContainerStyle={{
              paddingLeft: 20,
              paddingVertical: 30,
            }}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => navigation.navigate(item)}
              >
                <QuickRoute page={item} />
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    marginTop: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  textHeader: {
    fontSize: 24,
    fontWeight: "bold",
  },
  headerQuickAcess: {
    marginTop: 20,
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  textHeaderQuickAccess: {
    fontSize: 26,
    fontWeight: "bold",
  },
});
