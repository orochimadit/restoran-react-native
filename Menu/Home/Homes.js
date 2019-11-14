import React, {Component} from 'react';
import {View,StatusBar,Image,TouchableOpacity} from 'react-native';
import Footers from '../Masakan/Footers';
import ImageSlider from 'react-native-image-slider';
import {Content,Text,Button, 
    Card, CardItem, Icon, Right,Left} from 'native-base';
import axios from 'axios';


export default class Homes extends Component{
    constructor(){
        super();
        this.state={
            images:[
"https://s3-ap-southeast-1.amazonaws.com/niomic/img-v1/c_login_logo.png",
"https://images.pexels.com/photos/2227826/pexels-photo-2227826.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
"https://images.pexels.com/photos/2227826/pexels-photo-2227826.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
"https://images.pexels.com/photos/2227826/pexels-photo-2227826.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"     
            ],
            dataCategory:[],
            dataRestaurant:[]
        }
    }
static navigationOptions={header:null};
getDataCategory=()=>{
    axios.get('https://developers.zomato.com/api/v2.1/categories',{headers:{"user-key":"9c0483270b95c286dd1b7aba9e90cfe2"}})
    .then((res)=>{
        this.setState({
            dataCategory:res.data.categories
        })
    })
}
getDataRestaurant=()=>{
    axios.get('https://developers.zomato.com/api/v2.1/search?start=6&count=10&sort=rating',{headers:{"user-key":"9c0483270b95c286dd1b7aba9e90cfe2"}})
    .then((res)=>{
        this.setState({
            dataRestaurant:res.data.restaurants
        })
    })
}
    componentDidMount(){
        this.getDataCategory();
        this.getDataRestaurant();
    }

    render(){
        return(
            <View style={{flex:1}}>
                <StatusBar backgroundColor="blue"/>
                {
                    //image slider
                }
                <View style={{height:150}}>
                    <ImageSlider images={this.state.images}  autoPlayWithInterval={3000}/>
                </View>
                {
                    //
                }
                <Content>
                <Text style={{marginTop:20,marginLeft:10}}>Pilihan Category</Text>
                <Content horizontal style={{marginTop:20}} >
                    {this.state.dataCategory.map((data,key)=>{
                        return(
                    <Button rounded key={key} style={{margin:10}}>
                        <Text>{data.categories.name}</Text>
                    </Button>
                        )    
                    })}
                </Content>
                {
                    //restoran terbaik
                }
                <Text style={{marginTop:20,marginLeft:20,marginLeft:10}}>Restoran Terbaik</Text>
                {this.state.dataRestaurant.map((data,key)=>{
                   var image=""
                   if(data.restaurant.thumb===""){
                        image="https://images.pexels.com/photos/2227826/pexels-photo-2227826.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                    }else{
                        image=data.restaurant.thumb
                    }
                    return(
                <TouchableOpacity key={key} onPress={()=>{this.props.navigation.navigate('Restaurant'
                ,{ nama_restaurant:data.restaurant.name,
                    res_id:data.restaurant.R.res_id})}}>
                <Card >
                    <CardItem>
                        <Text>{data.restaurant.name}</Text>
                    </CardItem>
                    <CardItem cardBody>
                        <Image 
                        style={{height:200,width:null,flex:1}}
                        source={{
                            uri:image}}
                             />
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Icon style={{color:"yellow"}} name="star"/>
                            <Text>{data.restaurant.user_rating.rating}</Text>
                        </Left>
                        <Right>
                            <Text>{data.restaurant.user_rating.rating_text}</Text>
                        </Right>
                    </CardItem>
                </Card>
                </TouchableOpacity>
                    );
                })}
                
                </Content>
                <Footers/>
            </View>
        );
    }
}