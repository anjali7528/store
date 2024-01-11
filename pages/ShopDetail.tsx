import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ImageWindow from '../components/ImageWindow/ImageWindow';
import DetailCard from '../components/DetailCard/DetailCard';
import {readData} from '../firebase/controllers';

const ShopDetail = ({route}: any) => {
  const [storeData, setStoreData] = useState<Record<string, any>[]>([]);
  const [render, setRender] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await readData();
      if (res) {
        const itemData = res.filter(
          (item: any) => item.name === route?.params?.data,
        );
        setStoreData(itemData[0]);
        setRender(false);
      }
    };
    if(render){
      fetchData();
    }
  }, [render]);

  return (
    <ScrollView style={style.outerContainer}>
      <View>
        <ImageWindow imageArray={storeData?.image} />
      </View>
      <View>
        <DetailCard data={storeData} setRender={setRender}/>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  outerContainer: {
    height: Dimensions.get('window').height,
    backgroundColor: '#f5f5f5',
  },
});

export default ShopDetail;
