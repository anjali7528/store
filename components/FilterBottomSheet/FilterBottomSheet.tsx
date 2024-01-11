import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {BottomSheet, Text, Button} from '@rneui/themed';
import {ButtonGroup, Divider, Icon} from '@rneui/base';
import { RadioButton} from 'react-native-paper';
import { readCategory } from '../../firebase/controllers';

interface IFilterBottomSheet {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirmBS?: React.Dispatch<React.SetStateAction<boolean>>;
  data:any,
  setFilteredData:any
}

const FilterItem = ['Type', 'Category', 'Location'];
const FilterItem2 = ['Wholesale', 'Retail'];


const FilterBottomSheet = ({
  isVisible,
  setIsVisible,
  data,
  setFilteredData
}: IFilterBottomSheet) => {
  const [filterIdx, setFilterIdx] = useState(0);
  const [value, setValue] = React.useState('');
  const [filterValue, setFilterValue] = useState<string[]>(FilterItem2)
  const [filterCategory, setFilterCategory] = useState('Type');

  const setOptions = (idx: number) => {
    setFilterIdx(idx);
    const filterOptionsMap: Record<string, string[]> = {
      Type: FilterItem2,
      Category:  Array.from(new Set(data.map((item :any)=> item.category))),
      Location: ['Pune', 'Delhi', 'Kolkata', 'Banglore', 'Mumbai', 'Hydrabad']
    };
    const selectedFilter = FilterItem[idx];
    setFilterCategory(FilterItem[idx]);
    setFilterValue(filterOptionsMap[selectedFilter] || []);
  };

  const RadioItem = ({name}: {name: string}) => (
    <View style={style.radioButtomView}>
      <RadioButton
        value={name}
        onPress={() => setValue(name)}
        status={value === name ? 'checked' : 'unchecked'}
      />
      <Text>{name}</Text>
    </View>
  );

  const ApplyFilter = async () =>{
       console.log(value, filterCategory);
       if(value.length === 0 || filterCategory.length === 0){
            return
       }
       const data =  await readCategory(filterCategory, value);
       setFilteredData(data);
       setIsVisible(false);
  }

  return (
    <BottomSheet isVisible={isVisible}>
      <View style={style.container}>
        <View style={style.headerFlex}>
          <Text h4 style={style.header}>
            Filter
          </Text>
          <TouchableOpacity
            style={style.crossFlex}
            onPress={() => setIsVisible(false)}>
            <Icon type="entypo" name="cross" color="#ff0000" />
          </TouchableOpacity>
        </View>
        <Divider />
        <View style={style.outerFilterContainer}>
          <View style={style.filterConatiner}>
            <ButtonGroup
              buttons={FilterItem}
              vertical={true}
              innerBorderStyle={{width: 0}}
              containerStyle={{
                borderWidth: 0,
                width: '100%',
                marginLeft: 0,
                marginTop: 0,
              }}
              selectedIndex={filterIdx}
              onPress={value => {
                setOptions(value);
              }}
              selectedButtonStyle={{backgroundColor: '#2E8B57'}}
            />
          </View>
          <Divider orientation="vertical" width={1} />
          <ScrollView style={style.optionView}>
            {filterValue.map((item, key) => (
              <RadioItem name={item} key={key} 
              />
            ))}
          </ScrollView>
        </View>
        <Divider width={1} />
      <View style={style.btnContainer}>
      <Button
              title='Reset'
              titleStyle={{ fontWeight: '700', color:'#2E8B57' }}
              buttonStyle={{
                backgroundColor:'#ffffff',
              }}
              containerStyle={{
                width:'50%',
              }}
              onPress={()=>{
                setFilterIdx(0) 
                setValue('')
                setFilterValue(FilterItem2)
                setFilteredData(data)
                setIsVisible(false)
              }}
            />
      <Button
              title='Apply'
              iconContainerStyle={{ marginRight: 10 }}
              titleStyle={{ fontWeight: '700' }}
              buttonStyle={{
                backgroundColor: '#2E8B57',
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 10,
              }}
              containerStyle={{
                width: "50%"
              }}
              onPress={()=>ApplyFilter()}
            />
      </View>
      </View>
    </BottomSheet>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
  },
  optionContainer: {
    flexDirection: 'row',
  },
  headerFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  crossFlex: {
    padding: 10,
  },
  header: {
    marginLeft: 20,
  },
  tabStyle: {
    flexDirection: 'column',
    maxHeight: 150,
  },
  filterConatiner: {
    flexDirection: 'column',
    minHeight: 150,
    width: '30%',
  },
  outerFilterContainer: {
    flexDirection: 'row',
  },
  optionView: {
    width: '70%',
    flexDirection: 'column',
    height: 350,
    paddingVertical: 10,
  },
  radioButtomView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnContainer:{
    flexDirection:'row',
    justifyContent:'flex-end',
    alignItems:'center',
    padding:10
  }
});

export default FilterBottomSheet;
