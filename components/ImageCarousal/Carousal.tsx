import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
  Animated,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

interface CarouselItemProps {
  item: any;
  setUsername?: React.Dispatch<React.SetStateAction<string>>;
}

function CarouselItem({item}: CarouselItemProps) {
  return (
    <View>
      <Image
        resizeMode="cover"
        style={{height: '100%', width: screenWidth}}
        source={{uri: item}}
      />
    </View>
  );
}

function Carousal({imageArray}: any) {
  const flatListRef = useRef<FlatList<{id: number; imageUrl: string}>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      flatListRef.current?.scrollToIndex({
        animated: true,
        index: currentIndex,
      });
      setCurrentIndex((prevIndex) =>
        prevIndex === (imageArray?.length ?? 1) - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex, imageArray]);

  const onScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / screenWidth);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={imageArray || []}
        keyExtractor={(item, idx) => (idx.toString())}
        renderItem={({item}) => <CarouselItem item={item} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={flatListRef}
        getItemLayout={(data, index) => ({
          length: screenWidth,
          offset: screenWidth * index,
          index,
        })}
        onScroll={onScroll}
        scrollEventThrottle={200}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    height: 350, // Adjust the height as needed
  },
});

export default Carousal;
