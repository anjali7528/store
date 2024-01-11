import {View, StyleSheet, FlatList, TouchableOpacity, Text, PermissionsAndroid} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Badge from '../components/Badge/Badge';
import ItemCard from '../components/ItemCard/ItemCard';
import Header from '../components/Header/Header';
import FilterBottomSheet from '../components/FilterBottomSheet/FilterBottomSheet';
import {addsData, readCategory, readData} from '../firebase/controllers';
import Geolocation from '@react-native-community/geolocation';
import { findClosestCity } from './Helper';
const FliterData = [
  {
    id: '1',
    icon: 'filter',
    type: 'font-awesome',
  },
  {
    id: '2',
    text: 'Closest',
  },
];

interface IShopList {
  navigation?: any;
}
const ShopList = ({navigation}: IShopList) => {
  const [openFilter, setOpenFilter] = useState(false);
  const [shopData, setShopData] = useState<Record<string,any>[]>([]);
  const [ShopList, setShopListData] = useState(shopData);
  const [filterData, setFilterData] = useState([]);
  const [currentLongitude, setCurrentLongitude] = useState('...');
  const [currentLatitude, setCurrentLatitude] = useState('...');
  const [locationStatus, setLocationStatus] = useState('');
  let watchID:any = null;

  useEffect(() => {
    const fetchData = async()=>{
      const res =  await readData(); 
      if(res){
        setShopData(res);
        setShopListData(res);
      }
      }
      fetchData();
    const requestLocationPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);

  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        setLocationStatus('You are Here');

        //getting the Longitude from the location json
        const currentLongitude = 
          JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = 
          JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);
        
        //Setting Longitude state
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000
      },
    );
  };

  const subscribeLocationLocation = () => {
     watchID = Geolocation.watchPosition(
      (position) => {
        //Will give you the location on location change
        
        setLocationStatus('You are Here');

        //getting the Longitude from the location json        
        const currentLongitude =
          JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = 
          JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Latitude state
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000
      },
    );
  };

  const handleSearch = (value: string) => {
    if (!value.length) {
      setShopListData(shopData);
    }
    const filteredData = shopData?.filter((item):any =>
      item?.name.toLowerCase().includes(value.toLowerCase()),
    );
    if (filteredData.length !== 0) {
      setShopListData(filteredData);
    } else {
      setShopListData([]);
    }
  };

  useEffect(() =>{
    if(filterData.length !== 0){
      setShopListData(filterData)
    }
  }, [filterData])

  const updateOnBadgeClick = async(item:any) => {
     if(item === 'Closest'){
      const closestLocation =  findClosestCity(currentLatitude,currentLongitude);
      const data = await readCategory("Location", closestLocation?.name);
      setShopListData(data);
     }
     if(item === 'reset')
     {
      setShopListData(shopData);
     }
  }

  return (
    <View style={style.container}>
      <Header onSearch={handleSearch} />
      <View style={style.subContainer}>
        <FlatList
          style={{marginTop: 10, marginBottom: 5}}
          data={FliterData}
          renderItem={({item}) =>
            item.icon ? (
              <View style={style.filterContainer}>
                <Badge
                  icon={item.icon}
                  type={item.type}
                  onPressFun={(item) => setOpenFilter(true)}
                />
              </View>
            ) : (
              <View style={style.filterContainer}>
                <Badge text={item.text} onPressCommand={(item:any) => updateOnBadgeClick(item)}/>
              </View>
            )
          }
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      {ShopList.length === 0 ? (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Text style={{color: '#000000', fontWeight: 'bold', fontSize: 24}}>
            {shopData.length === 0 ? "...Loading" : "No data Found"}
          </Text>
        </View>
      ) : (
        <FlatList
          data={ShopList}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => navigation.navigate('Detail',{data:item.name})}>
              <ItemCard
                image={item.image[0]}
                name={item.name}
                category={item.category}
                type={item.type}
                address={item.address}
              />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.name}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{minHeight: '100%', paddingHorizontal: 10}}
          pagingEnabled
        />
      )}
      <View>
        <FilterBottomSheet
          isVisible={openFilter}
          setIsVisible={setOpenFilter}
          data = {shopData}
          setFilteredData = {setFilterData}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: '100%',
    backgroundColor: '#F5F5F5',
  },
  filterContainer: {
    flexDirection: 'row',
    margin: 4,
  },
  subContainer: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default ShopList;
