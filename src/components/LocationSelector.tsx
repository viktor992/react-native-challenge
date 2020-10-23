import React, { useRef, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import {
  Container,
  Content,
  Item,
  Input,
  Icon,
  List,
  ListItem,
  Text,
  Spinner,
} from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import debounce from 'lodash.debounce';
import axios from 'axios';

const styles = StyleSheet.create({
  mainContainer: { paddingHorizontal: 16 },
  suggestionsContainer: { marginTop: 10 },
  listItem: { marginLeft: 0 },
});

interface LocationSelectorProps {
  navigation: any;
  route: any;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  navigation,
  route: {
    params: { onSelect },
  },
}) => {
  const [search, setSearch] = useState<string>('');
  const [suggestions, setSuggestions] = useState<
    Array<{
      woeid: number;
      title: string;
    }>
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  const debouncedUpdateSuggestions = useRef(
    debounce((searchQuery: string) => {
      const updateSuggestions = async (query: string) => {
        setLoading(true);
        if (query) {
          const response = await axios.get(
            `https://www.metaweather.com/api/location/search/?query=${query}`
          );
          setSuggestions(response?.data);
        } else {
          setSuggestions([]);
        }
        setLoading(false);
      };
      updateSuggestions(searchQuery);
    }, 500)
  );

  return (
    <Container>
      <Content scrollEnabled={false} style={styles.mainContainer}>
        <SafeAreaView>
          <Item>
            <Icon active name="filter" type="AntDesign" />
            <Input
              placeholder="Enter location name"
              onChangeText={(text) => {
                setSearch(text);
                debouncedUpdateSuggestions.current(text);
              }}
              value={search}
            />
          </Item>
          <View style={styles.suggestionsContainer}>
            {loading ? (
              <Spinner color="#68C2F3" />
            ) : (
              <ScrollView keyboardShouldPersistTaps="always">
                <List>
                  {suggestions.map((item) => {
                    return (
                      <ListItem
                        key={item.woeid}
                        onPress={() => {
                          onSelect(item);
                          navigation.goBack();
                        }}
                        style={styles.listItem}
                      >
                        <Text>{item.title}</Text>
                      </ListItem>
                    );
                  })}
                </List>
              </ScrollView>
            )}
          </View>
        </SafeAreaView>
      </Content>
    </Container>
  );
};

export default LocationSelector;
