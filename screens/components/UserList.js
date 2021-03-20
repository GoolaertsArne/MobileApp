import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import {
  Layout,
  Text,
  Card,
  Input,
  Button,
  ListItem,
  List,
} from "@ui-kitten/components";

export const UserList = () => {
  const [value, setValue] = React.useState("");
  const data = ["Demo1", "Demo2"];
  const renderItemAccessory = (props) => <Button size="tiny">Details</Button>;

  const renderItem = ({ item, index }) => (
    <ListItem
      title={item}
      description={item}
      accessoryRight={renderItemAccessory}
    />
  );

  return (
    <Layout style={styles.container}>
      <Layout style={styles.input}>
        <Input
          placeholder="Search"
          value={value}
          onChangeText={(nextValue) => setValue(nextValue)}
        />
      </Layout>

      <Layout style={styles.userContainer}>
        <Card style={styles.userList}>
          <List data={data} renderItem={renderItem} />
        </Card>
        <Card style={styles.userDetail}>
          <Text>UserDetail</Text>
        </Card>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    top: 25,
    alignItems: "stretch",
  },
  input: {
    width: 500,
    left: Dimensions.get("window").width / 2 - 250,
  },
  userContainer: {
    top: 25,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  userList: {
    flex: 0.48,
    height: Dimensions.get("window").height,
  },
  userDetail: {
    flex: 0.48,
    height: Dimensions.get("window").height,
  },
});
