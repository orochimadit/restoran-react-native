import React ,{Component} from 'react';
import {View,Image,TouchableOpacity } from 'react-native';
import Footers from './Footers';
import axios from 'axios';
import { Content, Button,Text, CardItem, Left,Right,Icon,Card } from 'native-base';
import {withNavigation} from 'react-navigation';


export default class Masakan extends Component{
    static navigationOptions={header:null};
    
    constructor(){
        super();
        this.state={
            jenisMasakan:[],
            dataRestaurant:[]
        }
    }
    getJenisMasakan=()=>{
        axios.get('https://developers.zomato.com/api/v2.1/cuisines?city_id=11052',{
            headers:{'user-key':'9c0483270b95c286dd1b7aba9e90cfe2'}
        }).then(res=>{
            this.setState({
                jenisMasakan:res.data.cuisines
            })
        })
    }

    getDataRestaurant=()=>{
        axios.get('https://developers.zomato.com/api/v2.1/search?start=6&count=10',{headers:{"user-key":"9c0483270b95c286dd1b7aba9e90cfe2"}})
        .then((res)=>{
            this.setState({
                dataRestaurant:res.data.restaurants
            })
        })
    }

    componentDidMount(){
        this.getJenisMasakan();
        this.getDataRestaurant();
    }

    render(){
        return(
            <View style={{flex:1}}>
                <Content>
                <Text style={{marginTop:20,marginLeft:10}}>Halaman Masakan</Text>
                <Content horizontal style={{marginTop:20,marginLeft:10}}>
                    {this.state.jenisMasakan.map((data,key)=>{
                        return(
                            <View key={key}>
                                <Button style={{margin:10}}>
                                <Text>{data.cuisine.cuisine_name}</Text>
                                </Button>
                            </View>
                        )
                    })}
                    <Button>
                        <Text>Masakan Jawa</Text>
                    </Button>
                </Content>
                <Text style={{marginTop:20,marginLeft:10}}>Restaurant</Text>
                    <Content horizontal style={{marginTop:20,marginLeft:10}}>
                        {this.state.dataRestaurant.map((data,key)=>{
                             var image=""
                             if(data.restaurant.thumb===""){
                                  image="https://images.pexels.com/photos/2227826/pexels-photo-2227826.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                              }else{
                                  image=data.restaurant.thumb
                              }
                            return(
                                <TouchableOpacity key={key} onPress={()=>{this.props.navigation.navigate("Restaurant")
                                ,{ nama_restaurant:data.restaurant.name,
                                    res_id:data.restaurant.R.res_id}}}>
                            <Card  style={{width:180}}>
                                <CardItem>
                                    <Left>
                                        <Text >{data.restaurant.name}</Text>
                                    </Left>
                                    <Right>
                                        <Icon name="home"/>
                                    </Right>
                                </CardItem>
                                <CardItem cardBody>
                                    <Image 
                                    style={{height:200,width:null,flex:1}}
                                    source={{uri:image}}/>
                                </CardItem>
                                <CardItem>
                                    <Left>
                                        <Text>Jenis Masakan</Text>
                                    </Left>
                                    
                                </CardItem>
                                <CardItem>
                                    <Left>
                                        <Text>{data.restaurant.cuisine}</Text>
                                    </Left>
                                    
                                </CardItem>
                            </Card>
                            </TouchableOpacity>
                            )
                        })}
                       
                    </Content>

                    </Content>
                <Footers/>
            </View>
        );
    }
}