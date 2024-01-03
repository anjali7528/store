import React, { useRef, useEffect, useState } from 'react';
import { View, FlatList, Image, Dimensions, StyleSheet, Animated } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const data = [
  { id: 1, imageUrl: 'https://source.unsplash.com/300x200/?automotive' },
  { id: 2, imageUrl: 'https://source.unsplash.com/300x200/?technology' },
  { id: 3, imageUrl: 'https://source.unsplash.com/300x200/?nature' },
];

interface CarouselItemProps {
  imageUrl: string;
}

function CarouselItem({ imageUrl }: CarouselItemProps) {
  return <Image resizeMode="cover" style={{ height: '100%', width: screenWidth }} source={{ uri: imageUrl }} />;
}

function Carousal() {
  const flatListRef = useRef<FlatList<{ id: number; imageUrl: string }>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
      const interval = setInterval(() => {
        flatListRef.current?.scrollToIndex({
          animated: true,
          index: currentIndex,
        });
        setCurrentIndex(currentIndex === data.length-1 ? 0 : currentIndex+1)
      }, 3000);
      return () => clearInterval(interval);
  }, [currentIndex]);
  
  const onScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / screenWidth);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CarouselItem imageUrl={item.imageUrl} />}
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
        height:350, // Adjust the height as needed
      },
});

export default Carousal;
